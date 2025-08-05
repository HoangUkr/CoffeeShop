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
      let formData;
      if (data instanceof FormData) {
        formData = data; // If data is already a FormData object
      } else {
        const formData = new FormData();
        formData.append("product_name", data.product_name);
        formData.append("product_price", data.product_price);
        formData.append("product_like_count", data.product_like_count);
        formData.append("category", data.category);
        if (data.thumbnail) {
          formData.append("thumbnail", data.thumbnail);
        }
        if (data.images && data.images.length > 0) {
          data.images.forEach((img) => {
            formData.append("images", img);
          });
        }
      }
      const response = await createProductService(formData);
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
