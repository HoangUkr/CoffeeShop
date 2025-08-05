import React, { useState } from "react";

// import custom hooks
import useCategories from "../../hooks/useCategory";
import useProducts from "../../hooks/useProduct";

// Import SweetAlert for alerts
import Swal from "sweetalert2";

const initialData = {
  productName: "",
  productPrice: "",
  productLikeCount: 0,
  productThumbnail: null,
  productCategory: "",
  productImages: [],
};

const ProductForm = ({ initial = initialData, onSubmit }) => {
  const [formData, setFormData] = useState(initial);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [imagesPreview, setImagesPreview] = useState([]);
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
    createCategory,
  } = useCategories();
  const {
    createProduct,
    loading: productLoading,
    error: productError,
  } = useProducts();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "productThumbnail") {
      setFormData({ ...formData, productThumbnail: files[0] });
      setThumbnailPreview(files[0] ? URL.createObjectURL(files[0]) : null);
    } else if (name === "productImages") {
      setFormData({ ...formData, productImages: Array.from(files) });
      setImagesPreview(
        files ? Array.from(files).map((file) => URL.createObjectURL(file)) : []
      );
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    debugger;
    e.preventDefault();
    let formDataToSubmit = new FormData();
    formDataToSubmit.append("product_name", formData.productName);
    formDataToSubmit.append("product_price", formData.productPrice);
    formDataToSubmit.append("product_like_count", formData.productLikeCount);
    formDataToSubmit.append("category", formData.productCategory);
    if (formData.productThumbnail) {
      formDataToSubmit.append("thumbnail", formData.productThumbnail);
    }
    if (formData.productImages && formData.productImages.length > 0) {
      formData.productImages.forEach((image, idx) => {
        formDataToSubmit.append("images", image);
      });
    }

    // Log form data for debugging
    for (let pair of formDataToSubmit.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      await createProduct(formDataToSubmit);
      if (onSubmit) {
        onSubmit();
      }
      setFormData(initial); // Reset form data after submission
      setThumbnailPreview(null); // Reset thumbnail preview
      setImagesPreview([]); // Reset images preview
      Swal.fire({
        icon: "success",
        title: "Product Created",
        text: "Your product has been created successfully.",
      });
    } catch (error) {
      console.error("Error creating product:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an error creating the product.",
      });
      return;
    }
  };
  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-[#4B2E2E] mb-6 text-center">
        Create Product
      </h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
        encType="multipart/form-data"
      >
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="productName"
          >
            Name
          </label>
          <input
            type="text"
            name="productName"
            id="productName"
            value={formData.productName}
            onChange={handleChange}
            required
            className="mt-1 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 text-[#4B2E2E]"
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="productPrice"
          >
            Price
          </label>
          <input
            type="number"
            name="productPrice"
            id="productPrice"
            value={formData.productPrice}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="mt-1 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 text-[#4B2E2E]"
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="productLikeCount"
          >
            Like Count
          </label>
          <input
            type="number"
            name="productLikeCount"
            id="productLikeCount"
            value={formData.productLikeCount}
            onChange={handleChange}
            min="0"
            className="mt-1 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 text-[#4B2E2E]"
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="productCategory"
          >
            Category
          </label>
          <select
            name="productCategory"
            id="productCategory"
            value={formData.productCategory}
            onChange={handleChange}
            required
            className="mt-1 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 text-[#4B2E2E]"
          >
            <option value="">Select a category</option>
            {categoriesLoading ? (
              <option disabled>Loading...</option>
            ) : (
              categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.category_name}
                </option>
              ))
            )}
          </select>
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="productThumbnail"
          >
            Thumbnail (1 image)
          </label>
          <input
            type="file"
            name="productThumbnail"
            id="productThumbnail"
            accept="image/*"
            onChange={handleChange}
            className="mt-1 w-full"
          />
          {thumbnailPreview && (
            <img
              src={thumbnailPreview}
              alt="Thumbnail Preview"
              className="mt-2 h-24 object-contain rounded"
            />
          )}
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="productImages"
          >
            Product Images (multiple)
          </label>
          <input
            type="file"
            name="productImages"
            id="productImages"
            accept="image/*"
            multiple
            onChange={handleChange}
            className="mt-1 w-full"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {imagesPreview.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Product Preview ${idx + 1}`}
                className="h-16 object-contain rounded"
              />
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-[#4B2E2E] font-semibold px-4 py-2 rounded-full"
          disabled={productLoading}
        >
          {productLoading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
