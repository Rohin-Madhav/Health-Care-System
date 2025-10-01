import React, { useState } from 'react';
import { Users, UserCheck, Calendar, DollarSign, TrendingUp, CheckCircle, XCircle, Clock, Shield } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function AdminDashboard() {
  const [adminData] = useState({
    stats: {
      totalDoctors: 45,
      totalPatients: 1248,
      totalAppointments: 856,
      totalPayments: 125420.50,
      monthlyGrowth: 12.5
    },
    pendingDoctors: [
      { id: 1, name: 'Dr. Sarah Mitchell', specialty: 'Pediatrics', experience: '8 years', submitted: '2 days ago' },
      { id: 2, name: 'Dr. James Anderson', specialty: 'Orthopedics', experience: '12 years', submitted: '3 days ago' },
      { id: 3, name: 'Dr. Emily Roberts', specialty: 'Dermatology', experience: '6 years', submitted: '5 days ago' },
      { id: 4, name: 'Dr. Michael Zhang', specialty: 'Neurology', experience: '15 years', submitted: '1 week ago' }
    ],
    recentAppointments: [
      { id: 1, patient: 'John Doe', doctor: 'Dr. Smith', date: 'Oct 1, 2025', time: '10:00 AM', status: 'completed' },
      { id: 2, patient: 'Jane Wilson', doctor: 'Dr. Chen', date: 'Oct 1, 2025', time: '11:30 AM', status: 'pending' },
      { id: 3, patient: 'Bob Johnson', doctor: 'Dr. Kumar', date: 'Oct 1, 2025', time: '02:00 PM', status: 'confirmed' },
      { id: 4, patient: 'Alice Brown', doctor: 'Dr. Lee', date: 'Oct 2, 2025', time: '09:00 AM', status: 'pending' },
      { id: 5, patient: 'Tom Davis', doctor: 'Dr. Patel', date: 'Oct 2, 2025', time: '03:30 PM', status: 'confirmed' }
    ],
    monthlyPayments: [
      { month: 'Apr', amount: 18500 },
      { month: 'May', amount: 22300 },
      { month: 'Jun', amount: 19800 },
      { month: 'Jul', amount: 24500 },
      { month: 'Aug', amount: 28900 },
      { month: 'Sep', amount: 31200 }
    ],
    appointmentStats: [
      { month: 'Apr', completed: 120, canceled: 15 },
      { month: 'May', completed: 145, canceled: 12 },
      { month: 'Jun', completed: 132, canceled: 18 },
      { month: 'Jul', completed: 158, canceled: 10 },
      { month: 'Aug', completed: 175, canceled: 14 },
      { month: 'Sep', completed: 189, canceled: 9 }
    ]
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'canceled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center mb-2">
            <Shield className="w-10 h-10 text-purple-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
          </div>
          <p className="text-gray-600">System Overview & Management</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-gray-500 text-sm mb-1">Total Doctors</p>
                <p className="text-3xl font-bold text-gray-800">{adminData.stats.totalDoctors}</p>
              </div>
              <UserCheck className="w-12 h-12 text-purple-500" />
            </div>
            <p className="text-sm text-green-600 flex items-center mt-2">
              <TrendingUp className="w-4 h-4 mr-1" />
              +{adminData.stats.monthlyGrowth}% this month
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-gray-500 text-sm mb-1">Total Patients</p>
                <p className="text-3xl font-bold text-gray-800">{adminData.stats.totalPatients}</p>
              </div>
              <Users className="w-12 h-12 text-blue-500" />
            </div>
            <p className="text-sm text-green-600 flex items-center mt-2">
              <TrendingUp className="w-4 h-4 mr-1" />
              +{adminData.stats.monthlyGrowth}% this month
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-teal-500 hover:shadow-xl transition">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-gray-500 text-sm mb-1">Total Appointments</p>
                <p className="text-3xl font-bold text-gray-800">{adminData.stats.totalAppointments}</p>
              </div>
              <Calendar className="w-12 h-12 text-teal-500" />
            </div>
            <p className="text-sm text-gray-500 mt-2">This month</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-gray-500 text-sm mb-1">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-800">${(adminData.stats.totalPayments / 1000).toFixed(1)}K</p>
              </div>
              <DollarSign className="w-12 h-12 text-green-500" />
            </div>
            <p className="text-sm text-green-600 flex items-center mt-2">
              <TrendingUp className="w-4 h-4 mr-1" />
              +{adminData.stats.monthlyGrowth}% this month
            </p>
          </div>
        </div>

        {/* Management Actions */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-6 rounded-lg shadow-md transition-all hover:scale-105">
            <UserCheck className="w-6 h-6 mx-auto mb-2" />
            Manage Doctors
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg shadow-md transition-all hover:scale-105">
            <Users className="w-6 h-6 mx-auto mb-2" />
            Manage Patients
          </button>
          <button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-4 px-6 rounded-lg shadow-md transition-all hover:scale-105">
            <Calendar className="w-6 h-6 mx-auto mb-2" />
            All Appointments
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-lg shadow-md transition-all hover:scale-105">
            <DollarSign className="w-6 h-6 mx-auto mb-2" />
            All Payments
          </button>
        </div>

        {/* Pending Doctor Approvals */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Clock className="w-6 h-6 text-orange-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">Pending Doctor Approvals</h2>
            </div>
            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">
              {adminData.pendingDoctors.length} Pending
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Doctor Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Specialty</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Experience</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Submitted</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {adminData.pendingDoctors.map((doctor) => (
                  <tr key={doctor.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 font-semibold text-gray-800">{doctor.name}</td>
                    <td className="py-4 px-4 text-gray-600">{doctor.specialty}</td>
                    <td className="py-4 px-4 text-gray-600">{doctor.experience}</td>
                    <td className="py-4 px-4 text-gray-600">{doctor.submitted}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center space-x-2">
                        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition flex items-center">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </button>
                        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition flex items-center">
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Payments Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-6">
              <DollarSign className="w-6 h-6 text-green-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">Monthly Revenue Overview</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={adminData.monthlyPayments}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value}`} />
                <Legend />
                <Line type="monotone" dataKey="amount" stroke="#10b981" strokeWidth={3} name="Revenue ($)" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Appointments Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-6">
              <Calendar className="w-6 h-6 text-teal-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">Appointments Statistics</h2>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={adminData.appointmentStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" fill="#14b8a6" name="Completed" />
                <Bar dataKey="canceled" fill="#ef4444" name="Canceled" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Appointments */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Calendar className="w-6 h-6 text-teal-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">Recent Appointments</h2>
            </div>
            <button className="text-teal-600 hover:text-teal-700 font-semibold text-sm">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Patient</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Doctor</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Time</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {adminData.recentAppointments.map((apt) => (
                  <tr key={apt.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 font-semibold text-gray-800">{apt.patient}</td>
                    <td className="py-4 px-4 text-gray-600">{apt.doctor}</td>
                    <td className="py-4 px-4 text-gray-600">{apt.date}</td>
                    <td className="py-4 px-4 text-gray-600">{apt.time}</td>
                    <td className="py-4 px-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(apt.status)}`}>
                        {apt.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}