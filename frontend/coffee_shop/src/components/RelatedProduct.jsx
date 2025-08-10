import React, { useEffect, useState } from "react";
import ProductCard from "../components/cards/ProductCard";
import useProducts from "../hooks/useProduct";

const RelatedProductsCarousel = ({ productId }) => {
  const [categoryId, setCategoryId] = useState(null);
  const [filters, setFilters] = useState(undefined);
  // Call useProducts once at the top level
  const { products, loading, getCategoryId } = useProducts(filters);

  useEffect(() => {
    const fetchCategory = async () => {
      const category = await getCategoryId(productId);
      if (category && category.id) {
        setCategoryId(category.id);
        setFilters({ category: category.id });
      } else {
        setCategoryId(null);
        setFilters(undefined);
      }
    };
    if (productId) fetchCategory();
  }, [productId]);
  debugger;
  const relatedProducts = products ? products.filter((p) => String(p.id) !== String(productId)) : [];
  debugger;
  return (
    <div className="mt-16">
      <h3 className="text-2xl font-bold text-[#4B2E2E] mb-4">
        Related Products
      </h3>
      {loading ? (
        <div>Loading related products...</div>
      ) : (
        <div className="overflow-x-auto">
          <div className="flex gap-6 w-max">
            {relatedProducts.length === 0 ? (
              <div>No related products found.</div>
            ) : (
              relatedProducts.map((product) => (
                <div key={product.id} className="min-w-[220px]">
                  <ProductCard product={product} />
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RelatedProductsCarousel;
