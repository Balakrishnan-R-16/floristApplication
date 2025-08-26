// src/Navbar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ user, onLogout }) => {
  const location = useLocation();

  return (
    <nav className="bg-pink-600 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          🌸 Florist Application
        </Link>

        <div className="flex space-x-6 items-center">
          <Link
            to="/"
            className={`${
              location.pathname === "/" ? "text-yellow-200" : "text-white"
            } hover:text-yellow-300 font-medium`}
          >
            Home
          </Link>

          <Link
            to="/products"
            className={`${
              location.pathname === "/products" ? "text-yellow-200" : "text-white"
            } hover:text-yellow-300 font-medium`}
          >
            Products
          </Link>

          {user && user.role === "ADMIN" && (
            <Link
              to="/florists"
              className={`${
                location.pathname === "/florists" ? "text-yellow-200" : "text-white"
              } hover:text-yellow-300 font-medium`}
            >
              View Applications
            </Link>
          )}

          {/* NEW LINK: Florist product management */}
          {user && user.role === "FLORIST" && (
            <Link
              to="/florist/products"
              className={`${
                location.pathname === "/florist/products" ? "text-yellow-200" : "text-white"
              } hover:text-yellow-300 font-medium`}
            >
              Manage Products
            </Link>
          )}

          <Link
            to="/signup"
            className={`${
              location.pathname === "/signup" ? "text-yellow-200" : "text-white"
            } hover:text-yellow-300 font-medium`}
          >
            Apply as Florist
          </Link>

          {!user ? (
            <Link
              to="/login"
              className={`${
                location.pathname === "/login" ? "text-yellow-200" : "text-white"
              } hover:text-yellow-300 font-medium`}
            >
              Login
            </Link>
          ) : (
            <button
              onClick={onLogout}
              className="bg-white text-pink-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              Logout ({user.username})
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;