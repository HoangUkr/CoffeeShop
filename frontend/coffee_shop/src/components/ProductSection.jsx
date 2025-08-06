import React, { useEffect, useState, useRef, useMemo } from "react";
import ProductCard from "./cards/ProductCard";

// Import custom hook to fetch categories
import useCategories from "../hooks/useCategory";
import useProducts from "../hooks/useProduct";

const ProductSection = () => {
  
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategories();
  const [category, setCategory] = useState("");
  // const didSetDefault = useRef(false);

  // Use the first category as default if available
  useEffect(() => {
    
    if (categories.length > 0 && !category) {
      setCategory(categories[0].id);
      // didSetDefault.current = true;
    }
  }, [categories]);

  const filter = useMemo(() => {
    return category ? { category } : {};
  }, [category]);

  // Filter products based on selected category
  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useProducts(filter);

  return (
    <section className="px-4 py-8 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-[#4B2E2E] mb-6 text-center">
        Our Products
      </h2>

      <div className="flex justify-center mb-6 space-x-4">
        {categoriesLoading ? (
          <span>Loading categories...</span>
        ) : (
          categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setCategory(category.id)}
              className={`px-8 py-3 rounded-full font-semibold text-lg transition ${
                category === category.id
                  ? "bg-yellow-500 text-[#4B2E2E] shadow"
                  : "bg-white text-[#4B2E2E] border border-yellow-500 hover:bg-yellow-100"
              }`}
            >
              {category.category_name}
            </button>
          ))
        )}
        {/* <button
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
        </button> */}
      </div>

      {productsLoading ? (
        <span>Loading products...</span>
      ) : productsError ? (
        <div className="text-red-500">
          Error loading products: {productsError.message}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.slice(0, 5).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div> */}
    </section>
  );
};

export default ProductSection;
