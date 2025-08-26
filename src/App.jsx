// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import FloristForm from "./FloristForm";
import FloristList from "./FloristList";
import LoginPage from "./LoginPage";
import Signup from "./Signup";
import Footer from "./Footer";
import ProductList from "./ProductList";
import FloristProductManagement from "./FloristProductManagement"; // New component

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar user={user} onLogout={handleLogout} />

        <main className="flex-grow container mx-auto px-6 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup setUser={setUser} />} />
            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <LoginPage setUser={setUser} />}
            />
            {/* Protect routes based on user role */}
            <Route
              path="/apply"
              element={
                user && user.role === "FLORIST" ? <FloristForm /> : <Navigate to="/signup" />
              }
            />
            <Route
              path="/florists"
              element={user && user.role === "ADMIN" ? <FloristList /> : <Navigate to="/" />}
            />
            <Route path="/products" element={<ProductList />} />
            {/* NEW ROUTE: Product management for florists */}
            <Route
              path="/florist/products"
              element={user && user.role === "FLORIST" ? <FloristProductManagement /> : <Navigate to="/" />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}