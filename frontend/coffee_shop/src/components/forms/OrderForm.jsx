import React, { useState } from "react";

const OrderForm = ({ totalPrice = 0 }) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    pickupTime: "",
    address: "",
  });
  const currentDate = new Date(); // Get today's date in YYYY-MM-DD format
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  // Initialize date state with today's date
  const [date, setDate] = useState(formattedDate);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Order submitted for ${form.name}`);
    setForm({
      name: "",
      phone: "",
      email: "",
      pickupTime: "",
      address: "",
    });
  };

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8 mt-4">
      <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#4B2E2E] mb-6">
          Fill your data
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-yellow-500 text-[#4B2E2E]"
            />
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-yellow-500 text-[#4B2E2E]"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-yellow-500 text-[#4B2E2E]"
            />
          </div>

          {/* Pickup Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
                Date
              </label>
              <input
                type="date"
                id="date"
                required
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 text-gray-900 bg-white"
                value={date}
                min={formattedDate} // Prevent past dates
                onChange={(e) => {
                  // Update the date state when the input changes
                  setDate(e.target.value);
                  console.log("Selected date:", e.target.value);
                }}
              />
            </div>
            <div>
              <label
                htmlFor="time"
                className="block text-sm font-medium text-gray-700"
              >
                Time
              </label>
              <input
                type="time"
                id="time"
                required
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 text-gray-900 bg-white"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Address
            </label>
            <textarea
              name="address"
              id="address"
              rows="3"
              value={form.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-yellow-500 text-[#4B2E2E]"
            ></textarea>
          </div>

          {/* Total Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
              Total Price
            </label>
            <div className="text-right">
              <span className="text-2xl font-bold text-[#4B2E2E]">
                €{totalPrice.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-[#4B2E2E] font-semibold px-4 py-2 rounded-full transition duration-200"
          >
            Submit Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
