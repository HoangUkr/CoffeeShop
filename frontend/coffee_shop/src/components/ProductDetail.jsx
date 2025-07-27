import React, { useState } from "react";

const product = {
  id: 101,
  name: "Espresso",
  description:
    "A strong and bold coffee made by forcing hot water through finely-ground coffee beans",
  category: "Coffee",
  price: 3.0,
  images: ["/products/cake.jpg", "/products/cake.jpg", "/products/cake.jpg"],
};

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(product.images[0]);

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product.name} to cart`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* Left side image section */}
      <div className="flex gap-4">
        {/* Thumbnails */}
        <div className="flex flex-col gap-4 w-1/4">
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index}`}
              className="w-full h-24 object-contain rounded cursor-pointer border border-gray-300 hover:border-gray-500"
              onClick={() => setMainImage(image)}
            />
          ))}
        </div>

        {/* Main Image */}
        <div className="w-3/4">
          <img
            src={mainImage}
            alt={product.name}
            className="rounded-lg shadow-sm object-contain w-full h-96"
          />
        </div>
      </div>

      {/* Right side details */}
      <div className="flex flex-col justify-between space-y-4">
        <h1 className="text-3xl font-bold text-[#4B2E2E]">{product.name}</h1>

        <p className="text-xl text-yellow-700 font-semibold">
          <span className="text-gray-600 mr-2">Price:</span> €
          {product.price.toFixed(2)}
        </p>
        <p className="text-gray-700">{product.description}</p>
        <div className="flex items-center gap-4">
          <label
            htmlFor="quantity"
            className="text-sm font-medium text-gray-600"
          >
            Quantity:
          </label>
          <input
            id="quantity"
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-20 px-3 py-1 border rounded text-[#4B2E2E]"
          />
          <button
            onClick={handleAddToCart}
            className="bg-yellow-500 hover:bg-yellow-600 text-[#4B2E2E] font-semibold px-4 py-2 rounded-full"
          >
            Add to Cart
          </button>
        </div>
        <p className="text-sm text-gray-500">
          Category: <span className="font-medium">{product.category}</span>
        </p>
      </div>
    </div>
  );
};

export default ProductDetail;
