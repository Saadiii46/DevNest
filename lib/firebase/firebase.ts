// firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCgbjTRBLT5lVURxbntI88FoBOFT3rOaNc",
  authDomain: "devnest-22758.firebaseapp.com",
  projectId: "devnest-22758",
  storageBucket: "devnest-22758.firebasestorage.app",
  messagingSenderId: "784321136771",
  appId: "1:784321136771:web:dc470b18e36e07f773f3b6",
  measurementId: "G-FTB9VTB2FS",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
