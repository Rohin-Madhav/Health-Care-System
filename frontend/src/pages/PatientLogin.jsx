import React from "react";
import { useState } from "react";
import api from "../services/Api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function PatientLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();

    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    (async () => {
      try {
        const response = await api.post("/auth/login", {
          email,
          password,
          role: "patient",
        });

        if (response.status === 200) {
          const { token, user } = response.data;

         
          localStorage.setItem("token", token);
          localStorage.setItem("userId", user.id);
          localStorage.setItem("username", user.username);
          localStorage.setItem("role", user.role);

          toast.success("Login successful!");
          navigate("/patient/patient-dashboard");
        } else {
          setErrorMessage(
            response.data?.message || "Invalid email or password."
          );
          toast.error("Invalid email or password.")
        }
      } catch (err) {
       
        setErrorMessage(
          err.response?.data?.message || "Login failed. Please try again."
        );
      }
    })();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        <div className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white">
              {/* simple logo */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2zM6 20h12"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                Welcome back
              </h2>
              <p className="text-sm text-gray-500">
                Sign in to your patient account to view appointments and
                records.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12H8m0 0l4-4m-4 4 4 4"
                    />
                  </svg>
                </span>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                  placeholder="you@example.com"
                  aria-label="Email address"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 11c1.657 0 3 .895 3 2v1H9v-1c0-1.105 1.343-2 3-2z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 11V9a5 5 0 1110 0v2"
                    />
                  </svg>
                </span>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
                  placeholder="Enter your password"
                  aria-label="Password"
                />
              </div>
            </div>

            {errorMessage && (
              <div className="flex items-start gap-3 p-3 text-sm text-red-700 bg-red-50 border border-red-100 rounded-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 mt-0.5 flex-shrink-0"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.72-1.36 3.485 0l5.518 9.82c.75 1.334-.188 2.98-1.742 2.98H4.481c-1.554 0-2.492-1.646-1.742-2.98l5.518-9.82zM10 7a1 1 0 00-.993.883L9 8v3a1 1 0 001.993.117L11 11V8a1 1 0 00-1-1zm0 8a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>{errorMessage}</div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <label className="inline-flex items-center text-sm text-gray-600">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <span className="ml-2">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-300 transition"
            >
              Sign in
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            <span>New here?</span>
            <div className="mt-2 flex items-center justify-center gap-4">
              <Link to="/register" className="text-blue-600 hover:underline">
                Create account
              </Link>
              <span className="text-gray-300">|</span>
              <Link to="/staffLogin" className="text-blue-600 hover:underline">
                Staff login
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-8 py-3 text-xs text-gray-500 text-center">
          By signing in you agree to our{" "}
          <Link to="/terms" className="text-blue-600 hover:underline">
            Terms
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="text-blue-600 hover:underline">
            Privacy Policy
          </Link>
          .
        </div>
      </div>
    </div>
  );
}
export default PatientLogin;
