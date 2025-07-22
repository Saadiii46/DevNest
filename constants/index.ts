import { Box } from "lucide-react";

export const navItems = [
  {
    title: "Drive",
    url: "/",
    icon: Box,
  },
];

export const avatarPlaceHolder =
  "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png";

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 bytes";
  const k = 1024;
  const sizes = ["bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};
