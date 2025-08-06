import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Import custom hook
import useProducts from "../hooks/useProduct";

const ProductDetail = () => {
  debugger;
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState("");
  // const [product, setProduct] = useState(null);
  const {
    product,
    getProductById,
    loading: productLoading,
    error: productError,
  } = useProducts();

  useEffect(() => {
    const fetchProduct = async () => {
      debugger;
      const productData = await getProductById(id);
      if(productData && productData.thumbnail) {
        setMainImage(productData.thumbnail);
      }
    };
    if (id) {
      fetchProduct();
    }
  }, [id, getProductById]);

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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* Left side image section */}
      <div className="flex gap-4">
        {/* Thumbnails */}
        <div className="flex flex-col gap-4 w-1/4">
          {/* Show thumbnail first */}
          {product.thumbnail && (
            <img
              src={product.thumbnail}
              alt="Product thumbnail"
              className={`w-full h-24 object-cover rounded cursor-pointer border ${
                mainImage === product.thumbnail
                  ? "border-yellow-500"
                  : "border-gray-300 hover:border-gray-500"
              }`}
              onClick={() => handleImageClick(product.thumbnail)}
            />
          )}

          {/* Then show additional images */}
          {product.images &&
            product.images.length > 0 &&
            product.images.map((image, index) => (
              <img
                key={index}
                src={image.image || image}
                alt={`Product image ${index + 1}`}
                className={`w-full h-24 object-cover rounded cursor-pointer border ${
                  mainImage === (image.image || image)
                    ? "border-yellow-500"
                    : "border-gray-300 hover:border-gray-500"
                }`}
                onClick={() => handleImageClick(image.image || image)}
              />
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
