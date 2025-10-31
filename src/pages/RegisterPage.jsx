import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ import context

const RegisterPage = () => {
  const navigate = useNavigate();
  const { setUser, setPharmacy } = useAuth(); // ✅ use context
  const [formData, setFormData] = useState({
    pharmacyName: "",
    premiseNumber: "",
    adminName: "",
    email: "",
    password: "",
    contact: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.pharmacyName || !formData.premiseNumber || !formData.adminName || !formData.email || !formData.password) {
      alert("Please fill in all required fields.");
      return;
    }

    // Save data in context
    setPharmacy({
      name: formData.pharmacyName,
      premiseNumber: formData.premiseNumber,
      contact: formData.contact,
      address: formData.address,
    });

    setUser({
      name: formData.adminName,
      email: formData.email,
    });

    navigate(`/pharmacy-dashboard/${formData.pharmacyName}/sales`);
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
          Register Your Pharmacy
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Pharmacy Info */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Pharmacy Name
            </label>
            <input
              type="text"
              name="pharmacyName"
              value={formData.pharmacyName}
              onChange={handleChange}
              placeholder="e.g. LifeCare Pharmacy"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="e.g. 24 Allen Avenue, Ikeja, Lagos"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Premise Registration Number
            </label>
            <input
              type="text"
              name="premiseNumber"
              value={formData.premiseNumber}
              onChange={handleChange}
              placeholder="e.g. PCN/LAG/12345"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
              required
            />
          </div>

          {/* Admin Info */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Admin Full Name
            </label>
            <input
              type="text"
              name="adminName"
              value={formData.adminName}
              onChange={handleChange}
              placeholder="e.g. Dr. Osakpolor David"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Admin Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. contact@lifecare.com"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a secure password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Contact Number
            </label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="e.g. +234 809 123 4567"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 transition"
          >
            Create My Storefront
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Already registered?{" "}
          <a href="/login" className="text-green-700 font-medium hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
