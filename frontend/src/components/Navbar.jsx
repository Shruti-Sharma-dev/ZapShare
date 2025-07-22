import React, { useState } from 'react';
import { useAuth } from '../context/ContextProvider.jsx';
import { Link } from 'react-router-dom';
import { FaUser, FaBars } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/* Top Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-purple-700 shadow-md border-b border-purple-100 z-50 relative">
        <div className="flex items-center gap-2">
          <FaUser className="text-white" size={22} />
          <h1 className="text-xl sm:text-2xl font-bold text-white">{user?.name || 'Welcome'}</h1>
        </div>

        {user ? (
          <button
            className="p-2 rounded-full hover:bg-white transition"
            onClick={() => setIsSidebarOpen(true)}
          >
            <FaBars className="text-white hover:text-purple-900" size={20} />
          </button>
        ) : (
          <div className="flex gap-3">purple-100
            <Link to="/login">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow text-sm">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg shadow text-sm">
                Signup
              </button>
            </Link>
          </div>
        )}
      </nav>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl border-l border-purple-200 z-50 transform transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center px-4 py-4 border-b border-purple-100">
          <h3 className="text-lg font-semibold text-purple-700">👋 Hello, {user?.name}</h3>
          <button
            className="text-purple-400 hover:text-rose-500 text-2xl"
            onClick={() => setIsSidebarOpen(false)}
          >
            ✕
          </button>
        </div>
        <div className="p-4">
          <button
            onClick={handleLogout}
            className="w-full py-2 px-4 bg-rose-500 hover:bg-rose-600 text-white rounded-lg shadow"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Backdrop when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
