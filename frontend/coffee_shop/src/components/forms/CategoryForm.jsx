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
    
    if (loading) return; // Prevent multiple submissions while loading
    e.preventDefault();
    try {
      await createCategory(form);
      setForm({ category_name: "" }); // Reset the form after submission
      Swal.fire({
        icon: "success",
        title: "Category Created",
        text: "Your category has been created successfully.",
      });
    } catch (error) {
      console.error("Error creating category:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an error creating the category.",
      });
      return;
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
