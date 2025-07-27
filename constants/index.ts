import { Models } from "appwrite";
import { Home, Folder, Users, MessageSquare, FileText } from "lucide-react";

export const menuItems = [
  { id: "dashboard", icon: Home, label: "Dashboard", badge: null },
  { id: "projects", icon: Folder, label: "Projects", badge: null },
  { id: "messages", icon: MessageSquare, label: "Feedback", badge: null },
  { id: "team", icon: Users, label: "Clients", badge: null },
  { id: "documents", icon: FileText, label: "My Files", badge: null },
];

export const avatarPlaceHolder =
  "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png";

// User files size
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 bytes";
  const k = 1024;
  const sizes = ["bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export const formatTimeAgo = (isoDate: string) => {
  const date = new Date(isoDate);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000); // in seconds

  if (diff < 60) return `${diff} seconds ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;

  return `${Math.floor(diff / 86400)} days ago`;
};

// utils/getFileColor.ts

export const getFileColor = (type: string): string => {
  switch (type) {
    case "image":
      return "bg-blue-500";
    case "video":
      return "bg-red-500";
    case "audio":
      return "bg-yellow-500";
    case "document":
      return "bg-green-500";
    case "other":
    default:
      return "bg-gray-500";
  }
};

export type Files = Models.Document & {
  name: string;
  size: number;
  type: string;
  url: string;
  extension: string;
  owner: string;
  accountId: string;
  bucketField: string;
  users: string[];
  isPublic?: boolean;
  shareId?: string;
};
