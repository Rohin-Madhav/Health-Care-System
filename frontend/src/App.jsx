import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/layoutes/layout/Layout";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import AdminLayout from "./components/layoutes/admin/adminLayout";
import AdminDashboard from "./pages/admin/Admindashboard";
import AddDoctor from "./pages/admin/AddDoctor";
import GetAllPatients from "./pages/admin/GetAllPatients";
import DoctorLayout from "./components/layoutes/doctor/DoctorLayout";
import Register from "./pages/Register";
import PatientLogin from "./pages/PatientLogin";
import StaffLogin from "./pages/StaffLogin";
import PatientDashboard from "./pages/patient/PatientDashboard";
import PatientLayout from "./components/layoutes/patient/PatientLayout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Appointment from "./pages/patient/Appointment";
import ViewAppointment from "./pages/patient/ViewAppointment";
import MyPayments from "./pages/patient/MyPayments";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
          </Route>

          <Route path="/admin" element={<AdminLayout />}>
            <Route path="admin-dashboard" element={<AdminDashboard />} />
            <Route path="addDoctor" element={<AddDoctor />} />
            <Route path="patientDetails" element={<GetAllPatients />} />
          </Route>
          <Route path="/doctor" element={<DoctorLayout />}>
            <Route path="doctor-dashboard" element={<DoctorDashboard />} />
            {/* <Route path="addDoctor" element={<AddDoctor />} />
            <Route path="patientDetails" element={<GetAllPatients />} /> */}
          </Route>
          <Route path="/patient" element={<PatientLayout />}>
            <Route path="patient-dashboard" element={<PatientDashboard />} />
            <Route path="book-appointment" element={<Appointment />} />
            <Route path="view-appointment" element={<ViewAppointment />} />
            <Route path="view-payments" element={<MyPayments />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/patientLogin" element={<PatientLogin />} />
          <Route path="/staffLogin" element={<StaffLogin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
