import { useState, useEffect, useMemo, useRef } from "react";
import { fetchCategoriesService, createCategoryService } from "../services/categoryService";

// Global cache to prevent duplicate requests
const categoryCache = new Map();
const categoryPendingRequests = new Map();

export default function useCategories(filters) {
  const [categories, setCategories] = useState([]);
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
    const getCategories = async () => {
      // Check if request is already pending
      if (categoryPendingRequests.has(cacheKey)) {
        const existingRequest = categoryPendingRequests.get(cacheKey);
        try {
          const result = await existingRequest;
          if (mountedRef.current) {
            setCategories(result);
            setError(null);
          }
        } catch (err) {
          if (mountedRef.current) {
            console.error("Error fetching categories from pending request:", err);
            if (err.response?.status === 429) {
              setError("Too many requests. Please wait a moment before trying again.");
            } else {
              const errorMessage = err.response?.data?.detail || err.response?.data?.error || err.message || 'Failed to fetch categories';
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
      if (categoryCache.has(cacheKey)) {
        const cachedData = categoryCache.get(cacheKey);
        if (Date.now() - cachedData.timestamp < 60000) { // Cache for 60 seconds
          if (mountedRef.current) {
            setCategories(cachedData.data);
            setError(null);
            setLoading(false);
          }
          return;
        } else {
          categoryCache.delete(cacheKey); // Remove expired cache
        }
      }

      if (mountedRef.current) {
        setLoading(true);
      }

      // Create new request and store it
      const requestPromise = fetchCategoriesService(Object.keys(memoizedFilters).length > 0 ? memoizedFilters : undefined)
        .then(response => {
          const data = response.data;
          // Cache the result
          categoryCache.set(cacheKey, {
            data: data,
            timestamp: Date.now()
          });
          return data;
        });

      categoryPendingRequests.set(cacheKey, requestPromise);

      try {
        const data = await requestPromise;
        if (mountedRef.current) {
          setCategories(data);
          setError(null);
        }
      } catch (err) {
        if (mountedRef.current) {
          console.error("Error fetching categories:", err);
          if (err.response?.status === 429) {
            setError("Too many requests. Please wait a moment before trying again.");
          } else {
            const errorMessage = err.response?.data?.detail || err.response?.data?.error || err.message || 'Failed to fetch categories';
            setError(errorMessage);
          }
        }
      } finally {
        categoryPendingRequests.delete(cacheKey);
        if (mountedRef.current) {
          setLoading(false);
        }
      }
    };

    // Add a small delay to prevent rapid API calls
    const timeoutId = setTimeout(() => {
      getCategories();
    }, 50);

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

  // Function to create a new category
  const createCategory = async (data) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await createCategoryService({
        category_name: data.category_name
      });
      
      // Check if response is successful
      if (response.status === 201 || response.status === 200) {
        setCategories((prev) => [...prev, response.data]);
        return { success: true, data: response.data };
      } else {
        const errorMsg = `Unexpected status: ${response.status}`;
        setError(new Error(errorMsg));
        return { success: false, error: errorMsg };
      }
      
    } catch (err) {
      console.error("CreateCategory error:", err);
      const errorMessage = err.response?.data?.detail || err.response?.data?.error || err.message || 'Failed to create category';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };
  return { categories, loading, error, createCategory };
}