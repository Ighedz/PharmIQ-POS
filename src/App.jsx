import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import PharmacyDashboardPage from "./pages/PharmacyDashboardPage";
import { AuthProvider, useAuth } from "./context/AuthContext";

// 🔒 Simplified route protection
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/*  Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* 🏥 Pharmacy Dashboard (accessible after registration/login) */}
          <Route
            path="/pharmacy-dashboard/:pharmacyName/*"
            element={
              <ProtectedRoute>
                <PharmacyDashboardPage />
              </ProtectedRoute>
            }
          />

          {/* 🔁 Catch-All Redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
