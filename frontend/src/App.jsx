import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/layoutes/layout/Layout";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import AdminLayout from "./components/layoutes/admin/adminLayout";
import AdminDashboard from "./pages/admin/Admindashboard";
import AddDoctor from "./pages/admin/manage doctors/AddDoctor";
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
import PaymentCancel from "./pages/patient/PaymentCancel";
import StripePaymentSuccess from "./pages/patient/PaymentSuccess";
import UpdateAppointment from "./pages/patient/UpdateAppointment";
import ViewAllPatients from "./pages/doctor/ViewAllPatients";
import ManageAppointments from "./pages/doctor/ManageAppointments";
import ManageShedule from "./pages/doctor/ManageShedule";
import AddMedicalRecord from "./pages/doctor/AddMedicalRecord";
import UpdateSchedule from "./pages/doctor/UpdateSchedule";
import ManagePatients from "./pages/admin/manage patients/ManagePatients";
import ManageDoctors from "./pages/admin/manage doctors/ManageDoctors";
import Appointments from "./pages/admin/appointments/Appointments";
import Schedules from "./pages/admin/schedules/Schedules";
import ViewAllPayments from "./pages/admin/payments/ViewAllPayments";

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
            <Route path="manage-doctors" element={<ManageDoctors />} />
            <Route path="addDoctor" element={<AddDoctor />} />
            <Route path="manage-appointments" element={<Appointments />} />
            <Route path="manage-shedules" element={<Schedules />} />
            <Route path="manage-patients" element={<ManagePatients />} />
            <Route path="view-payments" element={<ViewAllPayments />} />
          </Route>
          <Route path="/doctor" element={<DoctorLayout />}>
            <Route path="doctor-dashboard" element={<DoctorDashboard />} />
            <Route path="view-patients" element={<ViewAllPatients />} />
            <Route path="view-appointments" element={<ManageAppointments />} />
            <Route path="schedule" element={<ManageShedule />} />
            <Route path="medicalrecord" element={<AddMedicalRecord />} />
            <Route path="update-shedule/:id" element={<UpdateSchedule />} />
          </Route>
          <Route path="/patient" element={<PatientLayout />}>
            <Route path="patient-dashboard" element={<PatientDashboard />} />
            <Route path="book-appointment" element={<Appointment />} />
            <Route path="view-appointment" element={<ViewAppointment />} />
            <Route
              path="update-appointment/:id"
              element={<UpdateAppointment />}
            />
            <Route path="view-payments" element={<MyPayments />} />
            <Route path="payment-success" element={<StripePaymentSuccess />} />
            <Route path="payment-cancel" element={<PaymentCancel />} />
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
