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
You are an expert senior web developer building a production-quality marketing site using **Tailwind CSS** with a structure that could later be converted into React components.
Based on the following project summary:

${summaryContent}

Generate a **single, complete HTML document** that is visually very rich and interactive. Follow these rules:

1. Return a full HTML document with <html>, <head>, and <body> tags.
2. Include Tailwind via CDN: <script src="https://cdn.tailwindcss.com"></script>.
3. Build a **rich single-page layout** composed of clearly separated sections that map well to React components:
   - Sticky header with logo and navigation links (Home, Features, Pricing, Testimonials, FAQ, Contact) and a mobile hamburger menu.
   - Hero section with strong headline, subheadline, primary and secondary CTA buttons.
   - Features/benefits grid with icons.
   - Detailed product/service section.
   - Stats/highlights strip.
   - Pricing plans/cards.
   - Testimonials or social proof section.
   - FAQ accordion section.
   - Contact / newsletter signup section.
   - Footer with links and small print.
4. Use **modern, eye-catching Tailwind design** and extra visual polish:
   - Gradients, glassmorphism-style cards, hover and focus states, smooth transitions, and subtle scroll-based reveal animations using Tailwind utility classes.
   - Responsive typography and layout (mobile-first, tablet, desktop).
   - A consistent color system based on 1 primary color and 1 accent color.

5. **Use beautiful royalty-free stock imagery to make the page visually attractive**:
   - Incorporate multiple high-quality images in key sections such as the hero, feature highlights, testimonials, and any product/service showcases.
   - Autonomously choose and use direct URLs from free stock sources like Unsplash (for example: https://images.unsplash.com/...) that do NOT require API keys. Do NOT expect the user to provide any image URLs.
   - Prefer a consistent visual style (e.g., tech, workspace, people collaborating) that matches the project summary.
   - Apply Tailwind classes for rounded corners, shadows, hover effects, and responsive behavior, e.g.:
       * rounded-2xl shadow-xl object-cover
       * w-full h-64 md:h-80 lg:h-96
       * overflow-hidden group containers with subtle scale-on-hover for images.
   - Always include descriptive alt text for accessibility and SEO.
   - You may also use CSS background images on sections or cards where fitting, but ensure contrast and readability remain strong.
   - You MUST render at least 6 real <img> tags with src pointing to actual image URLs (no placeholders like "image-url-here"):
       * At least 1 large, eye-catching image in the hero section (either as an <img> or as a background image on a hero illustration/card).
       * At least 1 image in a features or product section.
       * At least 1 image in testimonials or social proof.
       * The remaining images can be used wherever visually appropriate (e.g., grid/gallery, stats, callouts).
   - Do NOT use text such as "[Image here]" or similar placeholders; always provide concrete image URLs.

6. **Dark/Light Mode Toggle with Sleek UI**: Add a beautiful toggle button as the last item in the navbar:
   - Before loading Tailwind, configure it with tailwind.config = { darkMode: "class" } in a small <script> tag.
   - Position the toggle button **inside the navbar as the last element** on the right side, after all navigation links and CTAs.
   - The toggle should be part of the navbar structure and move with the navbar (sticky/fixed if navbar is sticky/fixed).
   - The toggle button must use this exact sleek UI design:
       * Outer button: relative w-14 h-7 rounded-full transition-all duration-300 ease-in-out shadow-sm
       * Background colors: bg-gray-300 for light mode, bg-indigo-600 for dark mode
       * Inner sliding thumb: absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ease-in-out flex items-center justify-center
       * Thumb position: left-1 for light mode (start), left-8 for dark mode (end)
       * Include SVG icons (w-3 h-3) inside the thumb:
           - Sun icon with text-amber-500 or fill-amber-500 for light mode
           - Moon icon with text-indigo-600 or fill-indigo-600 for dark mode
       * Add aria-label="Toggle dark mode" and title attributes that change based on mode (e.g., "Switch to light mode" when dark, "Switch to dark mode" when light)
   - In a <script> at the end of the body, write JavaScript that:
       * Reads the initial theme from localStorage.theme or window.matchMedia("(prefers-color-scheme: dark)").
       * Applies or removes the dark class on document.documentElement accordingly.
       * On toggle button click, switches between modes by:
           - Toggling dark class on document.documentElement
           - Updating button background color classes
           - Animating the thumb position from left-1 to left-8 or vice versa
           - Swapping sun/moon icon visibility
           - Saving preference to localStorage.theme as "light" or "dark"
   - Use Tailwind dark: variants throughout to change backgrounds, text, cards, buttons, and sections between themes.

7. Add small interactive behaviors using inline JavaScript in a <script> tag at the bottom of the body:
   - Smooth scroll for in-page navigation links.
   - Mobile nav open/close.
   - FAQ accordion open/close.

8. Extract and implement all functional and visual requirements from the project summary so the page feels tailored to that project.

9. Avoid any explanatory text outside the HTML. Do NOT wrap in markdown fences.

Output: ONLY the final, production-ready HTML document with no additional commentary.`;
    

    const res = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 16000,
    });

    let html = res.choices[0].message?.content || "<h1>Failed to generate</h1>";

    // Clean up the HTML if it's wrapped in markdown code blocks
    html = html
      .replace(/```html\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

        const htmlStartIndex = html.search(/<!DOCTYPE html>|<html[\s>]/i);
    if (htmlStartIndex > 0) {
      html = html.slice(htmlStartIndex).trimStart();
    }

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
    console.error(" generate error:", err);
    return NextResponse.json({ error: "generate-failed" }, { status: 500 });
  }
}
