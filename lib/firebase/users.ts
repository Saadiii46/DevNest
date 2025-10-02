"use client";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

interface SignUpUserProps {
  fullName: string;
  email: string;
  password: string;
}

interface SignInUserProps {
  email: string;
  password: string;
}

export const signUpUsers = async ({
  fullName,
  email,
  password,
}: SignUpUserProps) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Set displayName in Firebase Auth
    await updateProfile(user, { displayName: fullName });

    // Save user info in Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      fullName: fullName,
      role: "user",
      createdAt: serverTimestamp(),
    });

    return { success: true, email: user.email, fullName: user.displayName };
  } catch (error) {
    return {
      success: false,
      error: (error as { message: string }).message,
      code: (error as { code: string }).code,
    };
  }
};

export const signInUsers = async ({ email, password }: SignInUserProps) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
    const idToken = await user.getIdToken();

    await fetch("/api/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    });

    console.log("ID Token:", idToken);

    return { success: true, email: user.email, fullName: user.displayName };
  } catch (error) {
    console.log("Error", error);
    let message = "Something went wrong";

    switch ((error as { code: string }).code) {
      case "auth/invalid-credential":
        message = "invalid email or password";
        break;
    }

    return {
      success: false,
      error: message,
      code: (error as { code: string }).code,
    };
  }
};

// lib/firebase/users.ts
export const getCurrentUser = (): Promise<{
  id?: string;
  email?: string | null;
  fullName?: string | null;
}> => {
  return new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe(); // stop listening after first event
      if (user) {
        resolve({
          id: user.uid,
          email: user.email ?? null,
          fullName: user.displayName ?? "User",
        });
      } else {
        resolve({ email: null, fullName: null });
      }
    });
  });
};






export const signOutUser = async () => {
  try {
    await signOut(auth);

    await fetch("/api/session", { method: "DELETE" });

    console.log("user signed out");

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: (error as { message: string }).message,
    };
  }
};
