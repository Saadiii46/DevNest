import { Home, Folder, Users, MessageSquare, Upload, Bell } from "lucide-react";

export const menuItems = [
  { id: "dashboard", route: "/", icon: Home, label: "Dashboard", badge: null },
  {
    id: "portfolio",
    route: "/portfolio",
    icon: Folder,
    label: "Portfolio",
    badge: null,
  },
  {
    id: "messages",
    route: "/feedback",
    icon: MessageSquare,
    label: "Feedback",
    badge: null,
  },
  { id: "team", route: "/clients", icon: Users, label: "Clients", badge: null },
  {
    id: "uplaods",
    route: "/uploads",
    icon: Upload,
    label: "Uploads",
    badge: null,
  },
];
export const MobileMenuItems = [
  { id: "dashboard", icon: Home, label: "Dashboard", badge: null },
  { id: "projects", icon: Folder, label: "Projects", badge: null },
  { id: "messages", icon: MessageSquare, label: "Feedback", badge: null },
  { id: "team", icon: Users, label: "Clients", badge: null },
  { id: "uploads", icon: Upload, label: "Uploads", badge: null },
  { id: "notifications", icon: Bell, label: "Notifications", badge: null },
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

export type Files = {
  name: string;
  size: number;
  type: string;
  url: string;
  extension: string;
  owner: string;
  slug: string;
  accountId: string;
  bucketField: string;
  users: string[];
  isPublic?: boolean;
  shareId?: string;
};

export type FileType = {
  $id: string;
  name: string;
  url: string;
  type: string;
  extension: string;
  size: number;
  slug: string;
  owner: string;
  accountId: string;
  bucketField: string;
  users: string[];
};

export const projects = [
  {
    id: 1,
    name: "E-Commerce Dashboard",
    type: "React App",
    size: "2.4 MB",
    uploadDate: "2 hours ago",
    status: "ready",
    files: 45,
    icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
  },
  {
    id: 2,
    name: "Portfolio Website",
    type: "HTML/CSS",
    size: "1.8 MB",
    uploadDate: "1 day ago",
    status: "hosted",
    files: 23,
    icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
  },
  {
    id: 3,
    name: "Task Manager App",
    type: "Vue.js",
    size: "3.1 MB",
    uploadDate: "3 days ago",
    status: "ready",
    files: 67,
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
  },
  {
    id: 4,
    name: "Blog Platform",
    type: "Next.js",
    size: "4.2 MB",
    uploadDate: "5 days ago",
    status: "processing",
    files: 89,
    icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z",
  },
  {
    id: 5,
    name: "Weather App",
    type: "Angular",
    size: "1.6 MB",
    uploadDate: "1 week ago",
    status: "ready",
    files: 34,
    icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z",
  },
  {
    id: 6,
    name: "Social Media Clone",
    type: "React Native",
    size: "5.7 MB",
    uploadDate: "2 weeks ago",
    status: "hosted",
    files: 123,
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20a3 3 0 01-3-3v-2a3 3 0 013-3h5a3 3 0 013 3v2a3 3 0 01-3 3z",
  },
];
