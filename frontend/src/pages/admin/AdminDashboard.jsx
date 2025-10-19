import React, { useEffect, useState } from "react";
import {
  Sidebar,
  SidebarProvider,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import api from "../../services/Api";
import {
  Bar,
  BarChart,
  LineChart,
  CartesianGrid,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function AdminDashboard() {
  const [overview, setOverview] = useState({
    totalDoctors: 0,
    totalPatients: 0,
    totalAppointment: 0,
    toatalRevanue: 0,
    appointmentStats: "",
    monthlyRevenue: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOverview = async () => {
      setLoading(true)
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/users/overview", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOverview(res.data);
      } catch (error) {
        setError("error fetching overviews", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOverview();
  }, []);

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
    <>
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-gray-50">
          {/* Sidebar */}
          <Sidebar className="border-r border-gray-200 bg-white">
            <SidebarHeader className="border-b border-gray-200 px-6 py-5">
              <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
            </SidebarHeader>

            <SidebarContent className="px-3 py-4">
              <SidebarGroup>
                <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Navigation
                </SidebarGroupLabel>
                <SidebarMenu className="space-y-1">
                  <SidebarMenuItem>
                    <NavLink
                      to="/admin/manage-doctors"
                      className={({ isActive }) =>
                        `block px-4 py-3 rounded-lg transition-all duration-200 ${
                          isActive
                            ? "bg-blue-50 text-blue-600 font-semibold shadow-sm"
                            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                        }`
                      }
                    >
                      Manage Doctors
                    </NavLink>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <NavLink
                      to="/admin/manage-patients"
                      className={({ isActive }) =>
                        `block px-4 py-3 rounded-lg transition-all duration-200 ${
                          isActive
                            ? "bg-blue-50 text-blue-600 font-semibold shadow-sm"
                            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                        }`
                      }
                    >
                      Manage Patients
                    </NavLink>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <NavLink
                      to="/admin/manage-appointments"
                      className={({ isActive }) =>
                        `block px-4 py-3 rounded-lg transition-all duration-200 ${
                          isActive
                            ? "bg-blue-50 text-blue-600 font-semibold shadow-sm"
                            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                        }`
                      }
                    >
                      Manage Appointments
                    </NavLink>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <NavLink
                      to="/admin/manage-schedules"
                      className={({ isActive }) =>
                        `block px-4 py-3 rounded-lg transition-all duration-200 ${
                          isActive
                            ? "bg-blue-50 text-blue-600 font-semibold shadow-sm"
                            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                        }`
                      }
                    >
                      Manage Schedules
                    </NavLink>
                  </SidebarMenuItem>

                  <SidebarMenuItem>
                    <NavLink
                      to="/admin/view-payments"
                      className={({ isActive }) =>
                        `block px-4 py-3 rounded-lg transition-all duration-200 ${
                          isActive
                            ? "bg-blue-50 text-blue-600 font-semibold shadow-sm"
                            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                        }`
                      }
                    >
                      Payments
                    </NavLink>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>

          {/* Main Content */}
          <div className="flex flex-1 flex-col min-h-screen">
            {/* Header */}
            <header className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
              <SidebarTrigger>
                <Button
                  variant="outline"
                  size="icon"
                  className="hover:bg-gray-100"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SidebarTrigger>

              <h1 className="text-2xl font-bold text-gray-800">
                Admin Dashboard
              </h1>
            </header>

            {/* Scrollable Content Area */}
            <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
              <Outlet />

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Total Doctors
                  </h3>
                  <p className="text-4xl font-bold text-gray-900">
                    {overview.totalDoctors}
                  </p>
                </div>

                <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Total Patients
                  </h3>
                  <p className="text-4xl font-bold text-gray-900">
                    {overview.totalPatients}
                  </p>
                </div>

                <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Total Appointments
                  </h3>
                  <p className="text-4xl font-bold text-gray-900">
                    {overview.totalAppointment}
                  </p>
                </div>

                <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Total Revenue
                  </h3>
                  <p className="text-4xl font-bold text-green-600">
                    ${overview.toatalRevanue?.[0]?.total || 0}
                  </p>
                </div>
              </div>

              {/* Appointment Overview Chart */}
              <div className="bg-white shadow-lg rounded-xl p-6 mb-8 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  Appointment Overview
                </h2>
                {Array.isArray(overview.appointmentStats) &&
                overview.appointmentStats.length > 0 ? (
                  <ResponsiveContainer width="100%" height={450}>
                    <BarChart data={overview.appointmentStats}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis
                        dataKey="month"
                        tick={{ fill: "#6b7280" }}
                        tickLine={{ stroke: "#e5e7eb" }}
                      />
                      <YAxis
                        tick={{ fill: "#6b7280" }}
                        tickLine={{ stroke: "#e5e7eb" }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#ffffff",
                          border: "1px solid #e5e7eb",
                          borderRadius: "8px",
                          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        }}
                      />
                      <Legend
                        wrapperStyle={{
                          paddingTop: "20px",
                        }}
                      />
                      <Bar
                        dataKey="completed"
                        fill="#14b8a6"
                        name="Completed"
                        radius={[8, 8, 0, 0]}
                      />
                      <Bar
                        dataKey="pending"
                        fill="#fbbf24"
                        name="Pending"
                        radius={[8, 8, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center py-16">
                    <p className="text-gray-400 text-lg">
                      No appointment statistics available
                    </p>
                  </div>
                )}
              </div>

              {/* Monthly Revenue Chart */}
              <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  Monthly Payments
                </h2>
                <div>
                  {Array.isArray(overview.monthlyRevenue) &&
                  overview.monthlyRevenue.length > 0 ? (
                    <ResponsiveContainer width="100%" height={350}>
                      <LineChart data={overview.monthlyRevenue}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                          dataKey="month"
                          tick={{ fill: "#6b7280" }}
                          tickLine={{ stroke: "#e5e7eb" }}
                        />
                        <YAxis
                          tick={{ fill: "#6b7280" }}
                          tickLine={{ stroke: "#e5e7eb" }}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#ffffff",
                            border: "1px solid #e5e7eb",
                            borderRadius: "8px",
                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                          }}
                        />
                        <Legend
                          wrapperStyle={{
                            paddingTop: "20px",
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="totalRevenue"
                          stroke="#10b981"
                          strokeWidth={3}
                          name="Revenue"
                          dot={{ fill: "#10b981", r: 5 }}
                          activeDot={{ r: 7 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex items-center justify-center py-16">
                      <p className="text-gray-400 text-lg">
                        No monthly revenue data available
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}

export default AdminDashboard;
