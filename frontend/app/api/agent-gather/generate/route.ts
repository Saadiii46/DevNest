import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: Request) {
  try {
    const { folder } = await req.json();
    if (!folder)
      return NextResponse.json({ error: "missing-folder" }, { status: 400 });

    const folderPath = path.join(process.cwd(), "public", "prebuilds", folder);

    // Check if folder exists
    if (!fs.existsSync(folderPath)) {
      return NextResponse.json(
        {
          error: "folder-not-found",
          message: `Folder "${folder}" not found in prebuilds directory`,
        },
        { status: 404 }
      );
    }

    // Try to find summary.md or project-summary.md
    const summaryPath1 = path.join(folderPath, "summary.md");
    const summaryPath2 = path.join(folderPath, "project-summary.md");

    let summaryPath: string | null = null;
    if (fs.existsSync(summaryPath1)) {
      summaryPath = summaryPath1;
    } else if (fs.existsSync(summaryPath2)) {
      summaryPath = summaryPath2;
    }

    if (!summaryPath) {
      return NextResponse.json(
        {
          error: "no-summary-found",
          message: `Neither "summary.md" nor "project-summary.md" found in folder "${folder}"`,
        },
        { status: 404 }
      );
    }

    const summaryContent = fs.readFileSync(summaryPath, "utf-8");

    const prompt = `
You are a professional web developer. Generate a clean, responsive HTML + Tailwind CSS page
based on this project summary information:

${summaryContent}

The output should be a complete HTML document (include <html>, <head>, <body>).
Use Tailwind CSS via CDN: <script src="https://cdn.tailwindcss.com"></script>
Keep the design elegant, professional, and fully responsive.
Make sure to extract all requirements from the summary and implement them in the website.
`;

    const res = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 4000,
    });

    let html = res.choices[0].message?.content || "<h1>Failed to generate</h1>";

    // Clean up the HTML if it's wrapped in markdown code blocks
    html = html
      .replace(/```html\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    const genFolder = path.join(process.cwd(), "public", "generated", folder);
    fs.mkdirSync(genFolder, { recursive: true });

    fs.writeFileSync(path.join(genFolder, "index.html"), html, "utf-8");

    const redirectUrl = `/generated/${folder}/index.html`;

    // Return both the HTML code and the redirect URL for preview
    return NextResponse.json({
      success: true,
      redirectUrl,
      htmlCode: html,
    });
  } catch (err) {
    console.error("❌ generate error:", err);
    return NextResponse.json({ error: "generate-failed" }, { status: 500 });
  }
}
