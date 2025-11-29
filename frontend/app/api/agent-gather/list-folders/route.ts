import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const prebuildsPath = path.join(process.cwd(), "public", "prebuilds");

    if (!fs.existsSync(prebuildsPath)) {
      return NextResponse.json({ folders: [] });
    }

    const folders = fs
      .readdirSync(prebuildsPath, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => {
        const folderPath = path.join(prebuildsPath, dirent.name);
        const summaryPath1 = path.join(folderPath, "summary.md");
        const summaryPath2 = path.join(folderPath, "project-summary.md");

        // Check if summary file exists
        const hasSummary =
          fs.existsSync(summaryPath1) || fs.existsSync(summaryPath2);

        // Get folder stats for sorting
        const stats = fs.statSync(folderPath);

        return {
          name: dirent.name,
          hasSummary,
          created: stats.birthtime,
          modified: stats.mtime,
        };
      })
      .filter((folder) => folder.hasSummary) // Only return folders with summary files
      .sort((a, b) => b.modified.getTime() - a.modified.getTime()) // Sort by most recent first
      .map((folder) => folder.name);

    return NextResponse.json({ folders });
  } catch (err) {
    console.error("❌ list folders error:", err);
    return NextResponse.json(
      { folders: [], error: "failed-to-list" },
      { status: 500 }
    );
  }
}
