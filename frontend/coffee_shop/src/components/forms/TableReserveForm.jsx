import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TableReserveForm = () => {
  //   debugger;
  const navigate = useNavigate();
  useEffect(() => {
    debugger;
  }, []);
  const currentDate = new Date(); // Get today's date in YYYY-MM-DD format
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  // Initialize date state with today's date
  const [date, setDate] = useState(formattedDate);

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Reservation submitted!");
  };
  return (
    <section className="pt-20 px-4 py-12 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-[#4B2E2E] mb-8 text-center">
        Reserve a Table
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-xl shadow-md"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            required
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 text-gray-900 bg-white text-gray-900 bg-white"
          />
        </div>

        <div>
          <label
            htmlFor="people"
            className="block text-sm font-medium text-gray-700"
          >
            Number of People
          </label>
          <input
            type="number"
            id="people"
            required
            min="1"
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 text-gray-900 bg-white"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            required
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 text-gray-900 bg-white"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            required
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 text-gray-900 bg-white"
          />
        </div>

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

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Message (optional)
          </label>
          <textarea
            id="message"
            rows="4"
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 text-gray-900 bg-white"
          ></textarea>
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-[#4B2E2E] font-semibold py-2 px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="bg-gray-300 hover:bg-gray-400 text-[#4B2E2E] font-semibold py-2 px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
};

export default TableReserveForm;
