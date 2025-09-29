import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/Api";

function StaffLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    try {
      const res = await api.post("/auth/login", { email, password, role });
      const data = res.data;

      if (data?.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
      }
      if (data?.role === "admin") {
        navigate("/admin/admin-dashboard");
      } else if (data?.role === "doctor") {
        navigate("/doctor/doctor-dashboard");
      } else {
        setError("Invalid role selected.");
      }
    } catch (err) {
      const msg =
        err?.response?.data?.message || err?.message || "Login failed";
      setError(msg);
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="w-full max-w-md bg-white border border-gray-100 rounded-2xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-50">
            {/* simple medical cross icon */}
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v8m4-4H8M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Staff Sign in
            </h2>
            <p className="text-sm text-gray-500">
              Access your dashboard securely
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@hospital.com"
              type="email"
              required
              aria-required="true"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-transparent outline-none transition bg-white"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot?
              </Link>
            </div>
            <input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              type="password"
              required
              aria-required="true"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-transparent outline-none transition bg-white"
            />
          </div>

          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              aria-label="Select role"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-transparent outline-none transition bg-white cursor-pointer"
            >
              <option value="" disabled>
                -- Select role --
              </option>
              <option value="doctor">Doctor</option>
              <option value="admin">Admin</option>
            </select>
            <p className="text-xs text-gray-400 mt-1">
              Choose the role you are signing in with.
            </p>
          </div>

          <div className="flex items-center justify-between">
            <label className="inline-flex items-center text-sm text-gray-600">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300"
              />
              <span className="ml-2">Remember me</span>
            </label>
            <Link
              to="/patientLogin"
              className="text-sm text-blue-600 hover:underline"
            >
              Are you a patient? Log in
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-150 ease-in-out transform hover:scale-[1.02] active:scale-95"
          >
            Sign in
          </button>

          {error && (
            <div
              role="alert"
              className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm"
            >
              <svg
                className="w-5 h-5 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01M21 12A9 9 0 113 12a9 9 0 0118 0z"
                />
              </svg>
              <div>{error}</div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default StaffLogin;
