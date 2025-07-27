import React from 'react'

/* Components */
import ProductDetail from '../components/ProductDetail'
import ProductTab from '../components/ProductTab'
import RelatedProduct from '../components/RelatedProduct'

const ProductPage = () => {
  return (
    <div>
      <main className="flex-grow pt-20 px-4 py-8 max-w-7xl mx-auto">
        <ProductDetail />
        <ProductTab />
        <RelatedProduct />
      </main>
    </div>
  )
}

export default ProductPage