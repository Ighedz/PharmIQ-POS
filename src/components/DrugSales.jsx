import React, { useState } from "react";
import { Search, PlusCircle, Printer } from "lucide-react";
import { drugInteractions } from "../mock/mockData";

const DrugSales = ({ inventory, salesHistory, setSalesHistory, user }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDrugs, setFilteredDrugs] = useState([]);
  const [cart, setCart] = useState([]);
  const [interactionMessage, setInteractionMessage] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [discount, setDiscount] = useState(0);
  const [showReceipt, setShowReceipt] = useState(false);

  // 🔍 Search drugs
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    if (!query.trim()) return setFilteredDrugs([]);
    const results = inventory.filter((drug) =>
      drug.drugName.toLowerCase().includes(query)
    );
    setFilteredDrugs(results);
  };

  // ➕ Add drug to cart
  const addToCart = (drug) => {
    const exists = cart.find((item) => item.id === drug.id);
    if (exists) {
      setCart(
        cart.map((item) =>
          item.id === drug.id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...drug, qty: 1 }]);
    }
    setSearchQuery("");
    setFilteredDrugs([]);
  };

  // 🔄 Update quantity safely
  const updateQty = (id, value) => {
    const newQty = value === "" ? "" : Math.max(1, parseInt(value));
    setCart(cart.map((item) => (item.id === id ? { ...item, qty: newQty } : item)));
  };

  // ⚠️ Check interactions
  const checkInteractions = () => {
    if (cart.length < 2) {
      setInteractionMessage("Add at least 2 drugs to check interactions.");
      return;
    }

    let found = false;
    for (let i = 0; i < cart.length; i++) {
      for (let j = i + 1; j < cart.length; j++) {
        const drugA = cart[i].drugName.toLowerCase();
        const drugB = cart[j].drugName.toLowerCase();

        const match = drugInteractions.find((interaction) => {
          const [a, b] = interaction.drugs.map((d) => d.toLowerCase());
          return (
            (drugA.includes(a) && drugB.includes(b)) ||
            (drugA.includes(b) && drugB.includes(a))
          );
        });

        if (match) {
          setInteractionMessage(`⚠️ ${match.message}`);
          found = true;
          break;
        }
      }
      if (found) break;
    }

    if (!found) setInteractionMessage("✅ No interactions detected.");
  };

  // 🧮 Totals
  const subtotal = cart.reduce(
    (sum, item) => sum + item.sellingPrice * (item.qty || 0),
    0
  );
  const discountAmount = (subtotal * discount) / 100;
  const totalAmount = subtotal - discountAmount;

  // 🧾 Checkout flow
  const handleCheckout = () => {
    if (!cart.length) return alert("Add drugs to cart first!");
    checkInteractions();
    setShowReceipt(true);
  };

  // 🖨️ Print receipt content
  const printReceipt = () => {
    const printContent = document.getElementById("receipt-content").innerHTML;
    const printWindow = window.open("", "_blank", "width=400,height=600");
    printWindow.document.write(`
      <html>
        <head>
          <title>Receipt</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h3, p { text-align: center; margin: 0; }
            .line { border-bottom: 1px solid #ccc; margin: 8px 0; }
          </style>
        </head>
        <body>${printContent}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  // ✅ Confirm sale + print
  const confirmAndPrint = () => {
    const saleLogs = cart.map((item) => ({
      id: Date.now() + Math.random(),
      drugName: item.drugName,
      class: item.class || "Other",
      qty: item.qty,
      unitPrice: item.sellingPrice,
      costPrice: item.costPrice || 0, // 🆕 Include costPrice
      total: item.qty * item.sellingPrice,
      discountApplied: discount ? `${discount}%` : "0%",
      clientPhone,
      timestamp: new Date(),
      soldBy: user?.name || "Unknown",
      pharmacyName: user?.pharmacyName || "Pharmacy Name",
      pharmacyAddress: user?.pharmacyAddress || "Pharmacy Address",
    }));

    setSalesHistory([...salesHistory, ...saleLogs]);
    printReceipt();
    setCart([]);
    setDiscount(0);
    setClientPhone("");
    setShowReceipt(false);
    setInteractionMessage("");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-green-700 mb-4">Pharmacy Sales</h2>

      {/* 🔍 Search */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search drug..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full border rounded-md p-2 pl-10 focus:outline-none focus:ring-2 focus:ring-green-600"
        />
        <Search className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
      </div>

      {/* 🧾 Search Results */}
      {filteredDrugs.length > 0 && (
        <div className="border rounded-md bg-gray-50 p-2">
          {filteredDrugs.map((drug) => (
            <div
              key={drug.id}
              className="flex justify-between items-center p-2 hover:bg-green-50 rounded"
            >
              <p>{drug.drugName}</p>
              <p>₦{drug.sellingPrice.toFixed(2)}</p>
              <button
                onClick={() => addToCart(drug)}
                className="flex items-center bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 text-sm"
              >
                <PlusCircle className="w-4 h-4 mr-1" /> Add
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 🛒 Cart */}
      {cart.length > 0 && (
        <div className="mt-6">
          <table className="w-full border-collapse mb-3">
            <thead>
              <tr className="bg-green-100 text-left">
                <th className="p-2 border">Drug</th>
                <th className="p-2 border">Qty</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td className="p-2 border">{item.drugName}</td>
                  <td className="p-2 border">
                    <input
                      type="number"
                      value={item.qty}
                      min="1"
                      onChange={(e) => updateQty(item.id, e.target.value)}
                      className="w-16 border rounded-md text-center"
                    />
                  </td>
                  <td className="p-2 border">₦{item.sellingPrice.toFixed(2)}</td>
                  <td className="p-2 border">
                    ₦{(item.sellingPrice * (item.qty || 0)).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* ⚠️ Interaction Message */}
          {interactionMessage && (
            <div
              className={`mb-4 p-3 rounded-md ${
                interactionMessage.includes("⚠️")
                  ? "bg-red-100 text-red-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {interactionMessage}
            </div>
          )}

          {/* 💸 Totals */}
          <div className="flex justify-between items-center mb-4">
            <label className="flex items-center gap-2 font-semibold text-green-700">
              Discount (%):
              <input
                type="number"
                value={discount}
                min="0"
                max="100"
                onChange={(e) => setDiscount(Number(e.target.value))}
                className="border rounded-md p-1 w-20 text-center"
              />
            </label>
            <p className="font-semibold text-lg text-green-700">
              Total: ₦{totalAmount.toFixed(2)}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex justify-end gap-2">
            <button
              onClick={checkInteractions}
              className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
            >
              Check Interactions
            </button>
            <button
              onClick={handleCheckout}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Checkout
            </button>
          </div>
        </div>
      )}

      {/* 🧾 Receipt Modal */}
      {showReceipt && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <div id="receipt-content">
              <h3 className="text-xl font-semibold text-center mb-1 text-green-700">
                {user?.pharmacyName || "Pharmacy Name"}
              </h3>
              <p className="text-center text-sm text-gray-600 mb-2">
                {user?.pharmacyAddress || "Pharmacy Address"}
              </p>
              <hr className="my-2" />

              <p className="text-sm text-gray-600 mb-2">
                Date: {new Date().toLocaleDateString()} <br />
                Time: {new Date().toLocaleTimeString()} <br />
                Sold by: {user?.name || "Unknown"}
              </p>

              <hr className="my-2" />
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between mb-1 text-sm">
                  <span>
                    {item.drugName} x {item.qty}
                  </span>
                  <span>₦{(item.qty * item.sellingPrice).toFixed(2)}</span>
                </div>
              ))}
              <hr className="my-2" />
              <p>Subtotal: ₦{subtotal.toFixed(2)}</p>
              <p>Discount: ₦{discountAmount.toFixed(2)} ({discount}%)</p>
              <p className="font-bold text-green-700">
                Total: ₦{totalAmount.toFixed(2)}
              </p>
            </div>

            <input
              type="tel"
              placeholder="Client Phone (optional)"
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
              className="w-full border p-2 rounded mt-4"
            />

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowReceipt(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmAndPrint}
                className="px-4 py-2 bg-green-600 text-white rounded flex items-center gap-2"
              >
                <Printer size={16} /> Confirm & Print
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DrugSales;
