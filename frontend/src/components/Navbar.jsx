import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate()

  return (
    <div>
   
        <nav className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Heart className="w-8 h-8 text-blue-600" />
              <Link to="/" className="text-2xl font-bold text-gray-900">
                HealthCare
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              
              <a
                href="#services"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Services
              </a>
              <Link
                to="/about"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Contact
              </Link>
              <button
                type="button"
                onClick={() => navigate("/patientLogin")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition"
              >
                Sign In
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
          </div>

          {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gradient-to-b from-white to-gray-50 border-t border-gray-200 shadow-lg">
            <div className="px-6 py-6 space-y-1">
              
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-gray-700 hover:text-blue-600 hover:bg-blue-50 py-3 px-4 rounded-lg transition-all duration-200 font-medium"
              >
                Services
              </a>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)}>
                <span className="block text-gray-700 hover:text-blue-600 hover:bg-blue-50 py-3 px-4 rounded-lg transition-all duration-200 font-medium">
                  About
                </span>
              </Link>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                <span className="block text-gray-700 hover:text-blue-600 hover:bg-blue-50 py-3 px-4 rounded-lg transition-all duration-200 font-medium">
                  Contact
                </span>
              </Link>
              <div className="pt-4 pb-2">
                <Link to="/patientLogin" onClick={() => setMobileMenuOpen(false)}>
                  <span className="block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-200 text-center font-semibold shadow-md hover:shadow-lg">
                    Sign In
                  </span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;