import api, { authenticatedApi } from "../api/axiosInstance";

// Fetch categories with optional filters (public endpoint)
export const fetchCategoriesService = (filters) => {
  return api.get("v1/categories/", { params: filters });
};

// Create category (requires authentication)
export const createCategoryService = (data) => {
  return authenticatedApi.post("v1/categories/create/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Update category (requires authentication)
export const updateCategoryService = (id, data) => {
  return authenticatedApi.put(`v1/categories/${id}/`, data);
};

// Delete category (requires authentication)
export const deleteCategoryService = (id) => {
  return authenticatedApi.delete(`v1/categories/${id}/`);
};
