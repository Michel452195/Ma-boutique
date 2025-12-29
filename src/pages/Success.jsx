import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getOrder } from '../services/orderService';

const Success = () => {
  const [searchParams] = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState('loading');
  const [orderData, setOrderData] = useState(null);

  const orderId = searchParams.get('orderId');

  useEffect(() => {
    if (orderId) {
      fetchOrder();
    } else {
      setPaymentStatus('error');
    }
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const order = await getOrder(orderId);
      setOrderData(order);
      setPaymentStatus('completed');
    } catch (error) {
      console.error('Erreur lors de la récupération de la commande:', error);
      setPaymentStatus('error');
    }
  };

  if (paymentStatus === 'loading') {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '50px' }}>
        <h1>Vérification du paiement...</h1>
        <p>Veuillez patienter pendant que nous confirmons votre paiement.</p>
        <div style={{ margin: '20px 0' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #1a73e8',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto'
          }}></div>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (paymentStatus === 'pending') {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '50px' }}>
        <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
          <div className="card-content">
            <h2>⏳ Paiement en cours de traitement</h2>
            <p>Votre paiement est en cours de vérification. Cela peut prendre quelques instants.</p>
            <button onClick={checkPaymentStatus} className="btn" style={{ marginTop: '20px' }}>
              Vérifier à nouveau
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (paymentStatus === 'error') {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '50px' }}>
        <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
          <div className="card-content">
            <h2>❌ Erreur de paiement</h2>
            <p>Une erreur s'est produite lors du traitement de votre paiement.</p>
            <p>Si le problème persiste, contactez notre support.</p>
            <Link to="/cart" className="btn" style={{ marginTop: '20px' }}>
              Retour au panier
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Commande réussie
  return (
    <div className="container" style={{ textAlign: 'center', padding: '50px' }}>
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="card-content">
          <h2>✅ Paiement réussi !</h2>
          <p>Félicitations ! Votre commande a été traitée avec succès.</p>

          {orderData && (
            <div style={{ marginTop: '30px', textAlign: 'left' }}>
              <h3>Détails de la commande</h3>
              <p><strong>Référence de commande :</strong> {orderId}</p>
              <p><strong>Montant payé :</strong> {orderData.total} CDF</p>
              <p><strong>Méthode :</strong> {orderData.paymentInfo?.method || 'Aucun'}</p>

              <div style={{ marginTop: '20px' }}>
                <h4>Articles commandés :</h4>
                {orderData.items?.map((item, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px 0',
                    borderBottom: '1px solid #eee'
                  }}>
                    <span>{item.name} x {item.quantity}</span>
                    <span>{item.price * item.quantity} CDF</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ marginTop: '30px' }}>
            <p>Un email de confirmation vous a été envoyé avec les détails de votre commande.</p>
            <Link to="/" className="btn" style={{ marginTop: '20px' }}>
              Continuer mes achats
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;