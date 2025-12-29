import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import { FcGoogle } from 'react-icons/fc'; // Icône Google
import { FaFacebookF, FaTiktok, FaYoutube } from 'react-icons/fa'; // autres icônes

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        alert('Connexion réussie !');
      } else {
        await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        alert('Inscription réussie !');
      }
      navigate('/');
    } catch (error) {
      console.error('Erreur d\'authentification:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Connexion avec Google
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert('Connexion avec Google réussie !');
      navigate('/');
    } catch (error) {
      console.error('Erreur Google Auth:', error);
      setError(error.message);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '400px', margin: '50px auto' }}>
      <div className="card">
        <div className="card-content">
          <h2>{isLogin ? 'Connexion' : 'Inscription'}</h2>
          {error && <p style={{ color: 'red', marginBottom: '20px' }}>{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label>Mot de passe</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            <button type="submit" className="btn" style={{ width: '100%' }} disabled={loading}>
              {loading ? 'Chargement...' : (isLogin ? 'Se connecter' : 'S\'inscrire')}
            </button>
          </form>

          {/* Séparation */}
          <p style={{ textAlign: 'center', margin: '20px 0', color: '#666' }}>ou</p>

          {/* Boutons réseaux sociaux */}
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
            <button
              onClick={handleGoogleLogin}
              className="btn"
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <FcGoogle size={24} /> Google
            </button>
            <button
              className="btn btn-secondary"
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <FaFacebookF size={20} color="#1877F2" /> Facebook
            </button>
            <button
              className="btn btn-secondary"
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <FaTiktok size={20} color="#000" /> TikTok
            </button>
            <button
              className="btn btn-secondary"
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <FaYoutube size={20} color="#FF0000" /> YouTube
            </button>
          </div>

          <p style={{ textAlign: 'center', marginTop: '20px' }}>
            {isLogin ? 'Pas de compte ?' : 'Déjà un compte ?'}
            <button
              onClick={() => setIsLogin(!isLogin)}
              style={{ background: 'none', border: 'none', color: '#1a73e8', cursor: 'pointer', marginLeft: '5px' }}
              disabled={loading}
            >
              {isLogin ? 'S\'inscrire' : 'Se connecter'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
