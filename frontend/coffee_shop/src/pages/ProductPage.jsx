import React from "react";
import { useParams } from "react-router-dom";

/* Components */
import ProductDetail from "../components/ProductDetail";
import ProductTab from "../components/ProductTab";
import RelatedProduct from "../components/RelatedProduct";

const ProductPage = () => {
  const { id } = useParams();

  return (
    <div>
      <main className="flex-grow pt-20 px-4 py-8 max-w-7xl mx-auto">
        <ProductDetail productId={id} />
        <ProductTab productId={id} />
        <RelatedProduct productId={id} />
      </main>
    </div>
  );
};

export default ProductPage;
