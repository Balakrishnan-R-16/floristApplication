// src/Footer.jsx
import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-8 pb-4">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
          {/* Brand Info */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-white mb-2">Florist Application</h2>
            <p className="text-sm md:text-base">
              Delivering fresh flowers to your doorstep with love.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <a href="/" className="hover:text-white transition-colors duration-200">
              Home
            </a>
            <a href="/about" className="hover:text-white transition-colors duration-200">
              About
            </a>
            <a href="/contact" className="hover:text-white transition-colors duration-200">
              Contact
            </a>
            <a href="/faq" className="hover:text-white transition-colors duration-200">
              FAQ
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-6"></div>

        {/* Bottom Section */}
        <div className="mt-4 text-center text-sm text-gray-400">
          &copy; {currentYear} Florist Application. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
