"use server";

import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });

  // Overwrite session cookie with empty value + expire immediately
  response.cookies.set("session", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0), // expired instantly
    path: "/",
  });

  return response;
}
