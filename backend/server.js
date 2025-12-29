const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Firebase Admin pour Firestore côté serveur
const admin = require('firebase-admin');

// Configuration Firebase Admin
let db = null;
try {
  // Utiliser le fichier JSON directement pour éviter les erreurs de parsing
  const serviceAccount = require('./boutique-react-firebase-adminsdk.json');

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  db = admin.firestore();
  console.log('✅ Firebase Admin initialisé avec succès');
} catch (error) {
  console.warn('⚠️ Erreur Firebase Admin (mode test):', error.message);
  console.log('🔧 Le serveur fonctionnera en mode test sans persistance Firestore');
}

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());

// Fonction pour générer un ID de transaction unique
function generateTransactionId() {
  return 'TXN_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// NOTE: La fonctionnalité de paiement a été retirée.
// Le backend conserve uniquement les parties utiles (initialisation Firebase, route de santé).

// Route de santé pour vérifier que le serveur fonctionne
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Serveur backend opérationnel',
    timestamp: new Date().toISOString()
  });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur backend démarré sur le port ${PORT}`);
  console.log(`📱 Frontend URL: ${process.env.FRONTEND_URL}`);
  // Les routes de paiement et webhooks ont été retirées
});