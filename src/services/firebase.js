import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Firebase configuration — hardcoded for reliability.
// These are public client-side credentials (safe to commit for a PWA).
const firebaseConfig = {
  apiKey: "AIzaSyAqjuwqlduUvP2tgCVAc9lj2PfwqGJWj6I",
  authDomain: "arenaassist-efb22.firebaseapp.com",
  projectId: "arenaassist-efb22",
  storageBucket: "arenaassist-efb22.firebasestorage.app",
  messagingSenderId: "106646052461",
  appId: "1:106646052461:web:fdc91cff4cdf7577dc2964"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
