import React, { useState, useEffect } from "react";
import api from "../../services/Api";
import { Calendar, Clock } from "lucide-react";
import { toast } from "react-toastify";

function Appointment() {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    doctorId: "",
    date: "",
    time: "",
    clientName: "",
    reason: "",
  });
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);
  const [lastAppointment, setLastAppointment] = useState(null);
  const [creatingSession, setCreatingSession] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
       
        const res = await api.get("/users/doctors");
        setDoctors(res.data || []);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      } finally {
        setLoadingDoctors(false);
      }
    };
    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMsg(null);

    if (
      !form.doctorId ||
      !form.date ||
      !form.time ||
      !form.reason.trim() ||
      !form.clientName.trim()
    ) {
      setStatusMsg({ type: "error", text: "Please fill all fields." });
      toast.error("Please fill all fields.")
      return;
    }

    setSubmitting(true);
    try {
     

      const payload = {
        doctorId: form.doctorId,
        clientName: form.clientName,
        date: form.date,
        time: form.time,
        reason: form.reason,
      };

      const res = await api.post("/users/appointment", payload);

      setLastAppointment(res.data);
      setStatusMsg({
        type: "success",
        text: "Appointment created successfully. You can pay now.",
      });
      toast.success("Appointment created successfully. You can pay now.")
      setForm({ doctorId: "", date: "", time: "", clientName: "", reason: "" });
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err.message ||
        "Failed to create appointment.";
      setStatusMsg({ type: "error", text: msg });
      toast.error("Failed to create appointment.")
    } finally {
      setSubmitting(false);
    }
  };

  const handlePayNow = async () => {
    if (!lastAppointment) return;
    setCreatingSession(true);
    try {
      const token = localStorage.getItem("token");
      const amount = 150;
      const currency = "usd";
      const body = {
        appointmentId: lastAppointment._id || lastAppointment.id,
        doctorId: lastAppointment.doctorId || form.doctorId,
        amount,
        currency,
      };

      const res = await api.post("/payment/create-session", body, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { checkoutUrl } = res.data;
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        setStatusMsg({
          type: "error",
          text: "Unable to create checkout session.",
        });
      }
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err.message ||
        "Failed to create checkout session.";
      setStatusMsg({ type: "error", text: msg });
    } finally {
      setCreatingSession(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white shadow-md rounded-lg p-8">
          <div className="flex items-center gap-4 mb-6">
            <Calendar className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">
                Book an Appointment
              </h1>
              <p className="text-sm text-gray-500">
                Choose a doctor, date, and time.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Doctor dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Doctor
              </label>
              {loadingDoctors ? (
                <div className="text-gray-500">Loading doctors...</div>
              ) : (
                <select
                  name="doctorId"
                  value={form.doctorId}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-md bg-white focus:ring-2 focus:ring-blue-200 outline-none"
                >
                  <option value="">-- Choose a doctor --</option>
                  {doctors.map((d) => (
                    <option key={d._id || d.id} value={d._id || d.id}>
                      {d.username}
                    </option>
                  ))}
                </select>
              )}
            </div>
            {/* Client name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Client Name
              </label>
              <input
                type="text"
                name="clientName"
                value={form.clientName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-md bg-white focus:ring-2 focus:ring-blue-200 outline-none"
                placeholder="Enter your full name"
              />
            </div>
            {/* Date and time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-200 outline-none bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time
                </label>
                <input
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-200 outline-none bg-white"
                />
              </div>
            </div>
            {/* Reason */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason / Notes
              </label>
              <textarea
                name="reason"
                value={form.reason}
                onChange={handleChange}
                rows={4}
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-blue-200 outline-none bg-white"
                placeholder="Briefly describe the reason for the visit..."
              />
            </div>

            {/* Status messages */}
            {statusMsg && (
              <div
                role="alert"
                className={`p-3 rounded-md text-sm ${
                  statusMsg.type === "success"
                    ? "bg-green-50 text-green-700 border border-green-100"
                    : "bg-red-50 text-red-700 border border-red-100"
                }`}
              >
                {statusMsg.text}
              </div>
            )}

            {/* Submit button */}
            <div className="flex items-center justify-between gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md disabled:opacity-60"
              >
                <Calendar className="w-4 h-4" />
                {submitting ? "Booking..." : "Book Appointment"}
              </button>

              {/* Pay Now button appears after booking */}
              {lastAppointment && (
                <button
                  type="button"
                  onClick={handlePayNow}
                  disabled={creatingSession}
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-md disabled:opacity-60"
                >
                  {creatingSession ? "Redirecting..." : "Pay Now"}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Info panel */}
        <div className="mt-6 bg-white p-6 rounded-md shadow-sm">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-md bg-blue-50">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">
                Need help scheduling?
              </h3>
              <p className="text-sm text-gray-600">
                Call our support at (123) 456-7890 or email
                support@healthcare.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Appointment;
