import { NextResponse } from "next/server";
import { getChatbotResponse } from "@/lib/actions/openai";

export async function POST(req: Request) {
  const { message } = await req.json();
  const reply = await getChatbotResponse(message);
  return NextResponse.json({ reply });
}

  
