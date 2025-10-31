
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-green-600">
          PharmIQ
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-8">
          <a href="#features" className="text-[#1E293B] hover:text-green-600 font-medium">
            Features
          </a>
          <a href="#about" className="text-[#1E293B] hover:text-green-600 font-medium">
            About
          </a>
          <Link
            to=""
            className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-[#115E59] transition"
          >
            Book A Demo
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
