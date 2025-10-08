import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Calendar, User, FileText, CreditCard } from "lucide-react";
import { Outlet } from 'react-router-dom'
import Footer from '../../Footer'

function PatientLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      <nav className="bg-green-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <User className="w-8 h-8" />
              <span className="text-2xl font-bold">Patient Portal</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link to="/patient/book-appointment" className="flex items-center space-x-2 hover:text-green-200">
                <Calendar size={20} />
                <span>Book Appointment</span>
              </Link>
              <Link to="/patient/medical-records" className="flex items-center space-x-2 hover:text-green-200">
                <FileText size={20} />
                <span>Medical Records</span>
              </Link>
              <Link to="/patient/view-payments" className="flex items-center space-x-2 hover:text-green-200">
                <CreditCard size={20} />
                <span>Payments</span>
              </Link>
              <button onClick={() => navigate("/")} className="bg-white text-green-600 hover:bg-green-100 px-4 py-2 rounded">
                Logout
              </button>
            </div>

            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-3">
              <Link to="/patient/book-appointment" className="block py-2 hover:text-green-200">Book Appointment</Link>
              <Link to="/patient/medical-records" className="block py-2 hover:text-green-200">Medical Records</Link>
              <Link to="/patient/view-payments" className="block py-2 hover:text-green-200">Payments</Link>
              <button onClick={() => navigate("/")} className="w-full bg-white text-green-600 py-2 rounded">Logout</button>
            </div>
          )}
        </div>
      </nav>
      <Outlet />
      <Footer />
    </div>
  )
}

export default PatientLayout
