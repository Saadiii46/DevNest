import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// keep sessions in-memory during dev
(global as any).__AGENT_SESSIONS__ = (global as any).__AGENT_SESSIONS__ || {};
const sessions = (global as any).__AGENT_SESSIONS__;

export async function POST(req: Request) {
  try {
    const { sessionId } = await req.json();

    if (!sessionId || !sessions[sessionId]) {
      return NextResponse.json({ error: "no-session" }, { status: 400 });
    }

    const s = sessions[sessionId];
    const answers = s.answers || {};
    const history = s.history || [];

    // create folder name based on client name
    const client = (answers.clientName || answers.client || "client")
      .toString()
      .replace(/\s+/g, "-")
      .toLowerCase();

    const folderName = `${client}-${Date.now()}`;

    // Create the folder inside /public/prebuilds
    const folder = path.join(process.cwd(), "public", "prebuilds", folderName);
    fs.mkdirSync(folder, { recursive: true });

    // 🔹 Build Markdown Summary (includes questions + answers)
    let md = `# Project Summary\n\n`;
    md += `**Client:** ${answers.clientName || ""}\n\n`;
    md += `**Project Name:** ${answers.projectName || ""}\n\n`;
    md += `---\n\n`;
    md += `### 🧠 Collected Data\n\n`;

    // Combine Q/A from session history
    for (const msg of history) {
      if (msg.role === "assistant") {
        md += `**Q:** ${msg.content}\n`;
      } else if (msg.role === "user") {
        md += `→ ${msg.content}\n\n`;
      }
    }

    md += `\n---\nGenerated at: ${new Date().toISOString()}\n`;

    // Save Markdown + JSON files
    fs.writeFileSync(path.join(folder, "project-summary.md"), md, "utf-8");
    fs.writeFileSync(
      path.join(folder, "spec.json"),
      JSON.stringify({ answers, history }, null, 2),
      "utf-8"
    );

    console.log("✅ Project saved in:", folder);

    // clear session after saving
    delete sessions[sessionId];

    return NextResponse.json({
      success: true,
      message: "Project data saved successfully (Q&A included).",
      folder: folderName,
    });
  } catch (err) {
    console.error("❌ save error:", err);
    return NextResponse.json({ error: "save-failed" }, { status: 500 });
  }
}
