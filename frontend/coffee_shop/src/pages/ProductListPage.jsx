import React, { useState } from "react";
import ProductCard from "../components/cards/ProductCard";
import { Listbox } from "@headlessui/react";

// Import hooks
import useProducts from "../hooks/useProduct";
import useCategories from "../hooks/useCategory";

// const categories = ["All", "Coffee", "Cake", "Tea"];

const ProductListPage = () => {
  const MIN_PRICE = 0; // Minimum price for the range slider
  const MAX_PRICE = 10; // Maximum price for the range slider

  const [searchName, setSearchName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([MIN_PRICE, MAX_PRICE]);
  const [filters, setFilters] = useState({});

  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategories();
  const {
    products,
    loading: productLoading,
    error: productError,
  } = useProducts(filters);

  const handleSearch = () => {
    const newFilters = {};
    if (searchName.trim()) {
      newFilters.product_name = searchName.trim();
    }
    if (selectedCategory !== "All") {
      newFilters.category = selectedCategory;
    }
    if (priceRange[1] > 0) {
      newFilters.max_price = priceRange[1];
    }
    if (priceRange[0] > MAX_PRICE) {
      newFilters.min_price = priceRange[0];
    }
    setFilters(newFilters);
  };

  const categoryOptions = ["All", ...(categories?.map((cat) => cat.id) || [])];
  const getCategoryName = (value) => {
    if (value === "All") return "All";
    const category = categories?.find((cat) => cat.id === value);
    return category ? category.category_name : value;
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8 mt-15">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Search Panel */}
        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-[#4B2E2E]">
            Search Products
          </h2>
          <div className="space-y-4">
            {/* Name Search */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Product Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Search by name"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-[#4B2E2E]"
              />
            </div>

            {/* Category Combobox */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <Listbox value={selectedCategory} onChange={setSelectedCategory}>
                <div className="relative">
                  <Listbox.Button className="w-full border border-gray-300 rounded-md px-4 py-2 text-left focus:outline-none focus:ring-2 focus:ring-yellow-400 text-[#4B2E2E]">
                    {getCategoryName(selectedCategory)}
                  </Listbox.Button>
                  <Listbox.Options className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 text-[#4B2E2E]">
                    {categoriesLoading ? (
                      <div className="px-4 py-2">Loading categories...</div>
                    ) : (
                      <>
                        <Listbox.Option
                          key="all"
                          value="All"
                          className="px-4 py-2 hover:bg-yellow-100 cursor-pointer"
                        >
                          All
                        </Listbox.Option>
                        {categories?.map((cat) => (
                          <Listbox.Option
                            key={cat.id}
                            value={cat.id}
                            className="px-4 py-2 hover:bg-yellow-100 cursor-pointer"
                          >
                            {cat.category_name}
                          </Listbox.Option>
                        ))}
                      </>
                    )}
                  </Listbox.Options>
                </div>
              </Listbox>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Price
              </label>
              <input
                type="range"
                min={MIN_PRICE}
                max={MAX_PRICE}
                step={0.5}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseFloat(e.target.value)])}
                className="w-full"
              />
              <p className="text-sm text-gray-500 mt-1">
                Up to ${priceRange[1].toFixed(2)}
              </p>
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-[#4B2E2E] font-semibold px-4 py-2 rounded-full"
            >
              Search
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {productLoading && <p>Loading...</p>}
            {productError && <p className="text-red-500">{productError}</p>}
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center">
                No products found.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;
