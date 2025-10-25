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
      <div className="flex justify-center items-center h-64 text-gray-500">
        Loading payments...
      </div>
    );
  }

  if (payments.length === 0) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        No payments found.
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Payments</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {payments.map((payment) => (
          <div
            key={payment._id}
            className="bg-white rounded-2xl shadow p-5 hover:shadow-lg transition-all duration-200"
          >
            {/* Doctor Info */}
            <h3 className="text-lg font-semibold text-gray-900">
              {payment.doctorId?.username || (
                <span className="text-gray-400 italic">
                  Doctor Not Available
                </span>
              )}
            </h3>
            <p className="text-sm text-gray-500 mb-2">
              {payment.doctorId?.email || "No Email"}
            </p>

            {/* Appointment Info */}
            {payment.appointmentId ? (
              <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <span className="font-medium">Date:</span>
                  {payment.appointmentId?.date
                    ? new Date(payment.appointmentId.date).toLocaleDateString()
                    : "N/A"}
                </span>
                <span className="flex items-center gap-1">
                  <span className="font-medium">Time:</span>
                  {payment.appointmentId?.time || "N/A"}
                </span>
              </div>
            ) : (
              <p className="text-sm text-gray-400 italic mt-2">
                Appointment details unavailable
              </p>
            )}

            {/* Payment Amount */}
            <div className="mt-4 text-lg font-bold text-green-600">
              ₹{payment.amount?.toFixed(2) || "0.00"}
            </div>

            {/* Payment Date */}
            <div className="text-sm text-gray-500 mt-1">
              {payment.createdAt
                ? new Date(payment.createdAt).toLocaleString()
                : "Unknown date"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyPayments;
