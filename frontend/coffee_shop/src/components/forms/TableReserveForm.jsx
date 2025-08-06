import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import utils from "../../utils/utils";

// Import the custom hook for reservations
import useReservations from "../../hooks/useReservation";

// Import SweetAlert for alerts
import Swal from "sweetalert2";

const getCurrentDate = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
const isValidWorkingTime = (time) => {
  const isInFirstShift = time >= "11:00" && time < "15:00"; // true
  const isInSecondShift = time >= "17:00" && time < "21:00"; // false
  return isInFirstShift || isInSecondShift;
};

// Function to validate the form data
const isFormValid = (data) => {
  
  // Check if all required fields are filled and valid
  return (
    utils.validateEmail(data.email) &&
    utils.validatePhoneNumber(data.phone) &&
    utils.validateDate(data.date)
  );
};

const TableReserveForm = () => {
  const navigate = useNavigate();

  // Use the custom hook to manage reservations
  const { createReservation, loading, error } = useReservations();

  // State each field in the form
  const [name, setName] = useState("");
  const [people, setPeople] = useState(1);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState(getCurrentDate()); // Set default date to today
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");

  // Format the current date to YYYY-MM-DD
  const formattedDate = getCurrentDate(); // Format the date to YYYY-MM-DD

  // Handle form submission
  const handleSubmit = async (event) => {
    
    event.preventDefault();

    if (!isFormValid({ name, people, email, phone, date, time })) {
      Swal.fire({
        icon: "error",
        title: "Invalid Input",
        text: "Please check your input values.",
      });
      return;
    }

    if (!isValidWorkingTime(time)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Time",
        text: "Please select a time between 11:00-15:00 or 17:00-21:00.",
      });
      return;
    }

    try {
      await createReservation({
        name,
        people,
        email,
        phone,
        date,
        time,
        message,
      });
      // Reset form fields after successful submission
      setName("");
      setPeople(1);
      setEmail("");
      setPhone("");
      setDate(formattedDate);
      setTime("");
      setMessage("");
      Swal.fire({
        icon: "success",
        title: "Reservation Successful",
        text: "Your table has been reserved successfully.",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to submit reservation.",
      });
    }
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 text-gray-900 bg-white"
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
            value={people}
            onChange={(e) => setPeople(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
                // console.log("Selected date:", e.target.value);
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
              value={time}
              onChange={(e) => setTime(e.target.value)}
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
            value={message}
            onChange={(e) => setMessage(e.target.value)}
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
