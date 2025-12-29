import React from 'react';
import { FaArrowUp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">

        {/* Section Boutique */}
        <div className="footer-section">
          <h4>Ma Boutique</h4>
          <p>Votre boutique de chaussures, vêtements et T-shirts à Goma</p>
        </div>

        {/* Section NAVIGUER */}
        <div className="footer-section">
          <h4>NAVIGUER</h4>
          <ul>
            <li><a href="#">Accueil</a></li>
            <li><a href="#">Produits</a></li>
            <li><a href="#">Panier</a></li>
            <li><a href="#">À propos</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        {/* Section MON COMPTE */}
        <div className="footer-section">
          <h4>MON COMPTE</h4>
          <ul>
            <li><a href="#">Mes Commandes</a></li>
            <li><a href="#">Connexion</a></li>
            <li><a href="#">Déconnexion</a></li>
          </ul>
        </div>

        {/* Section LEGAL */}
        <div className="footer-section">
          <h4>LEGAL</h4>
          <ul>
            <li><a href="#">Conditions</a></li>
            <li><a href="#">Confidentialité</a></li>
            <li><a href="#">Politique de retour</a></li>
          </ul>
        </div>

      </div>

      {/* Footer bas */}
      <div className="footer-bottom">
        <p>Français</p>
        <p>Copyright © kachuva kambya michel</p>
        <a href="#top" className="back-to-top"><FaArrowUp /> HAUT</a>
      </div>
    </footer>
  );
};

export default Footer;
