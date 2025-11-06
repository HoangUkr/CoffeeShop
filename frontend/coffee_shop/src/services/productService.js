import api, { authenticatedApi } from "../api/axiosInstance";

// Fetch products with optional filters (public endpoint)
export const fetchProductService = (filters) => {
  return api.get("v1/products/", { params: filters });
};

// Create product (requires authentication)
export const createProductService = (data) => {
  return authenticatedApi.post("v1/products/create/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Update product (requires authentication)
export const updateProductService = (id, data) => {
  return authenticatedApi.put(`v1/products/${id}/`, data);
};

// Delete product (requires authentication)
export const deleteProductService = (id) => {
  return authenticatedApi.delete(`v1/products/${id}/`);
};
