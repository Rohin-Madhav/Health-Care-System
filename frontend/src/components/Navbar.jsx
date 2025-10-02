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
              <span className="text-2xl font-bold text-gray-900">
                HealthCare
              </span>
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
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-3">
              <a
                href="#services"
                className="block text-gray-700 hover:text-blue-600"
              >
                Services
              </a>
          <Link to="/about">
            <span className="block text-gray-700 hover:text-blue-600">
              About
            </span>
          </Link>
             <Link to="/contact">
               <span className="block text-gray-700 hover:text-blue-600">
                 Contact
               </span>
             </Link>
              <button className="w-full bg-blue-600 text-white px-6 py-2 rounded-full">
                Sign In
              </button>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
