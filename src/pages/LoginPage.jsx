import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password, role } = formData;

    if (!email || !password || !role) {
      alert("Please fill in all fields.");
      return;
    }

    // ✅ Simulate user data (replace with API response later)
    const userData = {
      name: email.split("@")[0],
      email,
      role,
      pharmacyName: "lifecare-pharmacy", // will come from DB in real app
      avatar: "/default-avatar.png",
    };

    // ✅ Store in AuthContext and localStorage
    login(userData);

    // ✅ Redirect to pharmacy dashboard
    navigate(`/pharmacy-dashboard/${userData.pharmacyName}`);
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
          PharmIQ Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Email Address
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

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
              required
            />
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Login As
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
              required
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="pharmacist">Pharmacist</option>
              <option value="sales">Sales</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 transition"
          >
            Log In
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-green-700 font-medium hover:underline"
          >
            Register your pharmacy
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
