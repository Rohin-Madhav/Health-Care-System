import React, {  useEffect, useState } from "react";
import api from "../../../services/Api";

function ManagePatients() {
  const [patientsData, setPatientsData] = useState([]);
  const [editPatient, setEditPatient] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
         setLoading(true);
        const res = await api.get("/users/patients");
        setPatientsData(res.data);
       
        
      } catch (error) {
        setError(error.message);
      }finally{
        setLoading(false)
      }
    };
    fetchData();
  }, []);

  const handleRemove = async (id) => {
    try {
      await api.delete(`/users/patient/${id}`);
      setPatientsData(patientsData.filter((p) => p._id !== id));
    } catch (error) {
      setError(error.message);
    }
  };
  const handleEdit = (patient) => {
    setEditPatient(patient);
    setFormData({ username: patient.username, email: patient.email });
    setIsModelOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const res = await api.patch(
        `/users/patient/${editPatient._id}`,
        formData
      );
     setPatientsData((prev) =>
  prev.map((p) =>
    p._id === editPatient._id ? { ...p, ...res.data } : p
  )
);
      setIsModelOpen(false);
      setEditPatient(null);
    } catch (error) {
      setError(error.message);
    }
    
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mb-4"></div>
          <p className="text-slate-600 font-medium">Loading patients...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md">
          <p className="text-rose-600 text-center font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Patients Table Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-teal-600 to-cyan-600 px-8 py-6">
            <h1 className="text-3xl font-bold text-white">All Patients Data</h1>
            <p className="text-teal-50 mt-1">
              View and manage patient accounts
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Created At
                  </th>
                  <th
                    className="px-6 py-4 text-center text-sm font-semibold text-slate-700"
                    colSpan="2"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {patientsData.map((p,index) => (
                  <tr
                   key={p?._id || index} 
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-white font-semibold">
                          {p?.username?.charAt(0)?.toUpperCase() || "?"}
                        </div>
                        <span className="ml-3 font-medium text-slate-900">
                          {p?.username?.toUpperCase() || "Unknown"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{p.email}</td>
                    <td className="px-6 py-4 text-slate-600">
                      {new Date(p.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-3 py-4 text-center">
                      <button
                        onClick={() => handleEdit(p)}
                        className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-teal-100 text-teal-700 hover:bg-teal-200 transition-colors"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="px-3 py-4 text-center">
                      <button
                        onClick={() => handleRemove(p._id)}
                        className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-rose-100 text-rose-700 hover:bg-rose-200 transition-colors"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {patientsData.length === 0 && (
            <div className="text-center py-12">
              <div className="text-slate-400 mb-2">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <p className="text-slate-600 font-medium">No patients found</p>
              <p className="text-slate-500 text-sm mt-1">
                Patient data will appear here once registered
              </p>
            </div>
          )}
        </div>
      </div>
      {isModelOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-slate-800">
              Edit Patient
            </h2>

            <label className="block text-sm font-medium text-slate-600 mb-1">
              Name
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-teal-500 outline-none"
            />

            <label className="block text-sm font-medium text-slate-600 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 mb-6 focus:ring-2 focus:ring-teal-500 outline-none"
            />

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsModelOpen(false)}
                className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManagePatients;
