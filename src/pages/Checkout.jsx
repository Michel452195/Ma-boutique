import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { saveOrder } from '../services/orderService';

const Checkout = ({ cart, setCart }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleConfirmOrder = async () => {
    if (!auth.currentUser) {
      alert('Veuillez vous connecter pour confirmer la commande.');
      navigate('/login');
      return;
    }

    setIsProcessing(true);

    try {
      const orderData = {
        items: cart,
        total,
        paymentInfo: { method: 'none' },
        status: 'confirmed'
      };

      const orderId = await saveOrder(auth.currentUser.uid, orderData);

      // Vider le panier local
      setCart([]);

      // Aller à la page de succès avec l'ID de commande
      navigate(`/success?orderId=${orderId}`);
    } catch (error) {
      console.error('Erreur lors de la création de la commande :', error);
      alert('Impossible de créer la commande. Réessayez.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container">
      <h1>Paiement</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px', marginTop: '30px' }}>
        {/* Récapitulatif du panier */}
        <div className="card">
          <div className="card-content">
            <h2>Récapitulatif de la commande</h2>
            {cart.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span>{item.name} x {item.quantity}</span>
                <span>{item.price * item.quantity} CDF</span>
              </div>
            ))}
            <hr style={{ margin: '20px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '18px' }}>
              <span>Total</span>
              <span>{total} CDF</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
            <h2>Confirmation de la commande</h2>
            <p style={{ color: '#666', marginBottom: '20px' }}>
              En confirmant la commande, celle-ci sera créée sans étape de paiement.
            </p>

            <button
              onClick={handleConfirmOrder}
              className="btn"
              style={{ width: '100%', marginTop: '20px' }}
              disabled={isProcessing}
            >
              {isProcessing ? 'Création de la commande...' : `Confirmer la commande (${total} CDF)`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;