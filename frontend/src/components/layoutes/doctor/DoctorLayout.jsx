import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, UserCircle, Calendar, ClipboardList } from "lucide-react";
import { Outlet } from 'react-router-dom'
import Footer from '../../Footer'

function DoctorLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
   
  return (
    <div>
      <nav className="bg-zinc-500 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <UserCircle className="w-8 h-8" />
              <span className="text-2xl font-bold">Doctor Dashboard</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link to="/doctor/view-appointments" className="flex items-center space-x-2 hover:text-blue-200">
                <Calendar size={20} />
                <span>My Appointments</span>
              </Link>
              <Link to="/doctor/view-patients" className="flex items-center space-x-2 hover:text-blue-200">
                <ClipboardList size={20} />
                <span>Patient Records</span>
              </Link>
              <button onClick={() => navigate("/")} className="bg-white text-blue-700 hover:bg-blue-100 px-4 py-2 rounded">
                Logout
              </button>
            </div>

            <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-3">
              <Link to="/doctor/view-appointments" className="block py-2 hover:text-blue-200">My Appointments</Link>
              <Link to="/doctor/view-patients" className="block py-2 hover:text-blue-200">Patient Records</Link>
              <button onClick={() => navigate("/")} className="w-full bg-white text-blue-700 py-2 rounded">Logout</button>
            </div>
          )}
        </div>
      </nav>
      <Outlet />
      <Footer />
    </div>
  )
}

export default DoctorLayout
