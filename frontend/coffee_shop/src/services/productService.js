import api from "../api/axiosInstance";

// Fetch products with optional filters
export const fetchProductService = (filters) => {
  return api.get("v1/products", { params: filters });
};

// Create, update, and delete product services
export const createProductService = (data) => {
  return api.post("v1/products/create/", data);
};

export const updateProductService = (id, data) => {
  return api.put(`v1/products/${id}/`, data);
};

export const deleteProductService = (id) => {
  return api.delete(`v1/products/${id}/`);
};
