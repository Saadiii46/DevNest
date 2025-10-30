// lib/r2.ts
import { S3Client } from "@aws-sdk/client-s3";

export const R2 = new S3Client({
  region: process.env.CLOUDFLARE_BUCKET_REGION,
  endpoint:
    "https://aa62981d3b6a89f2180b1714af6d4dd4.r2.cloudflarestorage.com/devnest-projects",
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY!,
  },
});
