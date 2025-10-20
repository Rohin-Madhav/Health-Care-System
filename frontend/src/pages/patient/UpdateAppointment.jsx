import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/Api";

function UpdateAppointment() {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    reason: "",
  });
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        
        const response = await api.get(`/users/appointment/${id}`);

        const appt = response.data;
        setAppointment(appt);

        const dateISO = appt.date
          ? new Date(appt.date).toISOString().slice(0, 10)
          : "";
        setFormData({
          date: dateISO,
          time: appt.time || "",
          reason: appt.reason || "",
        });
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch appointment.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchAppointment();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!appointment) return <div>Appointment not found</div>;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");

      const payload = {
        date: new Date(formData.date).toISOString(),
        time: formData.time,
        reason: formData.reason,
      };

      const response = await api.patch(`/users/appointment/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      navigate("/patient/view-appointment");
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Update failed");
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </label>
      </div>

      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Time:
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </label>
      </div>

      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Reason:
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
            rows="4"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          ></textarea>
        </label>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {saving ? "Updating..." : "Update Appointment"}
      </button>
    </form>
  );
}

export default UpdateAppointment;
