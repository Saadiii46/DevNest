import { fetchFileFromGitHub } from "./github";

const fileKeywords: Record<string, string> = {
  login: "app/login/page.tsx",
  dashboard: "app/dashboard/page.tsx",
  api: "app/api/route.ts",
  form: "app/forms/forms.tsx",
  firebase: "lib/firebase.ts",
};

export async function getRelevantContext(query: string): Promise<string> {
  for (const [key, path] of Object.entries(fileKeywords)) {
    if (query.toLowerCase().includes(key)) {
      const content = await fetchFileFromGitHub(path);
      if (content) {
        return `Relevant file (${path}):\n\n${content}`;
      }
    }
  }
  return "No relevant file found. Use your reasoning based on Next.js & Firebase patterns.";
}
