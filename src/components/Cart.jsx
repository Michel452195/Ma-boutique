import React from 'react';

const Cart = ({ cart, updateQuantity, removeFromCart }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container" style={{ padding: '20px' }}>
      <h2>Panier</h2>
      {cart.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <div>
          {cart.map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ddd', padding: '10px 0' }}>
              <div>
                <h4>{item.name}</h4>
                <p>{item.price} x {item.quantity} CDF</p>
              </div>
              <div>
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                <button className="btn-secondary" onClick={() => removeFromCart(item.id)} style={{ marginLeft: '10px' }}>Supprimer</button>
              </div>
            </div>
          ))}
          <h3>Total: {total} CDF</h3>
        </div>
      )}
    </div>
  );
};

export default Cart;