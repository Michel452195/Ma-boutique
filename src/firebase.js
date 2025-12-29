import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBmM1SUTUEtQQpwP-4ZLPDeRSHha7v71-o",
  authDomain: "boutique-react.firebaseapp.com",
  projectId: "boutique-react",
  storageBucket: "boutique-react.appspot.com",
  messagingSenderId: "573167850630",
  appId: "1:573167850630:web:009b360e5d65ad6e84ad07"
};

// Initialisation Firebase
const app = initializeApp(firebaseConfig);

// Authentification
export const auth = getAuth(app);

// Base de données Firestore
export const db = getFirestore(app);

export default app;