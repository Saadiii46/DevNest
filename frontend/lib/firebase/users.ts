"use client";

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googlepProvider } from "./firebase";

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
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
    await sendEmailVerification(user);
    const idToken = await user.getIdToken();

    await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, email, idToken }),
    });

    return { success: true };
  } catch (error) {
    let message = "Something went wrong";

    switch ((error as { code: string }).code) {
      case "auth/email-already-in-use":
        message = "The email you entered is alreadye exist try logging in";
    }
    return {
      success: false,
      error: message,
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

    const res = await fetch("/api/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    });

    const data = await res.json();

    if (!res.ok || res.status === 403) {
      return { success: false, error: data.error };
    }

    return { success: true, email: user.email, fullName: user.displayName };
  } catch (error) {
    console.log("Error", error);
    let message = "Something went wrong";

    switch ((error as { code: string }).code) {
      case "auth/invalid-credential":
        message = "Invalid email or password";
        break;
    }

    return {
      success: false,
      error: message,
      code: (error as { code: string }).code,
    };
  }
};

export const getCurrentUser = () => {
  try {
    const user = auth.currentUser;

    if (!user) throw new Error("No user logged in");

    return {
      success: true,
      id: user.uid,
      email: user.email,
      fullName: user.displayName,
    };
  } catch (error) {
    return {
      success: false,
      error: (error as { message: string }).message,
      code: (error as { code: string }).code,
    };
  }
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

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googlepProvider);

    const user = result.user;
    const idToken = await user.getIdToken();

    await fetch("/api/auth/google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idToken }),
    });

    const userData = {
      id: user.uid,
      email: user.email,
      fullName: user.displayName,
    };

    return { success: true, userData };
  } catch (error) {
    return { success: false, error: (error as { message: string }).message };
  }
};
