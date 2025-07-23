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
