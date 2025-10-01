"use server";

import { initAdmin } from "@/lib/firebase/firebaseAdmin";
import { getAuth } from "firebase-admin/auth";
import { NextRequest, NextResponse } from "next/server";

initAdmin();

export async function POST(req: Request) {
  const { idToken } = await req.json();

  const expiresIn = 60 * 60 * 24 * 5 * 1000;

  try {
    const sessionCookie = await getAuth().createSessionCookie(idToken, {
      expiresIn,
    });

    const res = NextResponse.json({ success: true });

    res.cookies.set("session", sessionCookie, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });

    return res;
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 401 });
  }
}

export async function GET(req: NextRequest) {
  const session = req.cookies.get("session")?.value;

  if (!session) {
    return NextResponse.json({ valid: false }, { status: 401 });
  }

  try {
    const decoded = await getAuth().verifySessionCookie(session, true);
    return NextResponse.json({ valid: true, user: decoded });
  } catch {
    return NextResponse.json({ valid: false }, { status: 401 });
  }
}

export const runtime = "nodejs";
