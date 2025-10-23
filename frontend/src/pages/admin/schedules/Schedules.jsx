import React, { useEffect, useState } from "react";
import api from "../../../services/Api";
import { Link } from "react-router-dom";
import {
  Clock,
  Calendar,
  Plus,
  Edit,
  Trash2,
  User,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

function Schedules() {
  const [schedule, setSchedule] = useState([]);
  const [scheduleData, setScheduleData] = useState({
    doctor: "",
    date: "",
    startTime: "",
    endTime: "",
  });
  const [editSchedule, setEditSchedule] = useState(null);
  const [formData, setFormData] = useState({
    date: "",
    startTime: "",
    endTime: "",
  });
  const [isModelOpen, setIsModelOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const res = await api.get("/users/doctorSchedules");

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
      const payload = {
        doctor: scheduleData.doctor,

        date: scheduleData.date,
        availableSlots: {
          startTime: scheduleData.startTime,
          endTime: scheduleData.endTime,
        },
      };

      const res = await api.post("/users/doctorSchedule", payload);

      setSchedule((prev) => [...prev, res.data]);
      setScheduleData({
        doctor: scheduleData.doctor,
        date: "",
        startTime: "",
        endTime: "",
      });
      alert("Schedule created successfully!");
    } catch (err) {
      console.error("Error creating schedule:", err);
      alert("Failed to add schedule: " + err.message);
    }
  };

  const handleRemove = async (scheduleId) => {
    if (!window.confirm("Are you sure you want to remove this schedule?")) {
      return;
    }

    try {
      await api.delete(`/users/doctorSchedul/${scheduleId}`);

      setSchedule((prev) => prev.filter((s) => s._id !== scheduleId));
      alert("Schedule Removed Successfully!");
    } catch (error) {
      alert("Failed to Remove");
      console.log(error);
    }
  };

  const handleEdit = (schedule) => {
    setEditSchedule(schedule);
    setFormData({
      date: schedule.date?.split("T")[0] || "",
      startTime: schedule.availableSlots[0]?.startTime || "",
      endTime: schedule.availableSlots[0]?.endTime || "",
    });
    setIsModelOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        date: formData.date,
        availableSlots: [
          {
            startTime: formData.startTime,
            endTime: formData.endTime,
          },
        ],
      };

      const res = await api.patch(
        `/users/doctorSchedule/${editSchedule._id}`,
        payload
      );

      setSchedule((prev) =>
        prev.map((s) => (s._id === editSchedule._id ? res.data : s))
      );

      setIsModelOpen(false);
      setEditSchedule(null);
      alert("Schedule updated successfully!");
    } catch (error) {
      console.error("Error updating schedule:", error);
      alert("Failed to update schedule: " + error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mb-4"></div>
          <p className="text-slate-600 font-medium">Loading schedules...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md">
          <AlertCircle className="w-16 h-16 text-rose-500 mx-auto mb-4" />
          <p className="text-rose-600 text-center font-medium">
            Error: {error.message}
          </p>
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
            <Clock className="w-8 h-8 text-white" />
            <div>
              <h1 className="text-3xl font-bold text-white">Manage Schedule</h1>
              <p className="text-teal-50 text-sm mt-1">
                View and manage your availability
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Schedules - Takes 2 columns */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 px-6 py-4 border-b border-slate-200">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-teal-600" />
                  My Current Schedules
                  <span className="ml-auto text-sm font-normal text-slate-600">
                    {schedule.length} schedules
                  </span>
                </h2>
              </div>

              <div className="p-6">
                {Array.isArray(schedule) && schedule.length > 0 ? (
                  <div className="space-y-4">
                    {schedule.map((s, idx) => (
                      <div
                        key={s._id || idx}
                        className="border border-slate-200 rounded-xl p-5 hover:shadow-md hover:border-teal-300 transition-all duration-200 bg-gradient-to-r from-white to-slate-50"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex-1 space-y-3">
                            {/* Doctor */}
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-teal-600" />
                              <span className="text-sm text-slate-600">
                                Doctor:
                              </span>
                              <span className="font-semibold text-slate-800">
                                {s.doctorId?.username || "Unknown"}
                              </span>
                            </div>

                            {/* Date */}
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-teal-600" />
                              <span className="text-sm text-slate-600">
                                Date:
                              </span>
                              <span className="font-semibold text-slate-800">
                                {new Date(s.date).toLocaleDateString()}
                              </span>
                            </div>

                            {/* Time Slots */}
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-teal-600" />
                              <span className="text-sm text-slate-600">
                                Time:
                              </span>
                              <span className="inline-flex items-center gap-2 px-3 py-1 bg-teal-100 text-teal-700 rounded-lg text-sm font-medium">
                                {s.availableSlots[0]?.startTime}
                                <span className="text-teal-400">→</span>
                                {s.availableSlots[0]?.endTime}
                              </span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex sm:flex-col gap-2">
                            <Button
                              onClick={() => handleEdit(s)}
                              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                            >
                              <Edit className="w-4 h-4" />
                              Edit
                            </Button>
                            <button
                              onClick={() => handleRemove(s._id)}
                              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                            >
                              <Trash2 className="w-4 h-4" />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      No Schedules Available
                    </h3>
                    <p className="text-sm text-slate-500">
                      Create your first schedule to get started
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Create Schedule Form - Takes 1 column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden sticky top-8">
              <div className="bg-gradient-to-r from-teal-50 to-cyan-50 px-6 py-4 border-b border-slate-200">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-teal-600" />
                  Create Schedule
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-teal-600" />
                      Doctor Name
                    </div>
                  </label>
                  <input
                    type="text"
                    name="doctor"
                    value={scheduleData.doctor}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 text-slate-600 "
                  />
                </div>

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
                    value={scheduleData.date}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                  />
                </div>

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
                    value={scheduleData.startTime}
                    onChange={handleChange}
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
                    value={scheduleData.endTime}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Plus className="w-5 h-5" />
                  Create Schedule
                </button>
              </form>

              {/* Info Box */}
              <div className="mx-6 mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex gap-2">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-700">
                    Make sure to set your availability accurately. Patients will
                    book appointments based on these time slots.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModelOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
            <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Edit className="w-5 h-5 text-blue-600" />
              Edit Schedule
            </h3>

            <form onSubmit={handleUpdate} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Start Time
                </label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={(e) =>
                    setFormData({ ...formData, startTime: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  End Time
                </label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={(e) =>
                    setFormData({ ...formData, endTime: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                />
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  onClick={() => setIsModelOpen(false)}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-800 px-4 py-2 rounded-lg"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  Update
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Schedules;
