import { trackDownloads } from "@/lib/actions/file.action";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { fileId, currentCount } = await req.json();

  await trackDownloads(fileId, currentCount);

  return NextResponse.json({ success: true });
}
