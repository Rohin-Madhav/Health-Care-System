import React, { useEffect, useState } from "react";
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
  const [status, setStatus] = useState({
    completed: 0,
    pending: 0,
    canceled: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error,setError] = useState(null)

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

        const [userRes, aptRes,patientsRes] = await Promise.all([
          api.get(`/users/doctor/${doctorId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          api.get("/users/appointments", {
            headers: { Authorization: `Bearer ${token}` },
          }),
           api.get(`/users/${doctorId}/patients`, {
             headers: { Authorization: `Bearer ${token}` },
           }),
        ]);

        setDoctorData(userRes.data);
        setAppointments(aptRes.data);
         setPatients(patientsRes.data);

        const completed = aptRes.data.filter(
          (a) => a.status === "Completed"
        ).length;
        const pending = aptRes.data.filter(
          (a) => a.status === "Pending"
        ).length;
        const canceled = aptRes.data.filter(
          (a) => a.status === "Canceled"
        ).length;

        setStatus({ completed, pending, canceled });
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
      <h1>Wlecome  {doctorData.username} 🧑‍⚕️</h1>
    </div>
    <div>
      <h2>My Patients</h2>
   <div>
  <ul>
    {patients.map(patient => (
      
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
