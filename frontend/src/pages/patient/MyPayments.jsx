import React, { useState, useEffect } from "react";
import { CreditCard, CheckCircle, XCircle, Clock } from "lucide-react";
import api from "../../services/Api";

function MyPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const fetchPayments = async () => {
        try {
          const userId = localStorage.getItem("userId");
          const token = localStorage.getItem("token");
          const res = await api.get(`/payment/my/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
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

  const getStatusColor = (status) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "failed":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-5 h-5" />;
      case "pending":
        return <Clock className="w-5 h-5" />;
      case "failed":
        return <XCircle className="w-5 h-5" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
          <div className="space-y-4">
            <h2>Loading...</h2>
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-100 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-6">
        <CreditCard className="w-8 h-8 text-indigo-600" />
        <h2 className="text-3xl font-bold text-gray-800">My Payments</h2>
      </div>

      {payments.length === 0 ? (
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-12 text-center">
          <CreditCard className="w-16 h-16 text-indigo-300 mx-auto mb-4" />
          <p className="text-indigo-600 text-lg font-medium">
            No payment records found.
          </p>
          <p className="text-indigo-500 text-sm mt-2">
            Your payment history will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {payments.map((payment) => (
            <div
              key={payment._id}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Left Section - Appointment Info */}
                <div className="flex-1">
                  <div className="flex items-start gap-3">
                    <div className="bg-indigo-100 rounded-full p-2">
                      <CreditCard className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {payment.appointmentId?.doctorId?.username ||
                          "Doctor Name Unavailable"}
                      </h3>
                      {payment.appointmentId && (
                        <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <span className="font-medium">Date:</span>
                            {new Date(
                              payment.appointmentId.date
                            ).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="font-medium">Time:</span>
                            {payment.appointmentId.time}
                          </span>
                        </div>
                      )}
                      <div className="mt-2 text-xs text-gray-500">
                        Transaction ID: {payment.transactionId}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Middle Section - Amount & Method */}
                <div className="flex flex-col items-start lg:items-end gap-1">
                  <div className="text-2xl font-bold text-gray-900">
                    ${payment.amount.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-500">
                    via {payment.paymentMethod || "N/A"}
                  </div>
                </div>

                {/* Right Section - Status */}
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border font-medium text-sm ${getStatusColor(
                      payment.status
                    )}`}
                  >
                    {getStatusIcon(payment.status)}
                    <span className="capitalize">{payment.status}</span>
                  </span>
                </div>
              </div>

              {/* Footer - Date */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <span className="text-xs text-gray-500">
                  Payment Date: {new Date(payment.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Summary Card */}
      {payments.length > 0 && (
        <div className="mt-6 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">
                {payments.filter((p) => p.status === "success").length}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                Successful Payments
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {payments.filter((p) => p.status === "pending").length}
              </div>
              <div className="text-sm text-gray-600 mt-1">Pending Payments</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">
                ${payments.reduce((sum, p) => sum + p.amount, 0).toFixed(2)}
              </div>
              <div className="text-sm text-gray-600 mt-1">Total Amount</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyPayments;
