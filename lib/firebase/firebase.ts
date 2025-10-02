// firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Validate required environment variables
const requiredEnvVars = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Check for missing environment variables
const missingVars = Object.entries(requiredEnvVars)
  .filter(([key, value]) => !value)
  .map(([key]) => `NEXT_PUBLIC_FIREBASE_${key.toUpperCase()}`);

if (missingVars.length > 0) {
  throw new Error(
    `Missing required Firebase environment variables: ${missingVars.join(', ')}\n\n` +
    'Please create a .env.local file in your project root with the following variables:\n' +
    missingVars.map(varName => `${varName}=your_value_here`).join('\n') +
    '\n\nYou can find these values in your Firebase Console > Project Settings > General > Your apps'
  );
}

const firebaseConfig = {
  apiKey: requiredEnvVars.apiKey,
  authDomain: requiredEnvVars.authDomain,
  projectId: requiredEnvVars.projectId,
  storageBucket: requiredEnvVars.storageBucket,
  messagingSenderId: requiredEnvVars.messagingSenderId,
  appId: requiredEnvVars.appId,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID, // Optional
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Debug: Log Firebase initialization
console.log(" Firebase initialized successfully");
console.log("Firebase config:", {
  apiKey: firebaseConfig.apiKey ? " Set" : " Missing",
  authDomain: firebaseConfig.authDomain ? " Set" : " Missing",
  projectId: firebaseConfig.projectId ? " Set" : " Missing",
  storageBucket: firebaseConfig.storageBucket ? " Set" : " Missing",
  messagingSenderId: firebaseConfig.messagingSenderId ? " Set" : " Missing",
  appId: firebaseConfig.appId ? " Set" : " Missing",
});
