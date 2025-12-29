import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaTiktok, FaYoutube } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

const About = () => {
  return (
    <div className="container" style={{ padding: '50px 20px', maxWidth: '900px', margin: '0 auto' }}>
      <h1>À propos de Ma Boutique</h1>

      <div style={{ lineHeight: '1.8', marginTop: '20px' }}>
        <p>
          Bienvenue chez <strong>Ma Boutique</strong>, votre destination de confiance pour des produits de qualité supérieure.
          Depuis notre création, nous nous engageons à offrir à nos clients une expérience d'achat exceptionnelle
          avec des produits soigneusement sélectionnés et un service client irréprochable.
        </p>

        <h2>Nos Valeurs</h2>
        <ul>
          <li><strong>Qualité :</strong> Produits soigneusement sélectionnés auprès de fournisseurs fiables.</li>
          <li><strong>Confiance :</strong> Votre satisfaction et la sécurité de vos données sont notre priorité.</li>
          <li><strong>Livraison :</strong> Livraison rapide et sécurisée à Goma et partout où nous livrons.</li>
        </ul>

        <h2>Notre Engagement</h2>
        <p>
          Chez <strong>Ma Boutique</strong>, nous croyons que l'achat en ligne doit être simple, sécurisant et agréable.
          Notre équipe travaille chaque jour pour vous proposer les meilleurs produits au meilleur prix.
        </p>

        <h2>Contactez-nous</h2>
        <p>Vous pouvez nous joindre facilement via :</p>

        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FaPhoneAlt color="#1a73e8" /> 
            <a href="tel:+24382122119" style={{ color: '#1a73e8' }}>082122119 (Téléphone & WhatsApp)</a>
          </li>
          <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FaEnvelope color="#1a73e8" /> 
            <a href="mailto:katchuvamichael@gmail.com" style={{ color: '#1a73e8' }}>katchuvamichael@gmail.com</a>
          </li>
          <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FcGoogle size={20} /> 
            <a href="mailto:katchuvamichael@gmail.com" style={{ color: '#1a73e8' }}>Se connecter via Google</a>
          </li>
          <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FaTiktok color="#000" /> 
            <a href="https://www.tiktok.com/@maxdrem4" target="_blank" rel="noopener noreferrer" style={{ color: '#1a73e8' }}>
              @maxdrem4
            </a>
          </li>
          <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FaYoutube color="#FF0000" /> 
            <a href="https://www.youtube.com/@michaelkatchuva" target="_blank" rel="noopener noreferrer" style={{ color: '#1a73e8' }}>
              @michaelkatchuva
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default About;
