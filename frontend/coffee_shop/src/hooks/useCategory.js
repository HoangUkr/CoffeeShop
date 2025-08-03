import { useState, useEffect } from "react";
import { fetchCategoriesService, createCategoryService } from "../services/categoryService";

export default function useCategories(filters) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      try {
        const response = await fetchCategoriesService(filters);
        setCategories(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getCategories();
  }, [filters]);

  // Function to create a new category
  const createCategory = async (data) => {
    debugger;
    setLoading(true);
    setError(null);
    try {
      const response = await createCategoryService({
        name: data.name
      });
      setCategories((prev) => [...prev, response.data]);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  return { categories, loading, error, createCategory };
}