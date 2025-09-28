import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../Navbar'
import Footer from '../../Footer'

function DoctorLayout() {
   
  return (
    <div>
      <Navbar />
       Doctor
      <Outlet />
      <Footer />
    </div>
  )
}

export default DoctorLayout
