import React, {useState} from "react";
import { Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom"; 

import { useCart } from "../../hooks/useCart";

/* Icon */
import {
  EyeIcon,
  ShoppingCartIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

const ProductCard = ({ product }) => {
  const navigate = useNavigate(); // Navigation hook
  const { addToCart, loading } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    const result = await addToCart(product, 1);
    if (result.success) {
      console.log("Product added to cart:", result.item);
    }
    else{
      console.error("Failed to add product to cart:", result.error);
    }
    setIsAdding(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 items-center">
      <div className="aspect-w-1 aspect-h-1 w-full bg-gray-100 flex items-center justify-center h-48">
        <img
          src={product.thumbnail}
          alt={product.product_name}
          className="object-contain bg-gray-100 w-full h-full"
        />
      </div>

      <div className="p-4 flex flex-col justify-between h-[160px]">
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold text-center text-[#4B2E2E] truncate">
            {product.product_name}
          </h3>
          <p className="text-yellow-700 font-medium mb-2">
            ${product.product_price}
          </p>
        </div>

        <div className="mt-4 flex justify-center space-x-2">
          <button
            type="button"
            className="p-2 bg-yellow-500 hover:bg-yellow-600 text-[#4B2E2E] rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
            aria-label="View"
            onClick={() => navigate(`/products/${product.id}`) }
          >
            <EyeIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="p-2 bg-yellow-500 hover:bg-yellow-600 text-[#4B2E2E] rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
            aria-label="Add to Cart"
            onClick={handleAddToCart}
            disabled={isAdding || loading}
          >
            { isAdding ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#4B2E2E] border-t-transparent"></div>
            ):
              (<ShoppingCartIcon className="h-5 w-5" />
            )}
          </button>
          <button
            type="button"
            className="p-2 bg-yellow-500 hover:bg-yellow-600 text-[#4B2E2E] rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
            aria-label="Like"
          >
            <HeartIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
