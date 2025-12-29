import React from 'react';

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="product-card card">
      <img src={product.image} alt={product.name} />
      <div className="card-content">
        <h3>{product.name}</h3>
        <p>{product.price} CDF</p>
        <button className="btn" onClick={() => addToCart(product)}>Ajouter au panier</button>
      </div>
    </div>
  );
};

export default ProductCard;