import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseStringify = (value: unknown) => {
  return JSON.parse(JSON.stringify(value));
};

export const getFileType = (extension: string): string => {
  const imageExist = ["jpg", "jpeg", "png", "gif"];
  const videoExist = ["mp4", "avi", "mov", "mwv", "flv", "webm"];
  const audioExist = ["mp3", "wav", "ogg"];
  const docExist = ["pdf", "doc", "docx", "txt", "xls", "xlsx", "rtf"];

  const ext = extension.toLowerCase();

  if (imageExist.includes(ext)) return "image";
  if (videoExist.includes(ext)) return "video";
  if (audioExist.includes(ext)) return "audio";
  if (docExist.includes(ext)) return "document";

  return "other";
};

export const slugify = (projectName: string): string => {
  return projectName
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const generateRoomId = (userA: string, userB: string) => {
  return [userA, userB].sort().join("_");
};
