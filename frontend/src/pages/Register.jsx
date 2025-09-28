import React, { useState } from "react";
import api from "../services/Api";
import {  useNavigate } from "react-router-dom";

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
  const navigate = useNavigate()

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
      navigate("/login")
    } catch (err) {
      const msg =
        err.response?.data?.message || err.message || "Registration failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

 return (
  <form onSubmit={onSubmit} className="max-w-md mx-auto space-y-6 p-6 bg-white rounded-lg shadow-md">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Username
        <input
          name="username"
          value={form.username}
          onChange={onChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </label>
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Email
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={onChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </label>
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Password
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={onChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </label>
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Confirm password
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={onChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </label>
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
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? "Registering…" : "Register"}
    </button>
  </form>
);
}
