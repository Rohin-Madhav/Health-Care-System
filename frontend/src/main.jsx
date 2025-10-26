import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = import.meta.env.VITE_PB_KEY
  ? loadStripe(import.meta.env.VITE_PB_KEY)
  : null;
import { ToastContainer, toast } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Elements stripe={stripePromise}>
      <App />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        draggable
        theme="light"
        toastClassName={() =>
          "relative flex p-4 rounded-lg bg-white shadow-lg border border-gray-200 text-gray-800 text-sm md:text-base w-[90%] md:w-auto mx-auto"
        }
        bodyClassName={() => "flex items-center gap-2"}
      />
    </Elements>
  </StrictMode>
);
