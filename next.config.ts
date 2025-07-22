import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["fra.cloud.appwrite.io"], // ✅ allow Appwrite's CDN domain
  },

  serverActions: {
    bodySizeLimit: "100mb",
  },
};

export default nextConfig;
