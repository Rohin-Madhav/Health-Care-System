import React, { useEffect, useState } from "react";
import api from "../../../services/Api";

function ManageDoctors() {
  const [doctors, setdoctors] = useState([]);
 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const res = await api.get("/users/doctors", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setdoctors(res.data);
      } catch (error) {
        setError("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchdata();
  }, []);
  const handleApprove = async (id) => {
    try {
      
      const token = localStorage.getItem("token");
      await api.patch(`/users/approveDoctor/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
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
    <>
      <div>
        <div>
          <h1>Manage All Doctors</h1>
          <table>
            <thead>
              <tr>
                <th>Doctors</th>
                <th>Email</th>
                <th>Created</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((d) => (
                <tr key={d._id}>
                  <td>{d.username}</td>
                  <td>{d.email}</td>
                  <td>{new Date(d.createdAt).toLocaleDateString()}</td>
                  <td>
                    {d.isApproved ? (
                      <span style={{ color: "green", fontWeight: "bold" }}>
                        Approved
                      </span>
                    ) : (
                      <button
                        onClick={() => handleApprove(d._id)}
                        disabled={loading === d._id}
                      >
                        {loading === d._id ? "Approving..." : "Approve"}
                      </button>
                    )}
                  </td>
                  <td>
                    <button>Edit</button>
                  </td>
                  <td>
                    <button>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div></div>
      </div>
    </>
  );
}

export default ManageDoctors;
