import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fra.cloud.appwrite.io", // your Appwrite hostname
        pathname: "/v1/storage/**", // match Appwrite storage URLs
      },
    ], // ✅ allow Appwrite's CDN domain
  },

  serverActions: {
    bodySizeLimit: "100mb",
  },
};

export default nextConfig;
