import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { SendFriendRequestProps } from "../types";
import { db } from "./firebase";

export const sendFriendRequest = async ({
  requesterId,
  recieverId,
}: SendFriendRequestProps) => {
  try {
    const docRef = await addDoc(collection(db, "friendRequests"), {
      requesterId,
      recieverId,
      status: "pending",
      createdAt: serverTimestamp(),
    });

    console.log("Friend request sent, ID:", docRef.id);
  } catch (error) {
    console.error("Error sending friend request:", error);
  }
};
