import { useState, useEffect, useCallback } from 'react';
import { authenticatedApi } from '../api/axiosInstance';

/**
 * Custom hook for admin authentication and operations
 * Handles login, logout, user management, and admin data fetching
 */
export const useAdmin = () => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Data state
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // Loading states for different operations
  const [loadingStates, setLoadingStates] = useState({
    login: false,
    logout: false,
    users: false,
    orders: false,
    reservations: false,
    products: false,
    categories: false
  });

  // Set loading state for specific operation
  const setOperationLoading = useCallback((operation, isLoading) => {
    setLoadingStates(prev => ({
      ...prev,
      [operation]: isLoading
    }));
  }, []);

  // Check authentication status on mount
  useEffect(() => {
    checkAuth();
  }, []);

  /**
   * Check if user is authenticated
   */
  const checkAuth = async () => {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const response = await authenticatedApi.get('/auth/test/');
        setUser(response.data.user);
        setIsAuthenticated(true);
      } catch (error) {
        // Token invalid, clear storage
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setIsAuthenticated(false);
        setUser(null);
      }
    }
    setLoading(false);
  };

  /**
   * Admin login
   */
  const login = async (username, email, password) => {
    setOperationLoading('login', true);
    setError(null);

    try {
      const response = await authenticatedApi.post('/auth/login/', {
        username,
        email,
        password
      });

      const { access, refresh, user } = response.data;
      
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      
      setUser(user);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.detail || 'Login failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setOperationLoading('login', false);
    }
  };

  /**
   * Admin logout
   */
  const logout = async () => {
    setOperationLoading('logout', true);

    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        await authenticatedApi.post('/auth/logout/', {
          refresh: refreshToken
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      setUser(null);
      setIsAuthenticated(false);
      setOperationLoading('logout', false);
      
      // Clear all admin data on logout
      setUsers([]);
      setOrders([]);
      setReservations([]);
      setProducts([]);
      setCategories([]);
    }
  };

  /**
   * Fetch all users (admin only)
   */
  const fetchUsers = async () => {
    setOperationLoading('users', true);
    setError(null);

    try {
      const response = await authenticatedApi.get('/admin/users/');
      setUsers(response.data);
      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage = 'Failed to fetch users';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setOperationLoading('users', false);
    }
  };

  /**
   * Fetch all orders (admin only)
   */
  const fetchOrders = async () => {
    setOperationLoading('orders', true);
    setError(null);

    try {
      const response = await authenticatedApi.get('/admin/orders/');
      setOrders(response.data);
      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage = 'Failed to fetch orders';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setOperationLoading('orders', false);
    }
  };

  /**
   * Fetch all reservations (admin only)
   */
  const fetchReservations = async () => {
    setOperationLoading('reservations', true);
    setError(null);

    try {
      const response = await authenticatedApi.get('/admin/reservations/');
      setReservations(response.data);
      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage = 'Failed to fetch reservations';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setOperationLoading('reservations', false);
    }
  };

  /**
   * Fetch products for admin management
   */
  const fetchAdminProducts = async () => {
    setOperationLoading('products', true);
    setError(null);

    try {
      const response = await authenticatedApi.get('/admin/products/');
      setProducts(response.data);
      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage = 'Failed to fetch products';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setOperationLoading('products', false);
    }
  };

  /**
   * Fetch categories for admin management
   */
  const fetchAdminCategories = async () => {
    setOperationLoading('categories', true);
    setError(null);

    try {
      const response = await authenticatedApi.get('/admin/categories/');
      setCategories(response.data);
      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage = 'Failed to fetch categories';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setOperationLoading('categories', false);
    }
  };

  /**
   * Create new product (admin only)
   */
  const createProduct = async (productData) => {
    setError(null);

    try {
      const response = await authenticatedApi.post('/admin/products/', productData);
      setProducts(prev => [...prev, response.data]);
      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage = 'Failed to create product';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  /**
   * Update product (admin only)
   */
  const updateProduct = async (productId, productData) => {
    setError(null);

    try {
      const response = await authenticatedApi.put(`/admin/products/${productId}/`, productData);
      setProducts(prev => prev.map(product => 
        product.id === productId ? response.data : product
      ));
      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage = 'Failed to update product';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  /**
   * Delete product (admin only)
   */
  const deleteProduct = async (productId) => {
    setError(null);

    try {
      await authenticatedApi.delete(`/admin/products/${productId}/`);
      setProducts(prev => prev.filter(product => product.id !== productId));
      return { success: true };
    } catch (error) {
      const errorMessage = 'Failed to delete product';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  /**
   * Update order status (admin only)
   */
  const updateOrderStatus = async (orderId, status) => {
    setError(null);

    try {
      const response = await authenticatedApi.patch(`/admin/orders/${orderId}/`, { status });
      setOrders(prev => prev.map(order => 
        order.id === orderId ? { ...order, status } : order
      ));
      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage = 'Failed to update order status';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  /**
   * Update reservation status (admin only)
   */
  const updateReservationStatus = async (reservationId, status) => {
    setError(null);

    try {
      const response = await authenticatedApi.patch(`/admin/reservations/${reservationId}/`, { status });
      setReservations(prev => prev.map(reservation => 
        reservation.id === reservationId ? { ...reservation, status } : reservation
      ));
      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage = 'Failed to update reservation status';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  /**
   * Clear error state
   */
  const clearError = () => setError(null);

  /**
   * Load all admin data
   */
  const loadAllAdminData = async () => {
    if (!isAuthenticated) return;

    await Promise.all([
      fetchUsers(),
      fetchOrders(),
      fetchReservations(),
      fetchAdminProducts(),
      fetchAdminCategories()
    ]);
  };

  return {
    // Authentication state
    isAuthenticated,
    user,
    loading,
    error,
    
    // Loading states
    loadingStates,
    
    // Data
    users,
    orders,
    reservations,
    products,
    categories,
    
    // Authentication methods
    login,
    logout,
    checkAuth,
    
    // Data fetching methods
    fetchUsers,
    fetchOrders,
    fetchReservations,
    fetchAdminProducts,
    fetchAdminCategories,
    loadAllAdminData,
    
    // CRUD operations
    createProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
    updateReservationStatus,
    
    // Utility methods
    clearError
  };
};
