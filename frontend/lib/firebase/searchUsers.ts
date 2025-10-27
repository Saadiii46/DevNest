import {
  collection,
  endAt,
  getDocs,
  limit,
  orderBy,
  query,
  startAt,
  where,
} from "firebase/firestore";
import { SearchUsersByEmailProps, SearchUsersByNameProps } from "../types";
import { db } from "./firebase";

export const searchUsersByName = async ({
  name,
  currentUserId,
}: SearchUsersByNameProps) => {
  if (!name.trim()) return [];

  const userRef = collection(db, "users");

  const q = query(
    userRef,
    orderBy("fullName"),
    startAt(name),
    endAt(name + "/uf8ff"),
    limit(10)
  );

  const snapshot = await getDocs(q);

  const result = snapshot.docs
    .map((doc) => doc.data())
    .filter((user) => user.id !== currentUserId);

  return result;
};

export const searchUsersByEmail = async ({
  email,
  currentUserId,
}: SearchUsersByEmailProps) => {
  const userRef = collection(db, "users");

  const q = query(userRef, where("email", "==", email));
  const snapshot = await getDocs(q);

  const result = snapshot.docs
    .map((doc) => doc.data())
    .filter((user) => user.id !== currentUserId);
};
