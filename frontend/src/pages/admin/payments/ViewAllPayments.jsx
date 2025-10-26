import React, { useEffect, useState } from "react";
import api from "../../../services/Api";

function ViewAllPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        const res = await api.get("/payment/all");

        setPayments(res.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);
  const totalPending = payments
    .filter((p) => p.status === "pending")
    .reduce((sum, p) => sum + (p.amount || 0), 0);
  const totalFailed = payments
    .filter((p) => p.status === "failed")
    .reduce((sum, p) => sum + (p.amount || 0), 0);
  const totaSuccess = payments
    .filter((p) => p.status === "success")
    .reduce((sum, p) => sum + (p.amount || 0), 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mb-4"></div>
          <p className="text-slate-600 font-medium">Loading Datas...</p>
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            All Payments Details
          </h1>
          <p className="text-gray-600">Overview of all payment transactions</p>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-teal-600 to-sky-400">
                <tr>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Payment ID
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Appointment ID
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Patient Name
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Doctor Name
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {payments.map((p, index) => (
                  <tr
                    key={p._id}
                    className={`hover:bg-blue-50 transition-colors duration-150 ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {p._id}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                      {p.appointmentId}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                      {p.patientId?.username || "Unknown Patient"}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                      {p.doctorId?.username || "Unknown Doctor"}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      ${p.amount}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                          p.status === "success"
                            ? "bg-green-100 text-green-800"
                            : p.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>

              {/* Summary Footer */}
              <tfoot className="bg-gray-50 border-t-2 border-gray-300">
                <tr className="hover:bg-gray-100 transition-colors">
                  <td
                    colSpan="4"
                    className="px-4 py-4 text-right text-sm font-bold text-gray-700"
                  >
                    Total Pending Payments:
                  </td>
                  <td
                    colSpan="2"
                    className="px-4 py-4 text-sm font-bold text-yellow-600"
                  >
                    ${totalPending.toFixed(2)}
                  </td>
                </tr>
                <tr className="hover:bg-gray-100 transition-colors">
                  <td
                    colSpan="4"
                    className="px-4 py-4 text-right text-sm font-bold text-gray-700"
                  >
                    Total Failed Payments:
                  </td>
                  <td
                    colSpan="2"
                    className="px-4 py-4 text-sm font-bold text-red-600"
                  >
                    ${totalFailed.toFixed(2)}
                  </td>
                </tr>
                <tr className="hover:bg-gray-100 transition-colors bg-green-50">
                  <td
                    colSpan="4"
                    className="px-4 py-4 text-right text-sm font-bold text-gray-700"
                  >
                    Total Success Payments:
                  </td>
                  <td
                    colSpan="2"
                    className="px-4 py-4 text-sm font-bold text-green-600"
                  >
                    ${totaSuccess.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewAllPayments;
