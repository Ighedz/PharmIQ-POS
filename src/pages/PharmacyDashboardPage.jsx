// src/pages/PharmacyDashboardPage.jsx
import React, { useState } from "react";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import StoreHeader from "../components/StoreHeader";
import InventoryManagement from "../components/InventoryManagement";
import DrugSales from "../components/DrugSales";
import AnalyticsOverview from "../components/AnalyticsOverview";
import { drugs } from "../mock/mockData";
import { useAuth } from "../context/AuthContext"; // ✅ Import Auth context

const PharmacyDashboardPage = () => {
  const { pharmacyName } = useParams();
  const { user } = useAuth(); // ✅ get user from context
  const [inventory, setInventory] = useState(drugs);
  const [salesHistory, setSalesHistory] = useState([]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* ✅ Pass user to Sidebar */}
      <Sidebar pharmacyName={pharmacyName} user={user} />

      <div className="flex-1 ml-64">
        <StoreHeader title={`${pharmacyName || "Pharmacy"} POS`} inventory={inventory} />

        <main className="p-6">
          <Routes>
            <Route path="/" element={<Navigate to="sales" replace />} />

            <Route
              path="inventory"
              element={
                <InventoryManagement
                  inventory={inventory}
                  setInventory={setInventory}
                />
              }
            />

            <Route
              path="sales"
              element={
                <DrugSales
                  inventory={inventory}
                  salesHistory={salesHistory}
                  setSalesHistory={setSalesHistory}
                />
              }
            />

            <Route
              path="analytics"
              element={
                <AnalyticsOverview
                  inventory={inventory}
                  salesHistory={salesHistory}
                />
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default PharmacyDashboardPage;
