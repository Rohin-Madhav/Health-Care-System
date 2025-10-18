import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Settings, Users, Calendar } from "lucide-react";
import Footer from "../../Footer";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      <nav  className="bg-gray-800 text-white  shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-around items-center h-16">
            <div className="flex items-center space-x-2">
              <Settings className="w-8 h-8" />
              <span className="text-2xl  font-bold">Admin Panel</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => navigate("/")}
                className="bg-red-600 hover:bg-red-700 px-4 py-2  rounded"
              >
                Logout
              </button>
            </div>

            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-3">
              <button
                onClick={() => navigate("/")}
                className="w-full bg-red-600 py-2 rounded"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
      <Outlet />
      
    </div>
  );
}

export default AdminLayout;
