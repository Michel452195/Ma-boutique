import { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../firebase';

// Fonctions pour gérer le panier dans Firestore

// Récupérer le panier d'un utilisateur
export const getUserCart = async (userId) => {
  try {
    const cartRef = doc(db, 'carts', userId);
    const cartSnap = await getDoc(cartRef);

    if (cartSnap.exists()) {
      return cartSnap.data().items || [];
    } else {
      // Créer un panier vide pour le nouvel utilisateur
      await setDoc(cartRef, { items: [] });
      return [];
    }
  } catch (error) {
    console.error('Erreur lors de la récupération du panier:', error);
    return [];
  }
};

// Sauvegarder le panier d'un utilisateur
export const saveUserCart = async (userId, cart) => {
  try {
    const cartRef = doc(db, 'carts', userId);
    await setDoc(cartRef, { items: cart }, { merge: true });
  } catch (error) {
    console.error('Erreur lors de la sauvegarde du panier:', error);
  }
};

// Ajouter un produit au panier
export const addToUserCart = async (userId, product) => {
  try {
    const cartRef = doc(db, 'carts', userId);
    const cartSnap = await getDoc(cartRef);
    let currentCart = [];

    if (cartSnap.exists()) {
      currentCart = cartSnap.data().items || [];
    }

    // Vérifier si le produit existe déjà
    const existingIndex = currentCart.findIndex(item => item.id === product.id);

    if (existingIndex >= 0) {
      // Augmenter la quantité
      currentCart[existingIndex].quantity += 1;
    } else {
      // Ajouter le nouveau produit
      currentCart.push({ ...product, quantity: 1 });
    }

    await setDoc(cartRef, { items: currentCart }, { merge: true });
    return currentCart;
  } catch (error) {
    console.error('Erreur lors de l\'ajout au panier:', error);
    throw error;
  }
};

// Mettre à jour la quantité d'un produit
export const updateCartItemQuantity = async (userId, productId, quantity) => {
  try {
    const cartRef = doc(db, 'carts', userId);
    const cartSnap = await getDoc(cartRef);

    if (cartSnap.exists()) {
      let currentCart = cartSnap.data().items || [];
      const itemIndex = currentCart.findIndex(item => item.id === productId);

      if (itemIndex >= 0) {
        if (quantity <= 0) {
          // Supprimer l'article si quantité <= 0
          currentCart.splice(itemIndex, 1);
        } else {
          currentCart[itemIndex].quantity = quantity;
        }

        await setDoc(cartRef, { items: currentCart }, { merge: true });
        return currentCart;
      }
    }
    return [];
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la quantité:', error);
    throw error;
  }
};

// Supprimer un produit du panier
export const removeFromUserCart = async (userId, productId) => {
  try {
    const cartRef = doc(db, 'carts', userId);
    const cartSnap = await getDoc(cartRef);

    if (cartSnap.exists()) {
      let currentCart = cartSnap.data().items || [];
      currentCart = currentCart.filter(item => item.id !== productId);

      await setDoc(cartRef, { items: currentCart }, { merge: true });
      return currentCart;
    }
    return [];
  } catch (error) {
    console.error('Erreur lors de la suppression du panier:', error);
    throw error;
  }
};

// Vider le panier
export const clearUserCart = async (userId) => {
  try {
    const cartRef = doc(db, 'carts', userId);
    await setDoc(cartRef, { items: [] }, { merge: true });
  } catch (error) {
    console.error('Erreur lors du vidage du panier:', error);
  }
};