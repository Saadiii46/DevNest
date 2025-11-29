import { getGithub0AuthUrl } from "@/lib/github/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const url = getGithub0AuthUrl();
    return NextResponse.redirect(url);
  } catch (error) {
    return console.error("error", error);
  }
}
