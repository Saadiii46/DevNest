import OpenAI from "openai";
import { getRelevantContext } from "./ragHelper";
import { fetchFileFromGitHub } from "@/lib/actions/github";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function getChatbotResponse(message: string) {
  //  Step 1: Get RAG context
  const ragContext = await getRelevantContext(message);

  //  Step 2: Optional GitHub context (if user asks about repo/files)
  let githubContext = "";
  if (
    message.toLowerCase().includes("github") ||
    message.toLowerCase().includes("code")
  ) {
    githubContext = await fetchFileFromGitHub("README.md");
  }

  //  Step 3: Combine all context
  const combinedContext = `
${ragContext ? "RAG Context:\n" + ragContext : ""}
${githubContext ? "\nGitHub Context:\n" + githubContext.slice(0, 800) : ""}
`;

  // Step 4: System prompt for the AI
  const systemPrompt = `
You are an AI chatbot assistant for a A modern SaaS platform named DevNest  where developers can store projects, showcase portfolios, and collaborate with clients through chat and video calls.
Built with Next.js 15, Firebase, and TailwindCSS for speed, security, and scalability.
- Secure authentication with Firebase & session cookies
 Upload project files (Firebase Storage + Firestore metadata)
 Middleware-protected routes
Dashboard with project stats
 Clean & responsive UI (Tailwind + ShadCN)
- Hosted on Vercel.
- You can reference GitHub for accurate info about files and project details.
- Keep answers short (1–2 sentences) and easy to understand.
`;

  //  Step 5: Send to OpenAI
  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.7,
    max_tokens: 800,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: message },
      { role: "assistant", content: combinedContext },
    ],
  });

  return res.choices[0].message.content || " No response from AI.";
}
