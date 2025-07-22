import {
  Home,
  Folder,
  CloudUpload,
  FolderKanban,
  Globe,
  Users,
  Settings,
  LogOut,
} from "lucide-react";

const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: Home, href: "/" },
  { id: "my-files", label: "My Files", icon: Folder, href: "#" },
  { id: "upload", label: "Upload", icon: CloudUpload, href: "/#" },
  { id: "projects", label: "Projects", icon: FolderKanban, href: "#" },
  { id: "showcase", label: "Showcase", icon: Globe, href: "#" },
  { id: "clients", label: "Clients", icon: Users, href: "#" },
  { id: "settings", label: "Settings", icon: Settings, href: "#" },
  { id: "logout", label: "Logout", icon: LogOut, href: "#" },
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
