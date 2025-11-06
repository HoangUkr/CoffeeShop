import { createContext, useContext, useState, useEffect } from "react";

// Import API instance
import api from "../api/axiosInstance";

// Import utility to get CSRF token
import utils from "../utils/utils";

// Import SweetAlert for notifications
import Swal from "sweetalert2";

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const totalCount = cartItems.reduce((total, item) => total + item.quantity, 0);
        setCartCount(totalCount);
    }, [cartItems]);

    // Add item to cart
    const addToCart = async (product, quantity = 1) => {
        setLoading(true);
        try{
            const response = await api.post("v1/cart/items/add/", {
                product_id: product.id, 
                quantity
            }, {
                withCredentials: true,
            });
            
            const newItem = response.data;
            updateCartItems(newItem);
            Swal.fire({
                icon: 'success',
                title: 'Added to Cart!',
                text: `${product.product_name} added to cart!`,
                timer: 2000,
                showConfirmButton: false,
                toast: true,
                position: 'top-end'
            });
            return { success: true, item: newItem };
        }
        catch (error) {
            console.error("Error adding to cart:", error);
            const errorMessage = error.response?.data?.detail || error.response?.data?.error || error.message || 'Failed to add item to cart';
            console.log("Status:", error.response?.status);
            console.log("Full error response:", error.response?.data);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorMessage,
                timer: 3000,
                showConfirmButton: false,
                toast: true,
                position: 'top-end'
            });
            return { success: false, error: errorMessage };
        }
        finally {
            setLoading(false);
        }
    };

    // Fetch cart from backend
    const fetchCart = async () => {
        try {
            const response = await api.get('v1/cart/', {
                withCredentials: true
            });
            setCartItems(response.data.items || []);
        } 
        catch (error) {
            console.error('Error fetching cart:', error);
        }      
    }

    // Update cart items state
    const updateCartItems = (newItem) => {
        setCartItems(prevItems => {
            const existingIndex = prevItems.findIndex(item => item.product.id === newItem.product.id);
            if (existingIndex >= 0) {
                const updatedItems = [...prevItems];
                updatedItems[existingIndex] = newItem;
                return updatedItems;
            } 
            else 
            {
                return [...prevItems, newItem];
            }
        });
    };

    // Load cart on mount
    useEffect(() => {
        fetchCart();
    }, []);

    return (
        <CartContext.Provider value={{
        cartItems,
        cartCount,
        loading,
        addToCart,
        fetchCart,
        updateCartItems
        }}>
        {children}
        </CartContext.Provider>
    );
}