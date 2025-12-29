import React from 'react';
import ProductCard from '../components/ProductCard';
import products from '../data/products';

const Products = ({ addToCart }) => {
  return (
    <div className="container">
      <h1>Nos Produits</h1>
      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};

export default Products;