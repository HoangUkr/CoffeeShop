import api from "../api/axiosInstance";

// Fetch reservations with optional filters
export const fetchReservationsService = (filters) => {
  return api.get("v1/reservations", { params: filters });
};

export const createReservationService = (data) => {
  return api.post("v1/reservations/create/", data);
};

export const updateReservationService = (id, data) => {
  return api.put(`v1/reservations/${id}/`, data);
};

export const deleteReservationService = (id) => {
  return api.delete(`v1/reservations/${id}/`);
};
