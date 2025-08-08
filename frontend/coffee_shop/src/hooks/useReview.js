import { useState, useEffect } from "react";
import { fetchReviewService, createReviewService } from "../services/reviewService";

export default function useReviews(productId) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getReviews = async () => {
        if(!productId) {
          return;
        }
      setLoading(true);
      setError(null);
      try {
        const response = await fetchReviewService(productId);
        setReviews(response.data);
      } catch (err) {
        setError(err);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    getReviews();
  }, [productId]);

  // Function to create a new review
  const createReview = async (data) => {

    setLoading(true);
    setError(null);
    try {
      const response = await createReviewService({
        reviewer_name: data.reviewer_name,
        reviewer_email: data.reviewer_email,
        reviewer_comment: data.reviewer_comment,
        product_id: data.productId, // Assuming productId is passed in data
      });
      setReviews((prev) => [...prev, response.data]);
    } catch (err) {
      setError(err);
      throw err; // Re-throw to handle it in the component if needed
    } finally {
      setLoading(false);
    }
  };
  return { reservations, loading, error, createReservation };
}
