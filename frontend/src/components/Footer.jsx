import React from "react";
import { Heart, Menu, X } from "lucide-react";

function Footer() {
  return (
    <div>
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="w-6 h-6" />
                <span className="text-xl font-bold">HealthCare</span>
              </div>
              <p className="text-gray-400">Your trusted healthcare partner</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2 text-gray-400">
                <p className="hover:text-white cursor-pointer transition">
                  About Us
                </p>
                <p className="hover:text-white cursor-pointer transition">
                  Services
                </p>
                <p className="hover:text-white cursor-pointer transition">
                  Doctors
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-gray-400">
                <p className="hover:text-white cursor-pointer transition">
                  Help Center
                </p>
                <p className="hover:text-white cursor-pointer transition">
                  Privacy Policy
                </p>
                <p className="hover:text-white cursor-pointer transition">
                  Terms of Service
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <p>support@healthcare.com</p>
                <p>1-800-HEALTH</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 HealthCare. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
