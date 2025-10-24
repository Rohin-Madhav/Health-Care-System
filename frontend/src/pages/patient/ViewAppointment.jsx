import React, { useEffect,  useState } from "react";
import api from "../../services/Api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function ViewAppointment() {
  const [appointments, setAppointments] = useState([]);
  const [deletingAppointment, setDeletingAppointment] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const userId = localStorage.getItem("userId");
        const response = await api.get(`users/appointments/${userId}`);
        setAppointments(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const handleDelete = async (appointmentId) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) {
      return;
    }
    setDeletingAppointment(true);
    try {
      await api.delete(`/users/appointment/${appointmentId}`);
      setAppointments((prev) =>
        prev.filter((appt) => appt._id !== appointmentId)
      );
      toast.success("Appointment Deleted");
    } catch (error) {
      toast.error("Failed to cancel appointment. Please try again.");
    }
    setDeletingAppointment(false);
  };

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
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">My Appointments</h2>
      {appointments.length === 0 ? (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-center">
          <p className="text-blue-600 text-lg">No appointments found.</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {appointments.map((appointment) => (
            <li
              key={appointment._id}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    Doctor
                  </span>
                  <p className="text-lg font-medium text-gray-900 mt-1">
                    {appointment.doctorId.username}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    Date
                  </span>
                  <p className="text-lg font-medium text-gray-900 mt-1">
                    {new Date(appointment.date).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    Time
                  </span>
                  <p className="text-lg font-medium text-gray-900 mt-1">
                    {appointment.time}
                  </p>
                </div>
                <div>
                  <Link
                    to={`/patient/update-appointment/${appointment._id}`}
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Edit Appointment
                  </Link>
                </div>
                <div className="md:col-span-2">
                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    Reason
                  </span>
                  <p className="text-gray-700 mt-1">{appointment.reason}</p>
                </div>
                <div className="md:col-span-2">
                  <button
                    onClick={() => handleDelete(appointment._id)}
                    disabled={deletingAppointment}
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                  >
                    {deletingAppointment
                      ? "Cancelling..."
                      : "Cancel Appointment"}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ViewAppointment;
