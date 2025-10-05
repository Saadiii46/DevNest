import { adminAuth, adminDb } from "@/lib/firebase/firebaseAdmin";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { fullName, email, idToken } = await req.json();

    if (!idToken) {
      return NextResponse.json({ error: "No ID Token Found" }, { status: 401 });
    }

    const decodeUser = await adminAuth.verifyIdToken(idToken);

    await adminDb
      .collection("users")
      .doc(decodeUser.uid)
      .set(
        {
          id: decodeUser.uid,
          email: email,
          fullName: fullName || decodeUser.name || null,
          role: "user",
          createdAt: new Date(),
        },
        { merge: true }
      );

    await adminAuth.updateUser(decodeUser.uid, {
      displayName: fullName,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
