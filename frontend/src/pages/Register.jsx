import React, { useState } from "react";
import api from "../services/Api";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  function onChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Basic client-side validations
    if (!form.username || !form.email || !form.password) {
      setError("Please fill all required fields.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    try {
      // Only send necessary fields. Do NOT include a role property.
      const payload = {
        username: form.username,
        email: form.email,
        password: form.password,
      };

      await api.post("/auth/register", payload, {
        headers: { "Content-Type": "application/json" },
      });

      setSuccess("Registration successful. ");
      setForm({ username: "", email: "", password: "", confirmPassword: "" });
      navigate("/patientLogin");
    } catch (err) {
      const msg =
        err.response?.data?.message || err.message || "Registration failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  const [showPassword, setShowPassword] = useState(false);

  const passwordScore = (() => {
    const p = form.password || "";
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p) && /[0-9]/.test(p)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(p)) score++;
    return score; // 0..3
  })();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Illustration / branding */}
        <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-b from-blue-600 to-indigo-600 text-white p-10">
          <svg width="64" height="64" viewBox="0 0 24 24" className="mb-4">
            <path
              fill="currentColor"
              d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
            />
          </svg>
          <h2 className="text-2xl font-semibold">
            Welcome to HealthCare System
          </h2>
          <p className="mt-2 text-sm opacity-90 text-blue-100 text-center">
            Create a secure account to manage appointments, prescriptions and
            more.
          </p>
        </div>

        {/* Form */}
        <div className="p-8">
          <h3 className="text-2xl font-semibold text-gray-800">
            Create an account
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Sign up to access patient features
          </p>

          <div className="mt-6">
            <button
              type="button"
              onClick={() => {}}
              className="w-full inline-flex items-center justify-center border border-gray-200 rounded-md py-2 px-3 text-sm bg-white hover:bg-gray-50 shadow-sm"
              aria-hidden
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21.35 11.1h-9.18v2.92h5.27c-.23 1.27-1.1 2.34-2.35 3.03v2.51h3.8c2.22-2.05 3.5-5.05 3.5-8.95 0-.66-.06-1.3-.19-1.91z"
                  fill="#4285F4"
                />
                <path
                  d="M12.17 22c2.95 0 5.42-.97 7.23-2.63l-3.8-2.51c-1.07.72-2.44 1.15-3.43 1.15-2.64 0-4.88-1.78-5.68-4.17H3.1v2.61C4.9 19.9 8.3 22 12.17 22z"
                  fill="#34A853"
                />
                <path
                  d="M6.49 13.84a6.99 6.99 0 010-3.68V7.55H3.1a9.99 9.99 0 000 8.9l3.39-2.61z"
                  fill="#FBBC05"
                />
                <path
                  d="M12.17 5.5c1.6 0 3.04.55 4.18 1.63l3.11-3.11C17.59 2.32 15.12 1.35 12.17 1.35 8.3 1.35 4.9 3.45 3.1 6.45l3.39 2.61c.8-2.39 3.04-4.16 5.68-4.16z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>

            <div className="flex items-center my-4">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="px-3 text-xs text-gray-400">
                Or register with email
              </span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  name="username"
                  value={form.username}
                  onChange={onChange}
                  required
                  placeholder="jane_doe"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  aria-label="username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  required
                  placeholder="you@example.com"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  aria-label="email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={onChange}
                    required
                    placeholder="At least 8 characters"
                    className="mt-1 block w-full pr-28 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    aria-label="password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute inset-y-0 right-0 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-r-md"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 h-2 flex rounded overflow-hidden bg-gray-100">
                    <div
                      className={`transition-all duration-200 ${
                        passwordScore >= 1 ? "bg-yellow-400" : "bg-transparent"
                      }`}
                      style={{ width: `${(passwordScore / 3) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500">
                    {form.password
                      ? passwordScore === 3
                        ? "Strong"
                        : passwordScore === 2
                        ? "Medium"
                        : "Weak"
                      : ""}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={onChange}
                  required
                  placeholder="Repeat your password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  aria-label="confirm password"
                />
              </div>

              {error && (
                <div className="p-3 text-sm text-red-700 bg-red-100 border border-red-300 rounded-md">
                  {error}
                </div>
              )}

              {success && (
                <div className="p-3 text-sm text-green-700 bg-green-100 border border-green-300 rounded-md">
                  {success}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Registering…" : "Create account"}
              </button>

              <p className="text-sm text-center text-gray-500">
                Already have an account?{" "}
                <Link
                  to="/patientLogin"
                  className="text-blue-600 hover:underline"
                >
                  Log in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
