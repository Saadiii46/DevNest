import { NextRequest, NextResponse } from "next/server";
import { initAdmin } from "./lib/firebase/firebaseAdmin";

initAdmin();

export async function middleware(req: NextRequest) {
  const publicPaths = ["/sign-in", "/sign-up"];
  const path = req.nextUrl.pathname;

  if (publicPaths.some((p) => path.startsWith(p))) {
    return NextResponse.next();
  }

  // 2. Read the "session" cookie
  const session = req.cookies.get("session")?.value;
  if (!session) {
    // No cookie → redirect to sign in
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next(); // all good → continue to requested page
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
