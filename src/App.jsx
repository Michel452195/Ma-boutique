import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { getUserCart, saveUserCart, addToUserCart, updateCartItemQuantity, removeFromUserCart, clearUserCart } from './services/cartService';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import Orders from './pages/Orders';

const App = () => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Écouter les changements d'état d'authentification
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // Charger le panier depuis Firestore pour l'utilisateur connecté
        const userCart = await getUserCart(currentUser.uid);
        setCart(userCart);
      } else {
        // Vider le panier si déconnecté
        setCart([]);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Sauvegarder le panier dans Firestore quand il change (seulement si utilisateur connecté)
  useEffect(() => {
    if (user && cart.length >= 0) {
      saveUserCart(user.uid, cart);
    }
  }, [cart, user]);

  // Fonction pour ajouter un produit au panier
  const addToCart = async (product) => {
    if (!user) {
      alert('Veuillez vous connecter pour ajouter des produits au panier.');
      return;
    }

    try {
      const updatedCart = await addToUserCart(user.uid, product);
      setCart(updatedCart);
    } catch (error) {
      alert('Erreur lors de l\'ajout au panier. Veuillez réessayer.');
    }
  };

  // Fonction pour mettre à jour la quantité d'un produit
  const updateQuantity = async (id, quantity) => {
    if (!user) return;

    try {
      const updatedCart = await updateCartItemQuantity(user.uid, id, quantity);
      setCart(updatedCart);
    } catch (error) {
      alert('Erreur lors de la mise à jour. Veuillez réessayer.');
    }
  };

  // Fonction pour supprimer un produit du panier
  const removeFromCart = async (id) => {
    if (!user) return;

    try {
      const updatedCart = await removeFromUserCart(user.uid, id);
      setCart(updatedCart);
    } catch (error) {
      alert('Erreur lors de la suppression. Veuillez réessayer.');
    }
  };

  return (
    <Router>
      <div className="app">
        <Header user={user} />
        <main className="main-content">
          {loading ? (
            <div className="container" style={{ textAlign: 'center', padding: '50px' }}>
              <p>Chargement...</p>
            </div>
          ) : (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products addToCart={addToCart} />} />
              <Route path="/cart" element={
                <ProtectedRoute user={user}>
                  <Cart cart={cart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />
                </ProtectedRoute>
              } />
              <Route path="/checkout" element={
                <ProtectedRoute user={user}>
                  <Checkout cart={cart} setCart={setCart} />
                </ProtectedRoute>
              } />
              <Route path="/orders" element={
                <ProtectedRoute user={user}>
                  <Orders />
                </ProtectedRoute>
              } />
              <Route path="/login" element={<Login />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          )}
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;