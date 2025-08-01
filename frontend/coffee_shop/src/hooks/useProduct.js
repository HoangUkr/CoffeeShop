import { useState, useEffect } from "react";
import api from "../api/axiosInstance";

export default function useProducts(filters) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      setError(null);
      try {
        const params = {};
        if (filters.name) params.name = filters.name;
        if (filters.price) params.price = filters.price;
        if (filters.category) params.category = filters.category;

        const response = await api.get("v1/products/", { params });
        setProducts(response.data);
      } catch (err) {
        setError(err.response?.data || "Fetch error");
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [filters]);
  return { products, loading, error };
}
