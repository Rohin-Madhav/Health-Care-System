import React from "react";
import Navbar from "../../Navbar";
import Footer from "../../Footer";
import { Outlet } from "react-router-dom";

function adminLayout() {
 
  return (
    
    <div>
      <Navbar />
    <h1> Admin</h1>

      <Outlet />
      <Footer />
    </div>
  );
}

export default adminLayout;
