// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Firebase configuration — values baked in at build time via Vite env vars.
// Hardcoded fallbacks ensure the app works even if env injection fails.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAqjuwqlduUvP2tgCVAc9lj2PfwqGJWj6I",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "arenaassist-efb22.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "arenaassist-efb22",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "arenaassist-efb22.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "106646052461",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:106646052461:web:fdc91cff4cdf7577dc2964"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const auth = getAuth(app);
