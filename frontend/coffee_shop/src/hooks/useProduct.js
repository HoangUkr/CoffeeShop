import { useState, useEffect } from "react";
import api from "../api/axiosInstance";

// Import service funtions
import {
  fetchProductService,
  createProductService,
  updateProductService,
  deleteProductService,
} from "../services/productService";

export default function useProducts(filters) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const response = await fetchProductService(filters);
        setProducts(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [filters]);

  // Function to create a new product
  const createProduct = async (data) => {
    debugger;
    setLoading(true);
    setError(null);
    try {
      const response = await createProductService({
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
      });
      setProducts((prev) => [...prev, response.data]);
    } catch (err) {
      setError(err);
      throw err; // Re-throw to handle it in the component if needed
    } finally {
      setLoading(false);
    }
  };
  return { products, loading, error, createProduct };
}
