"use server";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { handleError } from "../handleError";

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

    return { success: true, email: user.email };
  } catch (error) {
    handleError(error);
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

    return { success: true, email: user.email };
  } catch (error) {
    handleError(error);
  }
};
