import React, { useEffect, useState } from "react";
import api from "../../services/Api";

function MyPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const fetchPayments = async () => {
        try {
          const userId = localStorage.getItem("userId");
          const res = await api.get(`/payment/my/${userId}`);
          setPayments(res.data || []);
        } catch (error) {
          console.error("Error fetching payments:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchPayments();
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex justify-center items-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading payments...</p>
        </div>
      </div>
    );
  }

  if (payments.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex justify-center items-center">
        <div className="text-center bg-white p-12 rounded-3xl shadow-xl">
          <div className="text-6xl mb-4">💳</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            No Payments Yet
          </h3>
          <p className="text-gray-500">
            Your payment history will appear here.
          </p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase();
    if (statusLower === "completed" || statusLower === "success")
      return "bg-green-100 text-green-700 border-green-200";
    if (statusLower === "pending")
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    if (statusLower === "failed")
      return "bg-red-100 text-red-700 border-red-200";
    return "bg-gray-100 text-gray-700 border-gray-200";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Payment History
          </h1>
          <p className="text-gray-600">View all your completed transactions</p>
        </div>

        {/* Payment Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {payments.map((payment) => (
            <div
              key={payment._id}
              className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              {/* Card Header with Gradient */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">
                     Dr. {payment.doctorId?.username || (
                        <span className="opacity-75 italic">
                          Doctor Unavailable
                        </span>
                      )}
                    </h3>
                    <p className="text-blue-100 text-sm">
                      {payment.doctorId?.email || "No Email"}
                    </p>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-full p-3">
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                      <path
                        fillRule="evenodd"
                        d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4">
                {/* Appointment Details */}
                {payment.appointmentId ? (
                  <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                      Appointment Details
                    </h4>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <svg
                        className="w-4 h-4 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="font-medium">
                        {payment.appointmentId?.date
                          ? new Date(
                              payment.appointmentId.date
                            ).toLocaleDateString("en-US", {
                              weekday: "short",
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })
                          : "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <svg
                        className="w-4 h-4 text-purple-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="font-medium">
                        {payment.appointmentId?.time || "N/A"}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <p className="text-sm text-gray-400 italic">
                      Appointment details unavailable
                    </p>
                  </div>
                )}

                {/* Payment Amount and Status */}
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Amount Paid</p>
                    <p className="text-3xl font-bold text-gray-900">
                      ${payment.amount?.toFixed(2) || "0.00"}
                    </p>
                  </div>
                  <div
                    className={`px-4 py-2 rounded-full text-sm font-semibold border ${getStatusColor(
                      payment.status
                    )}`}
                  >
                    {payment.status || "Unknown"}
                  </div>
                </div>

                {/* Payment Date */}
                <div className="pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-400">Transaction Date</p>
                  <p className="text-sm text-gray-600 font-medium mt-1">
                    {payment.createdAt
                      ? new Date(payment.createdAt).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "Unknown date"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyPayments;
