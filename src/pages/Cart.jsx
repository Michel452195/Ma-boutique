import React from 'react';
import { Link } from 'react-router-dom';

const Cart = ({ cart, updateQuantity, removeFromCart }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container">
      <h1>Panier</h1>
      {cart.length === 0 ? (
        <p style={{ textAlign: 'center', padding: '50px' }}>Votre panier est vide.</p>
      ) : (
        <div>
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <h4>{item.name}</h4>
                <p>{item.price} CDF chacun</p>
              </div>
              <div className="quantity-controls">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
              <div>
                <p style={{ fontWeight: 'bold' }}>{item.price * item.quantity} CDF</p>
                <button className="btn btn-danger" onClick={() => removeFromCart(item.id)} style={{ marginTop: '10px' }}>Supprimer</button>
              </div>
            </div>
          ))}
          <div style={{ textAlign: 'right', marginTop: '30px', padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
            <h3>Total: {total} CDF</h3>
            <Link to="/checkout" className="btn" style={{ marginTop: '15px' }}>Confirmer la commande</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;