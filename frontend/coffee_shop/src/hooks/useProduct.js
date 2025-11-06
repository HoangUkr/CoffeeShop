import { useState, useEffect, useMemo, useRef } from "react";
import api, { authenticatedApi } from "../api/axiosInstance";

// Import service funtions
import {
  fetchProductService,
  createProductService,
  updateProductService,
  deleteProductService,
} from "../services/productService";

// Global cache to prevent duplicate requests
const requestCache = new Map();
const pendingRequests = new Map();

export default function useProducts(filters) {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const mountedRef = useRef(true);

  // Memoize filters to prevent unnecessary re-renders
  const memoizedFilters = useMemo(() => {
    return filters || {};
  }, [filters]);

  // Create a cache key based on filters
  const cacheKey = useMemo(() => {
    const filterKeys = Object.keys(memoizedFilters).sort();
    return filterKeys.length > 0 ? JSON.stringify(memoizedFilters) : 'no-filters';
  }, [memoizedFilters]);

  useEffect(() => {
    const getProducts = async () => {
      // Check if request is already pending
      if (pendingRequests.has(cacheKey)) {
        const existingRequest = pendingRequests.get(cacheKey);
        try {
          const result = await existingRequest;
          if (mountedRef.current) {
            setProducts(result);
            setError(null);
          }
        } catch (err) {
          if (mountedRef.current) {
            console.error("Error fetching products from pending request:", err);
            if (err.response?.status === 429) {
              setError("Too many requests. Please wait a moment before trying again.");
            } else {
              const errorMessage = err.response?.data?.detail || err.response?.data?.error || err.message || 'Failed to fetch products';
              setError(errorMessage);
            }
          }
        } finally {
          if (mountedRef.current) {
            setLoading(false);
          }
        }
        return;
      }

      // Check cache first
      if (requestCache.has(cacheKey)) {
        const cachedData = requestCache.get(cacheKey);
        if (Date.now() - cachedData.timestamp < 30000) { // Cache for 30 seconds
          if (mountedRef.current) {
            setProducts(cachedData.data);
            setError(null);
            setLoading(false);
          }
          return;
        } else {
          requestCache.delete(cacheKey); // Remove expired cache
        }
      }

      if (mountedRef.current) {
        setLoading(true);
      }

      // Create new request and store it
      const requestPromise = fetchProductService(Object.keys(memoizedFilters).length > 0 ? memoizedFilters : undefined)
        .then(response => {
          const data = response.data;
          // Cache the result
          requestCache.set(cacheKey, {
            data: data,
            timestamp: Date.now()
          });
          return data;
        });

      pendingRequests.set(cacheKey, requestPromise);

      try {
        const data = await requestPromise;
        if (mountedRef.current) {
          setProducts(data);
          setError(null);
        }
      } catch (err) {
        if (mountedRef.current) {
          console.error("Error fetching products:", err);
          if (err.response?.status === 429) {
            setError("Too many requests. Please wait a moment before trying again.");
          } else {
            const errorMessage = err.response?.data?.detail || err.response?.data?.error || err.message || 'Failed to fetch products';
            setError(errorMessage);
          }
        }
      } finally {
        pendingRequests.delete(cacheKey);
        if (mountedRef.current) {
          setLoading(false);
        }
      }
    };
    
    // Add a small delay to prevent rapid API calls
    const timeoutId = setTimeout(() => {
      getProducts();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [cacheKey, memoizedFilters]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

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
      console.error("Error fetching product by ID:", error);
      const errorMessage = error.response?.data?.detail || error.response?.data?.error || error.message || 'Failed to fetch product';
      setError(errorMessage);
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
        formData.append("category_id", data.category);
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
      
      // Check if response is successful
      if (response.status === 201 || response.status === 200) {
        setProducts((prev) => [...prev, response.data]);
        return { success: true, data: response.data };
      } else {
        const errorMsg = `Unexpected status: ${response.status}`;
        setError(new Error(errorMsg));
        return { success: false, error: errorMsg };
      }
      
    } catch (err) {
      console.error("CreateProduct error:", err);
      const errorMessage = err.response?.data?.detail || err.response?.data?.error || err.message || 'Failed to create product';
      setError(errorMessage);
      return { success: false, error: errorMessage };
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
