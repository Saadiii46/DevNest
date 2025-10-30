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
import {
  SearchUsersByEmailProps,
  SearchUsersByNameProps,
  user,
} from "../types";
import { db } from "./firebase";

export async function searchUsers({
  name,
  currentUserId,
}: SearchUsersByNameProps): Promise<user[]> {
  if (!name.trim()) return [];
  try {
    const username = name.toLowerCase();
    const userRef = collection(db, "users");

    const q = query(
      userRef,
      where("username", ">=", username),
      where("username", "<=", username + "\uf8ff"),
      limit(10)
    );

    const snapshot = await getDocs(q);

    let users: user[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      fullName: doc.data().fullName,
    }));

    return users.filter((user) => user.id !== currentUserId);
  } catch (error) {
    console.error("Error fetching users");
    return [];
  }
}

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
