import React, { useState } from "react";

// Import the hook
import useCategories from "../../hooks/useCategory";

// Import SweetAlert for alerts
import Swal from "sweetalert2";

const CategoryForm = () => {
  const [form, setForm] = useState({ category_name: "" });
  const { createCategory, loading, error } = useCategories();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (loading) return; // Prevent multiple submissions while loading
    
    try {
      const result = await createCategory(form);
      
      if (!result.success) {
        console.error("Error creating category:", result.error);
        
        // Handle different types of errors
        let errorMessage = "There was an error creating the category.";
        const error = result.error;
        
        if (error?.response) {
          // Server responded with error status
          const status = error.response.status;
          const data = error.response.data;
          
          if (status === 401) {
            errorMessage = "Unauthorized. Please login as admin to create categories.";
          } else if (status === 403) {
            errorMessage = "Forbidden. You don't have permission to create categories.";
          } else if (status === 400) {
            // Validation errors
            if (data.category_name) {
              errorMessage = `Category name: ${data.category_name.join(", ")}`;
            } else if (data.non_field_errors) {
              errorMessage = data.non_field_errors.join(", ");
            } else {
              errorMessage = "Invalid data provided.";
            }
          } else if (status >= 500) {
            errorMessage = "Server error. Please try again later.";
          } else {
            errorMessage = data.detail || data.message || errorMessage;
          }
        } else if (error?.request) {
          // Network error
          errorMessage = "Network error. Please check your connection.";
        } else if (error?.message) {
          errorMessage = error.message;
        }
        
        Swal.fire({
          icon: "error",
          title: "Error",
          text: errorMessage,
        });
        return;
      }
      
      // Success case
      setForm({ category_name: "" }); // Reset the form after submission
      Swal.fire({
        icon: "success",
        title: "Category Created",
        text: "Your category has been created successfully.",
      });
      
    } catch (error) {
      console.error("Unexpected error:", error);
      Swal.fire({
        icon: "error",
        title: "Unexpected Error",
        text: "An unexpected error occurred. Please try again.",
      });
    }
  };
  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-[#4B2E2E] mb-6 text-center">
        Create Category
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="category_name"
            className="block text-sm font-medium text-gray-700"
          >
            Category Name
          </label>
          <input
            type="text"
            name="category_name"
            id="category_name"
            value={form.category_name}
            onChange={handleChange}
            required
            className="mt-1 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 text-[#4B2E2E]"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-[#4B2E2E] font-semibold px-4 py-2 rounded-full"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
