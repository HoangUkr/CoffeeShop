import React, { useState } from "react";

const LoginForm = () => {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can replace this with actual login logic
    alert(`Logging in as ${form.username}`);
    setForm({ username: "", password: "" });
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-[#4B2E2E] mb-6 text-center">
        Login
      </h2>
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
            className="mt-1 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 text-[#4B2E2E]"
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
            className="mt-1 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 text-[#4B2E2E]"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-[#4B2E2E] font-semibold px-4 py-2 rounded-full"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
