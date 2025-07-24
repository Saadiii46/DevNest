import {
  Home,
  Folder,
  Users,
  MessageSquare,
  FileText,
  HardDrive,
  Clock,
  File,
} from "lucide-react";

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

export const stats = [
  {
    label: "Total Files",
    value: "2",
    icon: File,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
  },
  {
    label: "Storage Used",
    value: "0 bytes",
    icon: HardDrive,
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50",
  },
  {
    label: "Last Upload",
    value: "2 hours ago",
    icon: Clock,
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-50",
  },
];

export const files = [
  {
    id: 1,
    name: "Project Proposal.pdf",
    size: "2.4 MB",
    type: "PDF",
    modified: "2h ago",
    color: "bg-red-500",
  },
  {
    id: 2,
    name: "Design Assets.zip",
    size: "15.2 MB",
    type: "ZIP",
    modified: "1d ago",
    color: "bg-yellow-500",
  },
  {
    id: 3,
    name: "Meeting Notes.docx",
    size: "1.1 MB",
    type: "DOC",
    modified: "3d ago",
    color: "bg-blue-500",
  },
  {
    id: 4,
    name: "Analytics Report.xlsx",
    size: "3.7 MB",
    type: "XLS",
    modified: "1w ago",
    color: "bg-green-500",
  },
  {
    id: 5,
    name: "Analytics Report.xlsx",
    size: "3.7 MB",
    type: "XLS",
    modified: "1w ago",
    color: "bg-green-500",
  },
  {
    id: 6,
    name: "Analytics Report.xlsx",
    size: "3.7 MB",
    type: "XLS",
    modified: "1w ago",
    color: "bg-green-500",
  },
  {
    id: 7,
    name: "Analytics Report.xlsx",
    size: "3.7 MB",
    type: "XLS",
    modified: "1w ago",
    color: "bg-green-500",
  },
  {
    id: 8,
    name: "Analytics Report.xlsx",
    size: "3.7 MB",
    type: "XLS",
    modified: "1w ago",
    color: "bg-green-500",
  },
];

export const formatTimeAgo = (isoDate: string) => {
  const date = new Date(isoDate);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000); // in seconds

  if (diff < 60) return `${diff} seconds ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  return `${Math.floor(diff / 86400)} days ago`;
};
