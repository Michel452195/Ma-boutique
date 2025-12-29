import React from 'react';
import { Navigate } from 'react-router-dom';

// Composant pour protéger les routes nécessitant une authentification
const ProtectedRoute = ({ user, children }) => {
  // Si non connecté, rediriger vers la page de login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Sinon, afficher le composant enfant
  return children;
};

export default ProtectedRoute;