"use client";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
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
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

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
