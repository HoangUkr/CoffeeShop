import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";

// Import custom hook
import useProducts from "../hooks/useProduct";

const ProductDetail = ({ productId }) => {
  // debugger;
  // const {  } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState("");
  const isFetched = useRef(false);

  const {
    product,
    getProductById,
    loading: productLoading,
    error: productError,
  } = useProducts();

  useEffect(() => {
    const fetchProduct = async () => {
      // debugger;
      if (!productId || isFetched.current) return;
      isFetched.current = true;
      console.log(`Fetching product with ID: ${productId}`);
      try {
        const productData = await getProductById(productId);
        if (productData && productData.thumbnail) {
          setMainImage(productData.thumbnail);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();

    return () => {
      isFetched.current = false; // Reset on unmount
    };
  }, [productId]);

  useEffect(() => {
    isFetched.current = false; // Reset when quantity changes
  }, [productId]);

  // Handle adding to cart (placeholder function)
  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product.name} to cart`);
  };

  const handleImageClick = (image) => {
    setMainImage(image);
  };

  if (productLoading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <p className="text-lg">Loading product...</p>
      </div>
    );
  }

  if (productError) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <p className="text-red-500">Error loading product: {productError}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <p className="text-gray-500">Product not found</p>
      </div>
    );
  }
  // debugger;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* Left side image section */}
      <div className="flex flex-col gap-4">
        {/* Thumbnails */}
        <div className="w-full">
          <img
            src={mainImage || product.thumbnail}
            alt="Main product image"
            className="w-full h-96 object-contain rounded-lg border border-gray-300"
          />
        </div>

        <div className="grid grid-cols-4 gap-2">
          {/* Thumbnail spans 2 columns (2x width) */}
          {product.thumbnail && (
            <div className="col-span-1">
              <img
                src={product.thumbnail}
                alt="Product thumbnail"
                className={`w-full h-20 object-cover rounded cursor-pointer border-2 transition-all duration-200 ${
                  mainImage === product.thumbnail
                    ? "border-yellow-500 ring-2 ring-yellow-200"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                onClick={() => handleImageClick(product.thumbnail)}
              />
            </div>
          )}
          {/* Other Images - 1x width each */}
          {product.images &&
            product.images.length > 0 &&
            product.images.map((image, index) => (
              <div key={index} className="flex-1">
                {" "}
                {/* 1x width */}
                <img
                  src={image.image || image}
                  alt={`Product image ${index + 1}`}
                  className={`w-full h-24 object-contain rounded cursor-pointer border-2 ${
                    mainImage === (image.image || image)
                      ? "border-yellow-500"
                      : "border-gray-300 hover:border-gray-500"
                  }`}
                  onClick={() => handleImageClick(image.image || image)}
                />
              </div>
            ))}
        </div>
      </div>

      {/* Right side details */}
      <div className="flex flex-col justify-between space-y-4">
        <h1 className="text-3xl font-bold text-[#4B2E2E]">
          {product.product_name}
        </h1>

        <p className="text-xl text-yellow-700 font-semibold">
          <span className="text-gray-600 mr-2">Price:</span> €
          {product.product_price.toFixed(2)}
        </p>
        {product.description && (
          <p className="text-gray-700">{product.product_description}</p>
        )}
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
          Category:{" "}
          <span className="font-medium">{product.category.category_name}</span>
        </p>
      </div>
    </div>
  );
};

export default ProductDetail;
