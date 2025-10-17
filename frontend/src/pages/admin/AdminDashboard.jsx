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

function AdminDashboard() {
  const [overview, setOverview] = useState({
    totalDoctors: 0,
    totalPatients: 0,
    totalAppointment: 0,
    toatalRevanue: 0,
  });

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/users/overview", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOverview(res.data);
      } catch (error) {
        console.log("error fetching overviews", error);
      }
    };

    fetchOverview();
  }, []);

  return (
    // <>
      <SidebarProvider>
        <div className="flex h-screen ">
          {/* Sidebar */}
          <Sidebar>
            <SidebarHeader>
              <h2 className="text-lg font-semibold">Admin Panel</h2>
            </SidebarHeader>

            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <NavLink
                      to="/admin/manage-doctors"
                      className={({ isActive }) =>
                        `block px-3 py-2 rounded-md transition ${
                          isActive
                            ? "bg-blue-100 text-blue-600 font-medium"
                            : "hover:bg-gray-100 text-gray-800"
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
                        `block px-3 py-2 rounded-md transition ${
                          isActive
                            ? "bg-blue-100 text-blue-600 font-medium"
                            : "hover:bg-gray-100 text-gray-800"
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
                        `block px-3 py-2 rounded-md transition ${
                          isActive
                            ? "bg-blue-100 text-blue-600 font-medium"
                            : "hover:bg-gray-100 text-gray-800"
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
                        `block px-3 py-2 rounded-md transition ${
                          isActive
                            ? "bg-blue-100 text-blue-600 font-medium"
                            : "hover:bg-gray-100 text-gray-800"
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
                        `block px-3 py-2 rounded-md transition ${
                          isActive
                            ? "bg-blue-100 text-blue-600 font-medium"
                            : "hover:bg-gray-100 text-gray-800"
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

          <div className="flex-1 flex flex-col bg-gray-50">
            <div className="flex items-center justify-between p-4 border-b bg-white">
              <SidebarTrigger>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SidebarTrigger>

              <h1 className="text-xl font-semibold">Admin Dashboard</h1>
            </div>

            {/* Nested Routes Render Here */}
            <div className="flex-3 overflow-y-auto bg-red-300 p-6 ">
              <Outlet />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white shadow-md rounded-lg p-6 flex items-center justify-between">
                  <h3>Total Doctors</h3>
                  <p>{overview.totalDoctors}</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6 flex items-center justify-between">
                  <h3>Total Patients:</h3>
                  <p>{overview.totalPatients}</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6 flex items-center justify-between">
                  <h3>Total Appointments :</h3>
                  <p>{overview.totalAppointment}</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6 flex items-center justify-between">
                  <h3>Total Revanue </h3>
                  <p>{overview.toatalRevanue?.[0]?.total}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarProvider>
    // {/* </> */}
  );
}

export default AdminDashboard;
