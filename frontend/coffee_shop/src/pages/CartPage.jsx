import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/* Components */
import CartTable from "../components/tables/CartTable";

const CartPage = () => {
  // Navigation hook
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Coffee", price: 2.5, quantity: 2 },
    { id: 2, name: "Pastry", price: 3.0, quantity: 1 },
  ]);
  const updateQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div>
      <main className="flex-grow pt-20 px-6 py-12 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-[#4B2E2E]">
          🛒 Your Cart
        </h2>
        <CartTable
          items={cartItems}
          updateQuantity={updateQuantity}
          removeItem={removeItem}
        />
        <div className="text-right mt-6 text-lg font-semibold text-[#4B2E2E]">
          Total: €{total.toFixed(2)}
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-[#4B2E2E] font-semibold px-6 py-2 rounded-full"
            onClick={() => {
              navigate("/customer-data");
            }}
          >
            Confirm Order
          </button>
        </div>
      </main>
    </div>
  );
};

export default CartPage;
