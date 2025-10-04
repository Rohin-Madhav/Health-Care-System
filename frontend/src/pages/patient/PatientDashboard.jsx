import React, { useState, useEffect } from "react";
import { Calendar, DollarSign, Clock, AlertCircle } from "lucide-react";
import api from "../../services/Api";

export default function PatientDashboard() {
  const [patientData, setPatientData] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        if (!userId) {
          setError("No patient ID found. Please log in again.");
          setLoading(false);
          return;
        }

        const [userRes, apptRes, payRes] = await Promise.all([
          api.get(`/users/patient/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          api.get(`/users/appointments/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          api.get(`/payment/my/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setPatientData(userRes.data);
        setAppointments(apptRes.data);
        setPayments(payRes.data);
      } catch (error) {
        console.error(error);
        setError("Error fetching patient data or appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  // Find the next upcoming appointment
  const upcomingAppointment = appointments.find(
    (a) => new Date(a.date) > new Date() && a.status !== "cancelled"
  );

  // Filter pending payments
  const pendingPayments = payments.filter((p) => p.status === "pending");
  const totalPendingAmount = pendingPayments.reduce(
    (sum, p) => sum + (p.amount || 0),
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome back, {patientData?.username || "Patient"}! 👋
          </h1>
          <p className="text-gray-600">Here's your health dashboard overview</p>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Upcoming Appointment Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="ml-3 text-lg font-semibold text-gray-800">
                  Upcoming Appointment
                </h3>
              </div>
            </div>

            {upcomingAppointment ? (
              <div className="space-y-2">
                <div className="flex items-center text-gray-700">
                  <Clock className="w-4 h-4 mr-2 text-gray-500" />
                  <span className="font-medium">
                    {new Date(upcomingAppointment.date).toLocaleDateString()}
                  </span>
                  <span className="mx-2">•</span>
                  <span>{upcomingAppointment.time}</span>
                </div>
                <p className="text-gray-600">
                  {upcomingAppointment.doctor?.username || "Unknown Doctor"}
                </p>
                <p className="text-sm text-gray-500">
                  {upcomingAppointment.service}
                </p>
              </div>
            ) : (
              <p className="text-gray-600">No upcoming appointments.</p>
            )}
          </div>

          {/* Pending Payments Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500 hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <DollarSign className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="ml-3 text-lg font-semibold text-gray-800">
                  Pending Payments
                </h3>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <AlertCircle className="w-4 h-4 mr-2 text-orange-500" />
                <span className="text-2xl font-bold text-gray-800">
                  ${totalPendingAmount.toFixed(2)}
                </span>
              </div>
              <p className="text-gray-600">
                {pendingPayments.length} outstanding invoice
                {pendingPayments.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Quick Actions
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg shadow-md transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              <Calendar className="w-5 h-5 mx-auto mb-2" />
              Book Appointment
            </button>

            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-6 rounded-lg shadow-md transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              <Calendar className="w-5 h-5 mx-auto mb-2" />
              View My Appointments
            </button>

            <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-6 rounded-lg shadow-md transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
              <DollarSign className="w-5 h-5 mx-auto mb-2" />
              View My Payments
            </button>

            {pendingPayments.length > 0 && (
              <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-4 px-6 rounded-lg shadow-md transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 animate-pulse">
                <DollarSign className="w-5 h-5 mx-auto mb-2" />
                Make Payment
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
