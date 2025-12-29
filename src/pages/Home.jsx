import React from 'react';
import { Link } from 'react-router-dom';
import products from '../data/products'; // IMPORT DES PRODUITS

const Home = () => {
  // Produits en vedette (ex: 3 premiers)
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="container">

      {/* ===== HERO / PRESENTATION ===== */}
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h1>Bienvenue sur Ma Boutique</h1>
        <p style={{ fontSize: '18px', color: '#64748b', marginBottom: '40px' }}>
          Découvrez nos produits de qualité à des prix abordables.
          Livraison rapide et sécurisée.
        </p>
        <Link to="/products" className="btn">
          Voir nos produits
        </Link>
      </div>

      {/* ===== AVANTAGES ===== */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '30px',
          marginBottom: '80px',
        }}
      >
        <div className="card">
          <div className="card-content" style={{ textAlign: 'center' }}>
            <h3>Qualité Garantie</h3>
            <p>
              Nous sélectionnons uniquement des produits de haute qualité
              auprès de fournisseurs fiables.
            </p>
          </div>
        </div>

        <div className="card">
          <div className="card-content" style={{ textAlign: 'center' }}>
            <h3>Livraison Rapide</h3>
            <p>
              Profitez d'une livraison rapide et sécurisée avec suivi en temps réel.
            </p>
          </div>
        </div>

        <div className="card">
          <div className="card-content" style={{ textAlign: 'center' }}>
            <h3>Service Client</h3>
            <p>
              Notre équipe est disponible pour vous accompagner à tout moment.
            </p>
          </div>
        </div>
      </div>

      {/* ===== PRODUITS VEDETTES ===== */}
      <section>
        <h2 style={{ marginBottom: '20px' }}>Produits en vedette</h2>

        <div className="product-grid">
          {featuredProducts.map(product => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} />

              <div className="card-content">
                <h3>{product.name}</h3>
                <p>{product.price} CDF</p>

                <Link to="/products" className="btn">
                  Voir le produit
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};


export default Home;
