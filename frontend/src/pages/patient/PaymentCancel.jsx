import { useNavigate } from "react-router-dom";

export default function PaymentCancel() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-red-50">
      <h1 className="text-3xl font-bold text-red-700 mb-4">
        ❌ Payment Canceled
      </h1>
      <p className="text-gray-700 mb-6">
        Your payment was not completed. You can try again later.
      </p>
      <button
        onClick={() => navigate("/patient/book-appointment")}
        className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
      >
        Back to Booking
      </button>
    </div>
  );
}
