import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/Api";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function PaymentSuccess() {
  const query = useQuery();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Confirming payment...");
  const [error, setError] = useState(null);

  useEffect(() => {
    const confirm = async () => {
      const sessionId = query.get("session_id");
      const paymentId = query.get("paymentId");
      if (!sessionId || !paymentId) {
        setError("Missing session_id or paymentId in URL.");
        setStatus(null);
        return;
      }

      try {
        const token = localStorage.getItem("token");
        const res = await api.post(
          "/users/payment/confirm",
          { sessionId, paymentId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setStatus("Payment confirmed. Thank you!");
        setTimeout(() => navigate("/patient"), 2500); // redirect back to patient area
      } catch (err) {
        const msg =
          err?.response?.data?.message || err?.message || "Confirmation failed";
        setError(msg);
        setStatus(null);
      }
    };

    confirm();
  }, [query, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-xl w-full bg-white p-8 rounded-lg shadow">
        {status && <p className="text-green-600 font-medium">{status}</p>}
        {error && <p className="text-red-600 font-medium">{error}</p>}
        <div className="mt-6">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
