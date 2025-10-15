import React, { useEffect, useState } from "react";
import api from "../../services/Api";

function ManageShedule() {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scheduleData, setScheduleData] = useState({
    doctor: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const token = localStorage.getItem("token");
        const doctorId = localStorage.getItem("doctorId");

        if (!doctorId) {
          throw new Error("Doctor ID not found");
        }

        const res = await api.get(`/users/doctorSchedules/${doctorId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = Array.isArray(res.data) ? res.data : res.data.schedule;
        setSchedule(data || []);
      } catch (err) {
        console.error("Error fetching schedule:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  const handleChange = (e) => {
    setScheduleData({ ...scheduleData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const doctorId = localStorage.getItem("doctorId");

      const payload = {
        doctor: scheduleData.doctor,
        doctorId,
        date: scheduleData.date,
        availableSlots: {
          startTime: scheduleData.startTime,
          endTime: scheduleData.endTime,
        },
      };

      const res = await api.post("/users/doctorSchedule", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Payload being sent:", payload);

      setSchedule((prev) => [...prev, res.data]);
      setScheduleData({ doctor: "", date: "", startTime: "", endTime: "" });
      alert("Schedule created successfully!");
    } catch (err) {
      console.error("Error creating schedule:", err);
      alert("Failed to add schedule: " + err.message);
    }
  };
  useEffect(() => {
    const doctorName = localStorage.getItem("doctorName");
    if (doctorName) {
      setScheduleData((prev) => ({ ...prev, doctor: doctorName }));
    }
  }, []);

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <div>
        <h1>My Current Schedules</h1>
        {Array.isArray(schedule) && schedule.length > 0 ? (
          schedule.map((s, idx) => (
            <div key={s._id || idx} className="border rounded p-3 my-2">
              <p>
                <strong>Doctor:</strong> {s.doctor?.username || "Unknown"}
              </p>
              <p>
                <strong>Date:</strong> {new Date(s.date).toLocaleDateString()}
              </p>
              <p>
                <strong>Start:</strong> {s.availableSlots[0]?.startTime}
              </p>

              <p>
                <strong>End:</strong> {s.availableSlots[0]?.endTime}
              </p>
            </div>
          ))
        ) : (
          <p>No schedules available.</p>
        )}
      </div>

      <div className="mt-6">
        <h1>Create New Schedule</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-3">
          <input
            type="text"
            name="doctor"
            value={scheduleData.doctor}
            readOnly
          />
          <input
            type="date"
            name="date"
            value={scheduleData.date}
            onChange={handleChange}
            required
          />
          <input
            type="time"
            name="startTime"
            value={scheduleData.startTime}
            onChange={handleChange}
            required
          />
          <input
            type="time"
            name="endTime"
            value={scheduleData.endTime}
            onChange={handleChange}
            required
          />
          <button type="submit">Create Schedule</button>
        </form>
      </div>
    </>
  );
}

export default ManageShedule;
