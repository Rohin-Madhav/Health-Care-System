import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";

import AddDoctor from "./pages/admin/AddDoctor";
import GetAllPatients from "./pages/admin/GetAllPatients";
import Admin from "./pages/admin/Admin";
import AdminLayout from "./components/adminLayout/AdminLayout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="/admin/*" element={<AdminLayout />}>
            <Route path="dashboard" element={<Admin />} />
            <Route path="addDoctor" element={<AddDoctor />} />
            <Route path="patientDetails" element={<GetAllPatients />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
