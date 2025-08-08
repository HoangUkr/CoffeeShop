import api from "../api/axiosInstance";

// Fetch reservations with optional filters
export const fetchReviewService = (filters) => {
  return api.get("v1/reviews", { params: filters });
};

export const createReviewService = (data) => {
  return api.post("v1/reviews/create/", data);
};

export const deleteReviewService = (id) => {
  return api.delete(`v1/reviews/${id}/`);
};
