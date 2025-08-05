import api from "../api/axiosInstance";

// Fetch categories with optional filters
export const fetchCategoriesService = (filters) => {
  return api.get("v1/categories", { params: filters });
};

export const createCategoryService = (data) => {
  debugger;
  return api.post("v1/categories/create/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateCategoryService = (id, data) => {
  return api.put(`v1/categories/${id}/`, data);
};

export const deleteCategoryService = (id) => {
  return api.delete(`v1/categories/${id}/`);
};
