import React, { useEffect, useState } from "react";
import api from "../../services/Api";

function ViewAppointment() {
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await api.get(`users/appointments/${userId}`);
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    fetchAppointments();
  }, []);



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
                <div className="md:col-span-2">
                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    Reason
                  </span>
                  <p className="text-gray-700 mt-1">{appointment.reason}</p>
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
