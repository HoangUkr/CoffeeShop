import { useState, useEffect } from "react";
import { fetchReservationsService, createReservationService } from "../services/reservationService";

export default function useReservations(filters) {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getReservations = async () => {
      setLoading(true);
      try {
        const response = await fetchReservations(filters);
        setReservations(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getReservations();
  }, [filters]);

  // Function to create a new reservation
  const createReservation = async (data) => {
    debugger;
    setLoading(true);
    setError(null);
    try {
      const response = await createReservationService({
        customer_name: data.name,
        people_count: data.people,
        customer_email: data.email,
        customer_phone: data.phone,
        reservation_date: `${data.date}T${data.time}:00`, // Format as ISO string
        message: data.message,
      });
      setReservations((prev) => [...prev, response.data]);
    } catch (err) {
      setError(err);
      throw err; // Re-throw to handle it in the component if needed
    } finally {
      setLoading(false);
    }
  };
  return { reservations, loading, error, createReservation };
}
