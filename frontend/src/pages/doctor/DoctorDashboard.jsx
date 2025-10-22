import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Calendar,
  Users,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Activity,
  TrendingUp,
} from "lucide-react";
import api from "../../services/Api";

export default function DoctorDashboard() {
  const [doctorData, setDoctorData] = useState("");
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const doctorId = localStorage.getItem("doctorId");

        if (!doctorId) {
          setError("No Doctor ID found. Please log in again.");
          setLoading(false);
          return;
        }

        const [userRes, aptRes, patientsRes, scheRes] = await Promise.all([
          api.get(`/users/doctor/${doctorId}`),
          api.get("/users/appointments"),
          api.get(`/users/${doctorId}/patients`),
          api.get(`/users/doctorSchedules`),
        ]);

        setDoctorData(userRes.data);
        setAppointments(aptRes.data.appointments || []);
        setPatients(patientsRes.data);
        setSchedules(scheRes.data || []);
      } catch (error) {
        console.error(error);
        setError("Error fetching Doctors");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <AlertCircle className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "pending":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "cancelled":
        return "bg-rose-100 text-rose-700 border-rose-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const quickActions = [
    {
      icon: Users,
      label: "View All Patients",
      path: "/doctor/view-patients",
      gradient: "from-teal-500 to-cyan-600",
      count: patients.length,
    },
    {
      icon: Calendar,
      label: "Manage Appointments",
      path: "/doctor/view-appointments",
      gradient: "from-indigo-500 to-purple-600",
      count: appointments.length,
    },
    {
      icon: FileText,
      label: "Add Medical Record",
      path: "/doctor/medicalrecord",
      gradient: "from-rose-500 to-pink-600",
    },
    {
      icon: Clock,
      label: "Manage Schedule",
      path: "/doctor/schedule",
      gradient: "from-amber-500 to-orange-600",
      count: schedules.length,
    },
  ];

  const stats = [
    {
      label: "Total Patients",
      value: patients.length,
      icon: Users,
      color: "text-teal-600",
      bg: "bg-teal-50",
    },
    {
      label: "Today's Appointments",
      value: appointments.length,
      icon: Calendar,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      label: "Scheduled Slots",
      value: schedules.length,
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mb-4"></div>
          <p className="text-slate-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md">
          <XCircle className="w-16 h-16 text-rose-500 mx-auto mb-4" />
          <p className="text-rose-600 text-center font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50">
      {/* Header with Gradient */}
      <div className="bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-700 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                Welcome, {doctorData.username || "Doctor"} 🧑‍⚕️
              </h1>
              <p className="text-teal-50 text-sm sm:text-base">
                Manage your practice efficiently and provide excellent care
              </p>
            </div>
            <Activity className="hidden sm:block w-16 h-16 text-white opacity-20" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-slate-100"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-500 text-sm font-medium mb-1">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold text-slate-800">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`${stat.bg} p-4 rounded-xl`}>
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-7 h-7 text-teal-600" />
            <h2 className="text-2xl font-bold text-slate-800">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  onClick={() => navigate(action.path)}
                  className={`relative overflow-hidden bg-gradient-to-br ${action.gradient} text-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group`}
                >
                  <div className="relative z-10">
                    <Icon className="w-10 h-10 mb-3 mx-auto group-hover:scale-110 transition-transform" />
                    <span className="block text-center font-semibold text-sm">
                      {action.label}
                    </span>
                    {action.count !== undefined && (
                      <span className="block text-center text-xs mt-2 bg-white bg-opacity-20 rounded-full px-3 py-1 mx-auto w-fit">
                        {action.count} items
                      </span>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Appointments Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Today's Appointments
                </h2>
                <p className="text-xs text-slate-500">
                  {appointments.length} scheduled
                </p>
              </div>
            </div>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {appointments.length > 0 ? (
                appointments.map((a) => (
                  <div
                    key={a._id}
                    className="border border-slate-200 rounded-xl p-4 hover:shadow-md hover:border-teal-300 transition-all duration-200 bg-gradient-to-r from-white to-slate-50"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-slate-800 text-lg">
                        {a.patientId?.username || "Unknown Patient"}
                      </h3>
                      <span
                        className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                          a.status
                        )}`}
                      >
                        {getStatusIcon(a.status)}
                        {a.status}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mb-2 font-medium">
                      {a.reason}
                    </p>
                    <div className="flex gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-md">
                        <Calendar className="w-3 h-3" />
                        {a.date}
                      </span>
                      <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-md">
                        <Clock className="w-3 h-3" />
                        {a.time}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-400 font-medium">
                    No appointments scheduled
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Schedule Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-2 rounded-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  My Schedule
                </h2>
                <p className="text-xs text-slate-500">Upcoming slots</p>
              </div>
            </div>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {Array.isArray(schedules) && schedules.length > 0 ? (
                schedules.map((s) => (
                  <div
                    key={s._id}
                    className="border border-slate-200 rounded-xl p-4 hover:shadow-md hover:border-amber-300 transition-all duration-200 bg-gradient-to-r from-white to-amber-50"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-bold text-slate-800">
                        {new Date(s.date).toLocaleDateString()}
                      </span>
                    </div>

                    {Array.isArray(s.availableSlots) &&
                    s.availableSlots.length > 0 ? (
                      <div className="space-y-1">
                        {s.availableSlots.map((slot, idx) => (
                          <div
                            key={idx}
                            className="flex justify-between text-sm text-slate-600 font-medium"
                          >
                            <span>
                              {slot.startTime} - {slot.endTime}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-slate-500 italic">
                        No available slots
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <Clock className="w-16 h-16 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-400 font-medium">
                    No upcoming schedules
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Patients Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
            <div className="bg-gradient-to-br from-teal-500 to-cyan-600 p-2 rounded-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">My Patients</h2>
              <p className="text-xs text-slate-500">
                {patients.length} registered patients
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {patients.length > 0 ? (
              patients.map((patient) => (
                <div
                  key={patient._id}
                  className="border border-slate-200 rounded-xl p-4 hover:shadow-lg hover:border-teal-300 transition-all duration-200 bg-gradient-to-br from-white to-teal-50 group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <span className="text-white font-bold text-lg">
                        {patient.username?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-slate-800 truncate">
                        {patient.username}
                      </h3>
                      <p className="text-xs text-slate-500 truncate">
                        {patient.email}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <Users className="w-16 h-16 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-400 font-medium">No patients found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
