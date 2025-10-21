import { cookies } from "next/headers";
import { adminAuth } from "./firebaseAdmin";
import { getFirestore } from "firebase-admin/firestore";

export const getCurrentUser = async () => {
  try {
    const session = (await cookies()).get("session")?.value;

    if (!session) throw new Error("No session found");

    const userSession = await adminAuth.verifySessionCookie(session, true);

    const db = getFirestore();
    const user = await db.collection("users").doc(userSession.uid).get();

    return {
      id: userSession.uid || "",
      email: userSession.email || "",
      name: user?.exists ? user.data()?.fullName : null,
    };
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
};
