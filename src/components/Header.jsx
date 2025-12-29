import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Header = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">Ma Boutique</Link>
        <nav className="nav">
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/products">Produits</Link></li>
            <li><Link to="/cart">Panier</Link></li>
            <li><Link to="/about">À propos</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            {user ? (
              <>
                <li><Link to="/orders">Mes Commandes</Link></li>
                <li><button onClick={handleLogout} className="btn btn-secondary">Déconnexion</button></li>
              </>
            ) : (
              <li><Link to="/login" className="btn">Connexion</Link></li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;