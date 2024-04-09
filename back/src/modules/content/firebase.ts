import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_KEY,
  authDomain: process.env.VITE_FIREBASE_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT,
  storageBucket: process.env.VITE_FIREBASE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_SENDER,
  appId: process.env.VITE_FIREBASE_APP,
  measurementId: process.env.VITE_FIREBASE_MEASUREMENT,
};

export const firebase = initializeApp(firebaseConfig);
