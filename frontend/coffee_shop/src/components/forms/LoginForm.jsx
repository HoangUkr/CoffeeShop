import React, { useState } from "react";
import { useAdmin } from "../../hooks/useAdmin";

const LoginForm = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login, loadingStates, error: adminError } = useAdmin();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (error || adminError) {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const result = await login(form.username, form.email, form.password);
    
    if (result.success) {
      // Success! Admin hook will handle the state update
      // Redirect to home page
      setForm({ username: "", email: "", password: "" });
      window.location.href = '/';
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-[#4B2E2E] mb-6 text-center">
        Admin Login
      </h2>
      <p className="text-center text-gray-600 mb-6 text-sm">
        Staff and Administrator Access Only
      </p>
      
      {/* Error Message */}
      {(error || adminError) && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error || adminError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={form.username}
            onChange={handleChange}
            required
            disabled={loadingStates.login}
            className="mt-1 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 text-[#4B2E2E] disabled:opacity-50"
            placeholder="Enter your username"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={form.email}
            onChange={handleChange}
            required
            disabled={loadingStates.login}
            className="mt-1 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 text-[#4B2E2E] disabled:opacity-50"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={form.password}
            onChange={handleChange}
            required
            disabled={loadingStates.login}
            className="mt-1 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 text-[#4B2E2E] disabled:opacity-50"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          disabled={loadingStates.login}
          className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 text-[#4B2E2E] font-semibold px-4 py-2 rounded-full transition-colors"
        >
          {loadingStates.login ? "Logging in..." : "Admin Login"}
        </button>
      </form>
      
      <div className="mt-4 text-center">
        <a href="/" className="text-sm text-yellow-600 hover:text-yellow-800">
          ← Back to Coffee Shop
        </a>
      </div>
    </div>
  );
};

export default LoginForm;
