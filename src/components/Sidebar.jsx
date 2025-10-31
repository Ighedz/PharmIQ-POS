// src/components/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Package, BarChart3, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Sidebar = ({ pharmacyName, user }) => {
  const { logout } = useAuth();
  const location = useLocation();

  const basePath = `/pharmacy-dashboard/${pharmacyName}`;

  const links = [
    { name: "Sales", path: `${basePath}/sales`, icon: <LayoutDashboard size={18} /> },
    { name: "Inventory", path: `${basePath}/inventory`, icon: <Package size={18} /> },
    { name: "Analytics", path: `${basePath}/analytics`, icon: <BarChart3 size={18} /> },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-green-700 text-white flex flex-col shadow-lg">
      {/* Logo / Pharmacy */}
      <div className="p-6 border-b border-green-600">
        <h2 className="text-xl font-bold">{pharmacyName}</h2>
        <p className="text-sm text-green-200">{user?.role || "Staff"}</p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`flex items-center gap-3 p-2 rounded-md hover:bg-green-600 transition ${
              location.pathname === link.path ? "bg-green-800" : ""
            }`}
          >
            {link.icon}
            <span>{link.name}</span>
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-green-600">
        <button
          onClick={logout}
          className="flex items-center gap-2 text-sm hover:text-green-300"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>

      {/* Footer */}
      <footer className="p-4 text-center text-xs text-green-300 border-t border-green-600 mt-auto">
        Powered by <span className="font-semibold text-white">PharmIQ</span>
      </footer>
    </aside>
  );
};

export default Sidebar;
