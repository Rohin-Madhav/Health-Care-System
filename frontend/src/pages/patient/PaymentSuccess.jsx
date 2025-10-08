import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../../services/Api"

export default function StripePaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const confirmPayment = async () => {
      const sessionId = searchParams.get("session_id");
      if (!sessionId) return;

      try {
        const token = localStorage.getItem("token");
        await api.post(
          "/payment/success",
          { sessionId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (err) {
        console.error("Error confirming payment:", err);
      }
    };
    confirmPayment();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-green-50">
      <h1 className="text-3xl font-bold text-green-700 mb-4">
        ✅ Payment Successful!
      </h1>
      <p className="text-gray-700 mb-6">
        Your appointment has been confirmed.
      </p>
      <button
        onClick={() => navigate("/patient/patient-dashboard")}
        className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        Go to Dashboard
      </button>
    </div>
  );
}
