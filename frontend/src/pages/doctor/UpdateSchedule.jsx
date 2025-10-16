import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/Api";
import {
  Clock,
  Calendar,
  Save,
  AlertCircle,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";

function UpdateSchedule({ onSaved }) {
  const { id } = useParams();
  const [form, setForm] = useState({
    date: "",
    startTime: "",
    endTime: "",
  });
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [scheduleId, setScheduleId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadSchedule = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!id) throw new Error("No schedule ID in URL");

        const res = await api.get(`/users/doctorSchedule/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setScheduleId(res.data._id);
        setForm({
          date: res.data.date?.slice(0, 10) || "",
          startTime: res.data.availableSlots?.[0]?.startTime || "",
          endTime: res.data.availableSlots?.[0]?.endTime || "",
        });
      } catch (err) {
        setErr(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadSchedule();
  }, [id]);
  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setErr(null);

    try {
      const token = localStorage.getItem("token");
      if (!scheduleId) throw new Error("No schedule found to update");

      const payload = {
        date: form.date,
        availableSlots: [
          {
            startTime: form.startTime,
            endTime: form.endTime,
          },
        ],
      };

      const res = await api.patch(
        `/users/doctorSchedule/${scheduleId}`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Schedule updated successfully!");
      onSaved?.(res.data);
      navigate("/doctor/schedule");
    } catch (err) {
      setErr(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mb-4"></div>
          <p className="text-slate-600 font-medium">Loading schedule...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-700 shadow-xl">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-white" />
            <div>
              <h1 className="text-3xl font-bold text-white">Update Schedule</h1>
              <p className="text-teal-50 text-sm mt-1">
                Modify your availability time slots
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/doctor/schedule")}
          className="inline-flex items-center gap-2 text-teal-700 hover:text-teal-800 font-medium mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Schedules
        </button>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-teal-50 to-cyan-50 px-6 py-4 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-teal-600" />
              Schedule Information
            </h2>
          </div>

          <form onSubmit={handleSave} className="p-6 space-y-6">
            {/* Date */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-teal-600" />
                  Date
                </div>
              </label>
              <input
                type="date"
                name="date"
                value={form.date ?? ""}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
              />
            </div>

            {/* Time Slots Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Start Time */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-teal-600" />
                    Start Time
                  </div>
                </label>
                <input
                  type="time"
                  name="startTime"
                  value={form.startTime ?? ""}
                  onChange={(e) =>
                    setForm({ ...form, startTime: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                />
              </div>

              {/* End Time */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-teal-600" />
                    End Time
                  </div>
                </label>
                <input
                  type="time"
                  name="endTime"
                  value={form.endTime ?? ""}
                  onChange={(e) =>
                    setForm({ ...form, endTime: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                />
              </div>
            </div>

            {/* Error Message */}
            {err && (
              <div className="bg-rose-50 border border-rose-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-rose-700 font-medium">{err}</p>
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex items-center gap-4 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Save Changes
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => navigate("/doctor/schedule")}
                disabled={saving}
                className="px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-blue-900 mb-1">
                Update Guidelines
              </h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Ensure the end time is after the start time</li>
                <li>
                  • Existing appointments will be affected by time changes
                </li>
                <li>
                  • Notify patients if there are significant schedule changes
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateSchedule;
