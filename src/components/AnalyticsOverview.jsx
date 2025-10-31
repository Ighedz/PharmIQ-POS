// src/components/AnalyticsOverview.jsx
import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

/**
 * Props:
 * - inventory: array of inventory items (each should have id, drugName, class, stock, costPrice, sellingPrice)
 * - salesHistory: array of sale entries (each should have drugId, drugName, class, qty, unitPrice, total, costPrice, timestamp, saleSource, clientPhone)
 * - onEndSales: optional callback function to clear or archive salesHistory in parent (recommended)
 */
const AnalyticsOverview = ({ inventory = [], salesHistory = [], onEndSales }) => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalItemsSold, setTotalItemsSold] = useState(0);
  const [salesByClass, setSalesByClass] = useState([]);
  const [cogsSold, setCogsSold] = useState(0);
  const [estimatedProfit, setEstimatedProfit] = useState(0);
  const [mostSold, setMostSold] = useState([]);
  const [leastSold, setLeastSold] = useState([]);
  const [expiringSoon, setExpiringSoon] = useState([]);

  useEffect(() => {
    // Basic guards
    const sales = salesHistory || [];
    const inv = inventory || [];

    // Revenue & items sold
    let revenue = 0;
    let itemsSold = 0;
    const classMap = {};
    const productCountMap = {}; // counts by drugName for most/least sold
    let cogsSum = 0; // cost of goods sold for sold items

    sales.forEach((s) => {
      const qty = Number(s.qty || 0);
      const total = Number(s.total || 0);
      revenue += total;
      itemsSold += qty;

      const cls = s.class || "Other";
      classMap[cls] = (classMap[cls] || 0) + qty;

      // count per product
      productCountMap[s.drugName] = (productCountMap[s.drugName] || 0) + qty;

      // COGS for this sale (if costPrice stored in sale)
      cogsSum += (Number(s.costPrice || 0) * qty);
    });

    setTotalRevenue(revenue);
    setTotalItemsSold(itemsSold);
    setSalesByClass(Object.keys(classMap).map((k) => ({ name: k, qty: classMap[k] })));
    setCogsSold(cogsSum);
    setEstimatedProfit(revenue - cogsSum);

    // Most sold & least sold (by count) — show top/bottom 5
    const productEntries = Object.keys(productCountMap).map((name) => ({
      name,
      qty: productCountMap[name],
    }));

    productEntries.sort((a, b) => b.qty - a.qty);
    setMostSold(productEntries.slice(0, 5));

    // least sold — include items in inventory that never sold as well
    const allProductNames = new Set(inv.map((d) => d.drugName));
    productEntries.forEach((p) => allProductNames.delete(p.name));
    const neverSoldArr = Array.from(allProductNames).map((name) => ({ name, qty: 0 }));

    const leastCandidates = [...productEntries.slice().reverse(), ...neverSoldArr]
      .sort((a, b) => a.qty - b.qty)
      .slice(0, 5);
    setLeastSold(leastCandidates);

    // Expiry soon — within 30 days
    const now = new Date();
    const in30 = new Date(now);
    in30.setDate(now.getDate() + 30);
    const expSoon = inv
      .filter((d) => d.expiry)
      .map((d) => ({ ...d, expiryDate: new Date(d.expiry) }))
      .filter((d) => d.expiryDate >= now && d.expiryDate <= in30)
      .map((d) => ({
        drugName: d.drugName,
        expiry: d.expiry,
        daysLeft: Math.ceil((d.expiryDate - now) / (1000 * 60 * 60 * 24)),
      }))
      .sort((a, b) => a.daysLeft - b.daysLeft);
    setExpiringSoon(expSoon);
  }, [inventory, salesHistory]);

  // Download helper for CSV (generic)
  const downloadCSV = (filename, headers, rows) => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((r) => r.map((c) => (String(c).includes(",") ? `"${String(c).replace(/"/g, '""')}"` : c)).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // End sales: call parent handler if provided, then download daily CSV
  const handleEndSalesAndDownload = () => {
    if (!salesHistory || salesHistory.length === 0) {
      alert("No sales to end for today.");
      return;
    }

    // Build rows for daily report (detailed)
    const headers = ["Drug Name", "Class", "Qty", "Unit Price", "Total", "Sale Source", "Client Phone", "Timestamp"];
    const rows = salesHistory.map((s) => [
      s.drugName,
      s.class || "Other",
      s.qty,
      s.unitPrice,
      s.total,
      s.saleSource || "Store",
      s.clientPhone || "",
      new Date(s.timestamp).toLocaleString(),
    ]);

    const filename = `pharmiq_daily_sales_${Date.now()}.csv`;
    downloadCSV(filename, headers, rows);

    // Call parent to clear or archive sales if provided
    if (typeof onEndSales === "function") {
      onEndSales(salesHistory);
    } else {
      // fallback: inform user to clear in parent (since we cannot mutate parent's state here)
      alert("Daily report downloaded. To clear the day's sales, implement onEndSales in the parent component to archive/clear salesHistory.");
    }
  };

  // Monthly aggregated report (summary)
  const handleDownloadMonthlyReport = () => {
    if (!salesHistory || salesHistory.length === 0) {
      alert("No sales to create monthly report from.");
      return;
    }

    // Group by month-year
    const groups = {};
    salesHistory.forEach((s) => {
      const dt = new Date(s.timestamp);
      const key = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}`;
      if (!groups[key]) groups[key] = { month: key, revenue: 0, items: 0, transactions: 0 };
      groups[key].revenue += Number(s.total || 0);
      groups[key].items += Number(s.qty || 0);
      groups[key].transactions += 1;
    });

    const rows = Object.values(groups).map((g) => [g.month, g.revenue.toFixed(2), g.items, g.transactions]);
    const headers = ["Month", "Total Revenue", "Total Items Sold", "Number of Transactions"];
    const filename = `pharmiq_monthly_summary_${Date.now()}.csv`;
    downloadCSV(filename, headers, rows);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-green-700 mb-6">Analytics Overview</h2>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-green-50 p-4 rounded-lg shadow">
          <p className="text-sm text-gray-600">Total Revenue</p>
          <p className="text-green-700 font-bold text-xl">₦{Number(totalRevenue || 0).toFixed(2)}</p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg shadow">
          <p className="text-sm text-gray-600">Total Items Sold</p>
          <p className="text-green-700 font-bold text-xl">{totalItemsSold}</p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg shadow">
          <p className="text-sm text-gray-600">Number of Sales</p>
          <p className="text-green-700 font-bold text-xl">{(salesHistory || []).length}</p>
        </div>
      </div>

      {/* Profit / COGS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-green-50 p-4 rounded-lg shadow">
          <p className="text-sm text-gray-600">COGS (Sold Items)</p>
          <p className="text-green-700 font-bold text-xl">₦{Number(cogsSold || 0).toFixed(2)}</p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg shadow">
          <p className="text-sm text-gray-600">Estimated Profit (Revenue - COGS)</p>
          <p className="text-green-700 font-bold text-xl">₦{Number(estimatedProfit || 0).toFixed(2)}</p>
        </div>
      </div>

      {/* Chart: Sales by Class */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-green-700 mb-3">Sales by Drug Class</h3>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesByClass} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="qty" fill="#16a34a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Most / Least sold & Expiring */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white border p-4 rounded-lg shadow">
          <h4 className="font-semibold text-gray-700 mb-2">Most Sold (Top 5)</h4>
          {mostSold.length === 0 ? <p className="text-sm text-gray-500">No sales yet</p> : (
            <ul className="text-sm space-y-1">
              {mostSold.map((p) => <li key={p.name}>{p.name} — {p.qty}</li>)}
            </ul>
          )}
        </div>

        <div className="bg-white border p-4 rounded-lg shadow">
          <h4 className="font-semibold text-gray-700 mb-2">Least Sold / Never Sold</h4>
          {leastSold.length === 0 ? <p className="text-sm text-gray-500">No inventory data</p> : (
            <ul className="text-sm space-y-1">
              {leastSold.map((p) => <li key={p.name}>{p.name} — {p.qty}</li>)}
            </ul>
          )}
        </div>

        <div className="bg-white border p-4 rounded-lg shadow">
          <h4 className="font-semibold text-gray-700 mb-2">Expiring Soon (30 days)</h4>
          {expiringSoon.length === 0 ? <p className="text-sm text-gray-500">No near-expiry items</p> : (
            <ul className="text-sm space-y-1">
              {expiringSoon.map((e) => (
                <li key={e.drugName}>
                  {e.drugName} — expires in {e.daysLeft} day{e.daysLeft > 1 ? "s" : ""}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={handleEndSalesAndDownload}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          End Sales & Download Daily Report
        </button>

        <button
          onClick={handleDownloadMonthlyReport}
          className="bg-white border border-green-600 text-green-700 px-4 py-2 rounded-md hover:bg-green-50"
        >
          Download Monthly Summary
        </button>
      </div>
    </div>
  );
};

export default AnalyticsOverview;
