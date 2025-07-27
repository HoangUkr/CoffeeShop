import React, { useState } from "react";
import ProductCard from "../components/cards/ProductCard"; // Your existing card component
import { Listbox } from "@headlessui/react";

const categories = ["All", "Coffee", "Cake", "Tea"];

const sampleProducts = [
  {
    id: 1,
    name: "Espresso",
    category: "Coffee",
    price: 3.5,
    image: "/products/cake.jpg",
  },
  {
    id: 2,
    name: "Cheesecake",
    category: "Cake",
    price: 5.0,
    image: "/products/cake.jpg",
  },
  {
    id: 3,
    name: "Green Tea",
    category: "Tea",
    price: 2.5,
    image: "/products/cake.jpg",
  },
  {
    id: 3,
    name: "Green Tea",
    category: "Tea",
    price: 2.5,
    image: "/products/cake.jpg",
  },
  {
    id: 3,
    name: "Green Tea",
    category: "Tea",
    price: 2.5,
    image: "/products/cake.jpg",
  },
  {
    id: 3,
    name: "Green Tea",
    category: "Tea",
    price: 2.5,
    image: "/products/cake.jpg",
  },
  {
    id: 3,
    name: "Green Tea",
    category: "Tea",
    price: 2.5,
    image: "/products/cake.jpg",
  },
  {
    id: 3,
    name: "Green Tea",
    category: "Tea",
    price: 2.5,
    image: "/products/cake.jpg",
  },
  {
    id: 3,
    name: "Green Tea",
    category: "Tea",
    price: 2.5,
    image: "/products/cake.jpg",
  },
  {
    id: 3,
    name: "Green Tea",
    category: "Tea",
    price: 2.5,
    image: "/products/cake.jpg",
  },
  {
    id: 3,
    name: "Green Tea",
    category: "Tea",
    price: 2.5,
    image: "/products/cake.jpg",
  },
  {
    id: 3,
    name: "Green Tea",
    category: "Tea",
    price: 2.5,
    image: "/products/cake.jpg",
  },
  {
    id: 3,
    name: "Green Tea",
    category: "Tea",
    price: 2.5,
    image: "/products/cake.jpg",
  },
  {
    id: 3,
    name: "Green Tea",
    category: "Tea",
    price: 2.5,
    image: "/products/cake.jpg",
  },
  {
    id: 3,
    name: "Green Tea",
    category: "Tea",
    price: 2.5,
    image: "/products/cake.jpg",
  },
  {
    id: 3,
    name: "Green Tea",
    category: "Tea",
    price: 2.5,
    image: "/products/cake.jpg",
  },
  {
    id: 3,
    name: "Green Tea",
    category: "Tea",
    price: 2.5,
    image: "/products/cake.jpg",
  },
  {
    id: 3,
    name: "Green Tea",
    category: "Tea",
    price: 2.5,
    image: "/products/cake.jpg",
  },
];

const ProductListPage = () => {
  const [searchName, setSearchName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 10]);

  const filteredProducts = sampleProducts.filter((product) => {
    const matchesName = product.name
      .toLowerCase()
      .includes(searchName.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesName && matchesCategory && matchesPrice;
  });

  const handleSearch = () => {
    const results = sampleProducts.filter((product) => {
      const matchesName = product.name
        .toLowerCase()
        .includes(searchName.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesName && matchesCategory && matchesPrice;
    });
    setFilteredProducts(results);
  };

  return (
    <div className="max-w-full mt-4 px-4 py-8">
      <main>
        <div className="max-w-full mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Search Panel */}
            <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md h-fit">
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
                  <Listbox
                    value={selectedCategory}
                    onChange={setSelectedCategory}
                  >
                    <div className="relative">
                      <Listbox.Button className="w-full border border-gray-300 rounded-md px-4 py-2 text-left focus:outline-none focus:ring-2 focus:ring-yellow-400 text-[#4B2E2E]">
                        {selectedCategory}
                      </Listbox.Button>
                      <Listbox.Options className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 text-[#4B2E2E]">
                        {categories.map((cat) => (
                          <Listbox.Option
                            key={cat}
                            value={cat}
                            className="px-4 py-2 hover:bg-yellow-100 cursor-pointer text-[#4B2E2E]"
                          >
                            {cat}
                          </Listbox.Option>
                        ))}
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
                    min={0}
                    max={10}
                    step={0.5}
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([0, parseFloat(e.target.value)])
                    }
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
              <div className="h-[600px] overflow-y-auto pr-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
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
        </div>
      </main>
    </div>
  );
};

export default ProductListPage;
