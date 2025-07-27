import React from "react";

const relatedProducts = [
  {
    id: 1,
    name: "Vanilla Latte",
    price: 4.2,
    image: "/products/coffee.webp",
  },
  {
    id: 2,
    name: "Hazelnut Mocha",
    price: 4.5,
    image: "/products/coffee.webp",
  },
  {
    id: 3,
    name: "Iced Americano",
    price: 3.8,
    image: "/products/coffee.webp",
  },
  {
    id: 4,
    name: "Cappuccino",
    price: 4.0,
    image: "/products/coffee.webp",
  },
  {
    id: 5,
    name: "Flat White",
    price: 4.3,
    image: "/products/coffee.webp",
  },
  {
    id: 6,
    name: "Flat White",
    price: 4.3,
    image: "/products/coffee.webp",
  },
  {
    id: 7,
    name: "Flat White",
    price: 4.3,
    image: "/products/coffee.webp",
  }
];

const RelatedProductsCarousel = () => {
  return (
    <div className="mt-16">
      <h3 className="text-2xl font-bold text-[#4B2E2E] mb-4">Related Products</h3>
      <div className="overflow-x-auto">
        <div className="flex gap-6 w-max">
          {relatedProducts.map((product) => (
            <div
              key={product.id}
              className="min-w-[200px] bg-white rounded-xl shadow-md p-4 flex flex-col items-center"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-32 h-32 object-contain mb-2"
              />
              <h4 className="text-lg font-semibold text-center text-[#4B2E2E]">{product.name}</h4>
              <p className="text-yellow-700 font-medium mb-2">€{product.price.toFixed(2)}</p>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-[#4B2E2E] font-semibold px-4 py-1 rounded-full">
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedProductsCarousel;