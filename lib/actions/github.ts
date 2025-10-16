export const githubRepo = {
    owner: "Saadiii46",
    repo: "DevNest",
  };
  
  export async function fetchFileFromGitHub(filePath: string): Promise<string> {
    try {
      const res = await fetch(
        `https://raw.githubusercontent.com/${githubRepo.owner}/${githubRepo.repo}/main/${filePath}`
      );
      if (!res.ok) return "";
      return await res.text();
    } catch (err) {
      console.error(" GitHub fetch error:", err);
      return "";
    }
  }
  