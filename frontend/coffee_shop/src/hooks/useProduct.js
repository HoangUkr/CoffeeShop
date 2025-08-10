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
  const [product, setProduct] = useState(null);
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
    if (filters !== undefined) {
      getProducts();
    }
  }, [filters]);

  // Function to get category id by product id
  const getCategoryId = async (productId) => {
    const res = await api.get(`/v1/products/${productId}/category`);
    return res.data;
  };

  // Function to fetch a single product by ID
  const getProductById = async (id) => {
    setLoading(true);
    setError(null);
    if (!id) {
      setLoading(false);
      setError("Invalid product ID");
      return null;
    }
    try {
      const response = await fetchProductService({ id });
      if (response.data && response.data.length > 0) {
        const productData = response.data[0]; // Assuming the API returns an array
        setProduct(productData);
        return productData;
      } else {
        throw new Error("Product not found");
      }
    } catch (error) {
      setError(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Function to create a new product
  const createProduct = async (data) => {
    setLoading(true);
    setError(null);
    try {
      let formData;
      if (data instanceof FormData) {
        formData = data; // If data is already a FormData object
      } else {
        formData = new FormData();
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
  return {
    products,
    product,
    loading,
    error,
    createProduct,
    getProductById,
    setProduct,
    getCategoryId,  
  };
}
