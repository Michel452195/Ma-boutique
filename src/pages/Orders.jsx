import React, { useState, useEffect } from 'react';
import { getUserOrders } from '../services/orderService';
import { auth } from '../firebase';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (auth.currentUser) {
        try {
          const userOrders = await getUserOrders(auth.currentUser.uid);
          setOrders(userOrders);
        } catch (error) {
          console.error('Erreur lors du chargement des commandes:', error);
        }
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '50px' }}>
        <p>Chargement de vos commandes...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Mes Commandes</h1>

      {orders.length === 0 ? (
        <p style={{ textAlign: 'center', padding: '50px' }}>Vous n'avez pas encore passé de commande.</p>
      ) : (
        <div>
          {orders.map(order => (
            <div key={order.id} className="card" style={{ marginBottom: '20px' }}>
              <div className="card-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <h3>Commande #{order.id.slice(-8)}</h3>
                  <span style={{
                    padding: '5px 10px',
                    borderRadius: '4px',
                    backgroundColor: order.status === 'confirmed' ? '#d4edda' : '#f8d7da',
                    color: order.status === 'confirmed' ? '#155724' : '#721c24',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    {order.status === 'confirmed' ? 'Confirmée' : order.status}
                  </span>
                </div>

                <p style={{ color: '#666', fontSize: '14px', marginBottom: '15px' }}>
                  Date : {order.createdAt?.toDate?.()?.toLocaleDateString('fr-FR') || 'N/A'}
                </p>

                <div style={{ marginBottom: '15px' }}>
                  <h4>Articles :</h4>
                  {order.items?.map(item => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid #eee' }}>
                      <span>{item.name} x {item.quantity}</span>
                      <span>{item.price * item.quantity} CDF</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '18px' }}>
                  <span>Total</span>
                  <span>{order.total || 0} CDF</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;