import api from "../api/axiosInstance";

// Fetch reservations with optional filters
export const fetchReviewService = (filters) => {
  return api.get("v1/reviews", { params: filters });
};

export const createReviewService = (data) => {
  // Explicitly set Content-Type to application/json
  return api.post("v1/reviews/create/", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deleteReviewService = (id) => {
  return api.delete(`v1/reviews/${id}/`);
};
