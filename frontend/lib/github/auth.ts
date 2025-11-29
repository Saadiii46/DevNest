import axios from "axios";

export const getGithub0AuthUrl = () => {
  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    redirect_uri: process.env.NEXT_PUBLIC_BASE_URL!,
    scope: "read:user user:email",
    allow_signup: "true",
  });

  return `https://github.com/login/oauth/authorize?${params.toString()}`;
};

export const exchangeCodeForAccessToken = async (code: string) => {
  const response = await axios.post(
    "https://github.com/login/oauth/access_token",
    {
      client_id: process.env.GITHUB_CLIENT_ID!,
      client_secret: process.env.GITHUB_CLIENT_SECRET!,
      code,
    },
    {
      headers: { Accept: "application/json" },
    }
  );

  return response;
};

export const getGithubUserInformation = async (token: string) => {
  const response = axios.get("https://api.github.com/user", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response;
};
