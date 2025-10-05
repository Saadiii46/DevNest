import { adminAuth, adminDb } from "@/lib/firebase/firebaseAdmin";
import { serverTimestamp } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const EXPIRES_IN = 5 * 24 * 60 * 60 * 1000; // 5 days
  try {
    const { idToken } = await req.json();

    if (!idToken) {
      return NextResponse.json({ error: "No ID Token Found" }, { status: 401 });
    }

    const decodedUser = await adminAuth.verifyIdToken(idToken);

    const id = decodedUser.uid;
    const email = decodedUser.email;
    const fullName = decodedUser.name || null;

    const userIdFromDb = adminDb.collection("users").doc(id);
    const checkUserInDb = await userIdFromDb.get();

    if (!checkUserInDb.exists) {
      await userIdFromDb.set({
        id,
        email,
        fullName,
        role: "user",
        createdAt: new Date(),
      });
    }

    // Create session cookie
    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn: EXPIRES_IN,
    });

    const res = NextResponse.json({ success: true });
    res.cookies.set("session", sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: EXPIRES_IN / 1000,
      path: "/",
    });

    return res;
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
