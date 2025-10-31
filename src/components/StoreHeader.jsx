// src/components/StoreHeader.jsx
import React from "react";
import { Bell, AlertTriangle, Clock } from "lucide-react";

const StoreHeader = ({ title, inventory = [], user }) => {
  const lowStock = inventory.filter((drug) => drug.stock <= 5);

  const nearExpiry = inventory.filter((drug) => {
    if (!drug.expiryDate) return false;
    const expiry = new Date(drug.expiryDate);
    const today = new Date();
    const diffDays = (expiry - today) / (1000 * 60 * 60 * 24);
    return diffDays > 0 && diffDays <= 30;
  });

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-10">
      {/* Left side */}
      <div>
        <h1 className="text-2xl font-bold text-green-700">{title}</h1>
        {user && (
          <p className="text-sm text-gray-500 mt-1">
            Welcome, {user.name || "User"} ({user.role || "Staff"})
          </p>
        )}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-sm text-red-600 font-semibold">
          <AlertTriangle className="w-5 h-5" />
          Low Stock: {lowStock.length}
        </div>

        <div className="flex items-center gap-2 text-sm text-yellow-600 font-semibold">
          <Clock className="w-5 h-5" />
          Near Expiry: {nearExpiry.length}
        </div>

        <button className="relative text-gray-600 hover:text-green-700">
          <Bell className="w-6 h-6" />
          {(lowStock.length > 0 || nearExpiry.length > 0) && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1.5">
              {lowStock.length + nearExpiry.length}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default StoreHeader;
