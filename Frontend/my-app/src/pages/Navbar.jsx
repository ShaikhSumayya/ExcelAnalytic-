import React, { useState } from "react";
import { FaWindows, FaUpload, FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/images/logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { isAuthenticated, logout } = useAuth();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="ExcelAnalytics Logo" className="h-10 w-10 object-contain" />
          <span className="text-xl font-bold text-gray-800">ExcelAnalytics</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {!isHome && (
            <Link to="/" className="text-gray-700 hover:text-violet-700 transition">Home</Link>
          )}
          <Link to="/dashboard" className="flex items-center text-gray-700 hover:text-violet-700 transition">
            <FaWindows className="mr-2" /> Dashboard
          </Link>
          <Link to="/upload" className="flex items-center text-gray-700 hover:text-violet-700 transition">
            <FaUpload className="mr-2" /> Upload
          </Link>
          {!isAuthenticated ? (
            <>
              <Link to="/login">
                <button className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg transition">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="border border-violet-600 text-violet-600 hover:bg-violet-50 px-4 py-2 rounded-lg transition">
                  Signup
                </button>
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-start gap-4 px-6 py-4 bg-white shadow-inner">
          {!isHome && <Link to="/" onClick={toggleMenu}>Home</Link>}
          <Link to="/admindashboard" onClick={toggleMenu} className="flex items-center">
            <FaWindows className="mr-2" /> Dashboard
          </Link>
          <Link to="/upload" onClick={toggleMenu} className="flex items-center">
            <FaUpload className="mr-2" /> Upload
          </Link>
          {!isAuthenticated ? (
            <>
              <Link to="/login" onClick={toggleMenu}>
                <button className="bg-violet-600 text-white px-4 py-2 rounded w-full">Login</button>
              </Link>
              <Link to="/register" onClick={toggleMenu}>
                <button className="border border-violet-600 text-violet-600 px-4 py-2 rounded w-full">Signup</button>
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                logout();
                toggleMenu();
              }}
              className="bg-red-500 text-white px-4 py-2 rounded w-full"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
