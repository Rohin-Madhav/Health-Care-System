import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem("token");
        const doctorId = localStorage.getItem("doctorId");

        if (!doctorId) {
          setError("No Doctor ID found. Please log in again.");
          setLoading(false);
          return;
        }

        const [userRes, aptRes, patientsRes, scheRes] = await Promise.all([
          api.get(`/users/doctor/${doctorId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          api.get("/users/appointments", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          api.get(`/users/${doctorId}/patients`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          api.get(`/users/doctorSchedules/${doctorId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setDoctorData(userRes.data);
        setAppointments(aptRes.data);
        setPatients(patientsRes.data);
        setSchedules(scheRes.data);
      } catch (error) {
        console.error(error);
        setError("Error fetching Doctors");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);
  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <>
      <div>
        <h1>Wlecome {doctorData.username} 🧑‍⚕️</h1>
      </div>
      <div>
        <h1>Quick Actions</h1>
        <div>
          <button onClick={() => navigate("/doctor/view-patients")}>
            View All Patients
          </button>
        </div>
        <div>
          <button onClick={() => navigate("/doctor/view-appointments")}>
            Manage Appointment
          </button>
        </div>
        <div>
          <button onClick={() => navigate("/doctor/medicalrecord")}>
            Add Medical Record
          </button>
        </div>
        <div>
          <button onClick={() => navigate("/doctor/schedule")}>
            Manage Schedule
          </button>
        </div>
      </div>
      <div>
        <h2>View My Appointments</h2>
        <div>
          <ul>
            {appointments.map((a) => (
              <li key={a._id}>
                {a.clientName} {a.reason} {a.date} {a.time} {a.status}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <h2>My Schedule</h2>
        <div>
          <h3>Next</h3>
          <div>
            {schedules.map((s) => (
              <p key={s._id}>
                {s.availableSlots.patientId} {s.date}{" "}
                {s.availableSlots.startTime} {s.availableSlots.endTime}{" "}
                {s.availableSlots.isBooked}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div>
        <h2>My Patients</h2>
        <div>
          <ul>
            {patients.map((patient) => (
              <li key={patient._id}>
                {patient.username} ({patient.email})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
