import { useState, useEffect, useRef } from "react";
import {
  fetchReviewService,
  createReviewService,
} from "../services/reviewService";

export default function useReviews(filters) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const prevProductId = useRef();

  useEffect(() => {
    // Only fetch if productId changes
    if (!filters.productId || filters.productId === prevProductId.current) {
      return;
    }
    prevProductId.current = filters.productId;
    const getReviews = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchReviewService(filters);
        setReviews(response.data);
      } catch (err) {
        setError(err);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };
    getReviews();
  }, [filters.productId]);

  // Function to create a new review
  const createReview = async (data) => {
    setLoading(true);
    setError(null);
    try {
      // Ensure we send a plain JS object and not FormData
      const payload = {
        reviewer_name: data.reviewer_name,
        reviewer_email: data.reviewer_email,
        reviewer_comment: data.reviewer_comment,
        product_id: filters.productId,
      };
      await createReviewService(payload);
      // Refetch reviews after creation for consistency
      const reviewsResponse = await fetchReviewService(filters);
      setReviews(reviewsResponse.data);
    } catch (err) {
      setError(err);
      throw err; // Re-throw to handle it in the component if needed
    } finally {
      setLoading(false);
    }
  };
  return { reviews, loading, error, createReview };
}
