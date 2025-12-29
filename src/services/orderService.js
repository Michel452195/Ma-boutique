import { collection, addDoc, query, where, getDocs, orderBy, limit, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

// Fonctions pour gérer les commandes dans Firestore

// Sauvegarder une commande
export const saveOrder = async (userId, orderData) => {
  try {
    const ordersRef = collection(db, 'orders');
    const order = {
      userId,
      ...orderData,
      createdAt: new Date(),
      status: 'confirmed'
    };

    const docRef = await addDoc(ordersRef, order);
    return docRef.id;
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de la commande:', error);
    throw error;
  }
};

// Récupérer les commandes d'un utilisateur
export const getUserOrders = async (userId) => {
  try {
    const ordersRef = collection(db, 'orders');
    const q = query(
      ordersRef,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(50)
    );

    const querySnapshot = await getDocs(q);
    const orders = [];

    querySnapshot.forEach((doc) => {
      orders.push({
        id: doc.id,
        ...doc.data()
      });
    });

    return orders;
  } catch (error) {
    console.error('Erreur lors de la récupération des commandes:', error);
    return [];
  }
};

// Récupérer une commande spécifique
export const getOrder = async (orderId) => {
  try {
    const orderRef = doc(db, 'orders', orderId);
    const orderSnap = await getDoc(orderRef);

    if (orderSnap.exists()) {
      return {
        id: orderSnap.id,
        ...orderSnap.data()
      };
    } else {
      throw new Error('Commande non trouvée');
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de la commande:', error);
    throw error;
  }
};