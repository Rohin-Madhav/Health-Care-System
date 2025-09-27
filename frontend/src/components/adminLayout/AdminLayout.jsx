import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";

function AdminLayout() {
  return (
    <div>
        Admin
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default AdminLayout;
