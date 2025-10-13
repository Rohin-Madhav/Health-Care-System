import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { XCircle, Calendar, CheckCircle, Clock, Trash2 } from "lucide-react";
import api from "../../services/Api";
import { Link, useNavigate } from "react-router-dom";

function ManageAppointments() {
  const [appointment, setAppointment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const [aptRes] = await Promise.all([
          api.get("/users/appointments", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setAppointment(aptRes.data);
      } catch (error) {
        setError("Error fetching appointments");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleStatusUpdate = async (appointmentId, newStatus) => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.patch(
        `/users/status/${appointmentId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAppointment((prevAppointments) =>
        prevAppointments.map((apt) =>
          apt._id === appointmentId ? res.data.appointment : apt
        )
      );
    } catch (err) {
      alert("Failed to update appointment status.");
    }
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      pending: "bg-amber-100 text-amber-700 border-amber-200",
      approved: "bg-blue-100 text-blue-700 border-blue-200",
      completed: "bg-emerald-100 text-emerald-700 border-emerald-200",
      cancelled: "bg-rose-100 text-rose-700 border-rose-200",
    };

    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${
          statusStyles[status?.toLowerCase()] || statusStyles.pending
        }`}
      >
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mb-4"></div>
          <p className="text-slate-600 font-medium">Loading appointments...</p>
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
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-700 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3">
            <Calendar className="w-8 h-8 text-white" />
            <div>
              <h1 className="text-3xl font-bold text-white">
                Manage Appointments
              </h1>
              <p className="text-teal-50 text-sm mt-1">
                Total appointments: {appointment.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {appointment.length > 0 ? (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Client Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Reason
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {appointment.map((a) => (
                    <tr
                      key={a._id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center mr-3">
                            <span className="text-white font-semibold text-sm">
                              {a.clientName?.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="font-medium text-slate-900">
                            {a.clientName}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {a.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {a.time}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {a.reason}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(a.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          {a.status !== "approved" &&
                            a.status !== "completed" && (
                              <button
                                onClick={() =>
                                  handleStatusUpdate(a._id, "approved")
                                }
                                className="inline-flex items-center gap-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                              >
                                <CheckCircle className="w-3.5 h-3.5" />
                                Approve
                              </button>
                            )}

                          {a.status === "approved" && (
                            <button
                              onClick={() =>
                                handleStatusUpdate(a._id, "completed")
                              }
                              className="inline-flex items-center gap-1 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                            >
                              <CheckCircle className="w-3.5 h-3.5" />
                              Complete
                            </button>
                          )}
                        </div>
                      </td>
                      <td>
                        <Link to={"/doctor/medicalrecord"}
                      
                      className="inline-flex items-center gap-1 px-3 py-2 bg-slate-600 hover:bg-slate-700 text-white text-xs font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                    >
                      Add Record
                    </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden divide-y divide-slate-200">
              {appointment.map((a) => (
                <div key={a._id} className="p-4 hover:bg-slate-50">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {a.clientName?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">
                          {a.clientName}
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          {a.date} • {a.time}
                        </div>
                      </div>
                    </div>
                    {getStatusBadge(a.status)}
                  </div>

                  <div className="mb-3">
                    <p className="text-sm text-slate-600">{a.reason}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {a.status !== "approved" && a.status !== "completed" && (
                      <button
                        onClick={() => handleStatusUpdate(a._id, "approved")}
                        className="inline-flex items-center gap-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors duration-200 shadow-sm"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        Approve
                      </button>
                    )}

                    {a.status === "approved" && (
                      <button
                        onClick={() => handleStatusUpdate(a._id, "completed")}
                        className="inline-flex items-center gap-1 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium rounded-lg transition-colors duration-200 shadow-sm"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        Complete
                      </button>
                    )}
                    <Link to={"/doctor/medicalrecord"}
                      
                      className="inline-flex items-center gap-1 px-3 py-2 bg-slate-600 hover:bg-slate-700 text-white text-xs font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                    >
                      Add Record
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-slate-200">
            <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              No Appointments Found
            </h3>
            <p className="text-sm text-slate-500">
              There are no appointments to manage at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageAppointments;
