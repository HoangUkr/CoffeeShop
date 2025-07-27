import React from "react";
import { Transition } from "@headlessui/react";

/* Icon */
import {
  EyeIcon,
  ShoppingCartIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 items-center">
      <div className="aspect-w-1 aspect-h-1 w-full bg-gray-100 flex items-center justify-center h-48">
        <img
          src={product.image}
          alt={product.name}
          className="object-contain bg-gray-100 w-full h-full"
        />
      </div>

      <div className="p-4 flex flex-col justify-between h-[160px]">
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold text-center text-[#4B2E2E] truncate">
            {product.name}
          </h3>
          <p className="text-yellow-700 font-medium mb-2">
            ${product.price.toFixed(2)}
          </p>
        </div>

        <div className="mt-4 flex justify-center space-x-2">
          <button
            type="button"
            className="p-2 bg-yellow-500 hover:bg-yellow-600 text-[#4B2E2E] rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
            aria-label="View"
          >
            <EyeIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="p-2 bg-yellow-500 hover:bg-yellow-600 text-[#4B2E2E] rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
            aria-label="Add to Cart"
          >
            <ShoppingCartIcon className="h-5 w-5" />
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
