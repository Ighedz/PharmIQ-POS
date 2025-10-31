import React from "react";

const Footer = () => {
  return (
    <footer className="bg-green-700 text-white py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm mb-4 md:mb-0">
          © {new Date().getFullYear()} PharmIQ. All rights reserved.
        </p>
        <div className="flex space-x-6 text-sm">
          <a href="#about" className="hover:underline">About</a>
          <a href="#features" className="hover:underline">Features</a>
          <a href="#demo" className="hover:underline">Book a Demo</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

