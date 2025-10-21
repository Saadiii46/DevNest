// src/lib/router.ts
export function detectQueryType(message: string): "dev" | "info" {
    const devKeywords = ["code", "error", "bug", "function", "api", "component", "typescript", "firebase"];
    return devKeywords.some((word) => message.toLowerCase().includes(word)) ? "dev" : "info";
  }
  