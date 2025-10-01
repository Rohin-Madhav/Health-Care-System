import React, { useState } from "react";
import {
  Calendar,
  Users,
  FileText,
  BarChart3,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
} from "lucide-react";

export default function DoctorDashboard() {
  const [doctorData] = useState({
    name: "Dr. Vipin KP",
    specialty: "Cardiology",
    stats: {
      patientsThisWeek: 42,
      completedAppointments: 156,
      pendingAppointments: 8,
      canceledAppointments: 3,
    },
    todaySchedule: [
      {
        id: 1,
        time: "09:00 AM",
        patient: "Sarah Johnson",
        type: "Follow-up",
        status: "confirmed",
      },
      {
        id: 2,
        time: "10:30 AM",
        patient: "John Davis",
        type: "Consultation",
        status: "confirmed",
      },
      {
        id: 3,
        time: "02:00 PM",
        patient: "Emily Wilson",
        type: "Check-up",
        status: "pending",
      },
      {
        id: 4,
        time: "03:30 PM",
        patient: "Robert Brown",
        type: "Follow-up",
        status: "confirmed",
      },
    ],
    tomorrowSchedule: [
      {
        id: 5,
        time: "09:30 AM",
        patient: "Lisa Martinez",
        type: "Consultation",
        status: "confirmed",
      },
      {
        id: 6,
        time: "11:00 AM",
        patient: "David Lee",
        type: "Check-up",
        status: "pending",
      },
    ],
    patients: [
      {
        id: 1,
        name: "Sarah Johnson",
        age: 45,
        lastVisit: "2 days ago",
        condition: "Hypertension",
      },
      {
        id: 2,
        name: "John Davis",
        age: 52,
        lastVisit: "1 week ago",
        condition: "Arrhythmia",
      },
      {
        id: 3,
        name: "Emily Wilson",
        age: 38,
        lastVisit: "3 weeks ago",
        condition: "Routine Check-up",
      },
      {
        id: 4,
        name: "Robert Brown",
        age: 61,
        lastVisit: "1 month ago",
        condition: "Heart Disease",
      },
    ],
    upcomingAppointments: [
      {
        id: 1,
        date: "Oct 1, 2025",
        time: "09:00 AM",
        patient: "Sarah Johnson",
        type: "Follow-up",
      },
      {
        id: 2,
        date: "Oct 1, 2025",
        time: "10:30 AM",
        patient: "John Davis",
        type: "Consultation",
      },
      {
        id: 3,
        date: "Oct 1, 2025",
        time: "02:00 PM",
        patient: "Emily Wilson",
        type: "Check-up",
      },
      {
        id: 4,
        date: "Oct 2, 2025",
        time: "09:30 AM",
        patient: "Lisa Martinez",
        type: "Consultation",
      },
      {
        id: 5,
        date: "Oct 2, 2025",
        time: "11:00 AM",
        patient: "David Lee",
        type: "Check-up",
      },
    ],
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "canceled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome, {doctorData.name} 👨‍⚕️
          </h1>
          <p className="text-gray-600">
            {doctorData.specialty} • Your Dashboard Overview
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-teal-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1">Patients This Week</p>
                <p className="text-3xl font-bold text-gray-800">
                  {doctorData.stats.patientsThisWeek}
                </p>
              </div>
              <Users className="w-10 h-10 text-teal-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1">Completed</p>
                <p className="text-3xl font-bold text-gray-800">
                  {doctorData.stats.completedAppointments}
                </p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1">Pending</p>
                <p className="text-3xl font-bold text-gray-800">
                  {doctorData.stats.pendingAppointments}
                </p>
              </div>
              <AlertCircle className="w-10 h-10 text-yellow-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm mb-1">Canceled</p>
                <p className="text-3xl font-bold text-gray-800">
                  {doctorData.stats.canceledAppointments}
                </p>
              </div>
              <XCircle className="w-10 h-10 text-red-500" />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* My Schedule */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Calendar className="w-6 h-6 text-teal-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">
                  My Schedule
                </h2>
              </div>
            </div>

            {/* Today's Schedule */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                Today
              </h3>
              <div className="space-y-3">
                {doctorData.todaySchedule.map((apt) => (
                  <div
                    key={apt.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-teal-600 font-semibold">
                        <Clock className="w-4 h-4 mr-2" />
                        {apt.time}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">
                          {apt.patient}
                        </p>
                        <p className="text-sm text-gray-500">{apt.type}</p>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        apt.status
                      )}`}
                    >
                      {apt.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tomorrow's Schedule */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                Tomorrow
              </h3>
              <div className="space-y-3">
                {doctorData.tomorrowSchedule.map((apt) => (
                  <div
                    key={apt.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-teal-600 font-semibold">
                        <Clock className="w-4 h-4 mr-2" />
                        {apt.time}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">
                          {apt.patient}
                        </p>
                        <p className="text-sm text-gray-500">{apt.type}</p>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        apt.status
                      )}`}
                    >
                      {apt.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-all hover:scale-105 flex items-center justify-center">
                <Plus className="w-5 h-5 mr-2" />
                Add Prescription
              </button>
              <button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-all hover:scale-105 flex items-center justify-center">
                <FileText className="w-5 h-5 mr-2" />
                View Prescriptions
              </button>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-all hover:scale-105 flex items-center justify-center">
                <Calendar className="w-5 h-5 mr-2" />
                Manage Schedule
              </button>
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition-all hover:scale-105 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                View Reports
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* My Patients */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Users className="w-6 h-6 text-teal-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">
                  My Patients
                </h2>
              </div>
              <button className="text-teal-600 hover:text-teal-700 font-semibold text-sm">
                View All
              </button>
            </div>
            <div className="space-y-3">
              {doctorData.patients.map((patient) => (
                <div
                  key={patient.id}
                  className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-800">
                        {patient.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Age: {patient.age} • Last visit: {patient.lastVisit}
                      </p>
                      <p className="text-sm text-teal-600 mt-1">
                        {patient.condition}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Appointments Table */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Calendar className="w-6 h-6 text-teal-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">
                  Upcoming Appointments
                </h2>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600">
                      Date
                    </th>
                    <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600">
                      Time
                    </th>
                    <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600">
                      Patient
                    </th>
                    <th className="text-left py-3 px-2 text-sm font-semibold text-gray-600">
                      Type
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {doctorData.upcomingAppointments.map((apt) => (
                    <tr
                      key={apt.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-3 px-2 text-sm text-gray-800">
                        {apt.date}
                      </td>
                      <td className="py-3 px-2 text-sm text-gray-800">
                        {apt.time}
                      </td>
                      <td className="py-3 px-2 text-sm font-semibold text-gray-800">
                        {apt.patient}
                      </td>
                      <td className="py-3 px-2 text-sm text-gray-600">
                        {apt.type}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
