import React, { useState } from "react";
import ProductCard from "./cards/ProductCard";

const ProductSection = () => {
  const [category, setCategory] = useState("coffee");
  // ProductSection component to display products
  const coffeeProducts = [
    { id: 1, name: "Espresso", price: 3.5, image: "/products/coffee.webp" },
    { id: 2, name: "Cappuccino", price: 4.0, image: "/products/coffee.webp" },
    { id: 3, name: "Latte", price: 4.5, image: "/products/coffee.webp" },
  ];

  const cakeProducts = [
    { id: 4, name: "Chocolate Cake", price: 5.0, image: "/products/cake.jpg" },
    { id: 5, name: "Cheesecake", price: 5.5, image: "/products/cake.jpg" },
    { id: 6, name: "Red Velvet", price: 6.0, image: "/products/cake.jpg" },
  ];
  const products = category === "coffee" ? coffeeProducts : cakeProducts;
  return (
    <section className="px-4 py-8 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-[#4B2E2E] mb-6 text-center">
        Our Products
      </h2>

      <div className="flex justify-center mb-6 space-x-4">
        <button
          onClick={() => setCategory("coffee")}
          className={`px-6 py-2 rounded-full font-semibold ${
            category === "coffee"
              ? "bg-yellow-500 text-[#4B2E2E]"
              : "bg-white text-[#4B2E2E] border border-yellow-500"
          }`}
        >
          Coffee
        </button>
        <button
          onClick={() => setCategory("cake")}
          className={`px-6 py-2 rounded-full font-semibold ${
            category === "cake"
              ? "bg-yellow-500 text-[#4B2E2E]"
              : "bg-white text-[#4B2E2E] border border-yellow-500"
          }`}
        >
          Cake
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductSection;
