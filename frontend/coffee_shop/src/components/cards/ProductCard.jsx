import React from "react";
import { Transition } from "@headlessui/react";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-w-1 aspect-h-1 w-full bg-gray-100 flex items-center justify-center h-48">
        <img
          src={product.image}
          alt={product.name}
          className="object-contain bg-gray-100 w-full h-full"
        />
      </div>

      <div className="p-4 flex flex-col justify-between h-[160px]">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            ${product.price.toFixed(2)}
          </p>
        </div>

        <button
          type="button"
          className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-[#4B2E2E] font-semibold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
