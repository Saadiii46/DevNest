import { adminAuth } from "@/lib/firebase/firebaseAdmin";
import { NextResponse } from "next/server";

const EXPIRES_IN = 5 * 60 * 60 * 24 * 1000;

export async function POST(req: Request) {
  try {
    const { idToken } = await req.json();

    if (!idToken) {
      console.error("Missing ID token in session creation request");
      return NextResponse.json({ error: "Missing ID token" }, { status: 400 });
    }

    console.log("Creating session cookie for token:", idToken.substring(0, 20) + "...");

    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn: EXPIRES_IN,
    });

    console.log("Session cookie created successfully");

    const response = NextResponse.json({ status: "success" });

    response.cookies.set("session", sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: EXPIRES_IN / 1000,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Error creating session cookie:", error);
    
    // Provide more detailed error information
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ 
      error: "Failed to create session", 
      details: errorMessage 
    }, { status: 401 });
  }
}

export async function DELETE() {
  // Logout → clear cookie
  const response = NextResponse.json({ status: "logged out" });
  response.cookies.set("session", "", { maxAge: 0, path: "/" });
  return response;
}
