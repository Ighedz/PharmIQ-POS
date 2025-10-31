import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const AuthContext = createContext();

// Custom hook
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [pharmacy, setPharmacy] = useState(null);

  // Load user + pharmacy from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("pharmiq_user");
    const storedPharmacy = localStorage.getItem("pharmiq_pharmacy");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("pharmiq_user");
      }
    }

    if (storedPharmacy) {
      try {
        setPharmacy(JSON.parse(storedPharmacy));
      } catch (error) {
        console.error("Error parsing stored pharmacy:", error);
        localStorage.removeItem("pharmiq_pharmacy");
      }
    }
  }, []);

  // Login and persist user
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("pharmiq_user", JSON.stringify(userData));
  };

  // Save pharmacy info
  const registerPharmacy = (pharmacyData) => {
    setPharmacy(pharmacyData);
    localStorage.setItem("pharmiq_pharmacy", JSON.stringify(pharmacyData));
  };

  // Logout clears everything
  const logout = () => {
    setUser(null);
    setPharmacy(null);
    localStorage.removeItem("pharmiq_user");
    localStorage.removeItem("pharmiq_pharmacy");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        pharmacy,
        login,
        logout,
        setUser,
        setPharmacy: registerPharmacy, // ✅ expose this function
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
