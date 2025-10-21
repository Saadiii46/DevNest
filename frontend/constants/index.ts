import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Activity, Client, Message, Project, User } from "@/lib/types";
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

const findImage = (id: string) => {
  const image = PlaceHolderImages.find((img) => img.id === id);
  if (!image) {
    // Fallback image if not found
    return {
      id: "fallback",
      description: "fallback",
      imageUrl: "https://picsum.photos/seed/fallback/100/100",
      imageHint: "abstract",
    };
  }
  return image;
};

export const clients: Client[] = [
  {
    id: "cli1",
    name: "Innovate Inc.",
    avatar: findImage("client-avatar-1"),
    online: true,
  },
  {
    id: "cli2",
    name: "Quantum Solutions",
    avatar: findImage("client-avatar-2"),
    online: false,
  },
  {
    id: "cli3",
    name: "Apex Designs",
    avatar: findImage("client-avatar-3"),
    online: true,
  },
  {
    id: "cli4",
    name: "Stellar Corp.",
    avatar: findImage("client-avatar-4"),
    online: false,
  },
];

export const currentUser: User = {
  name: "Alex Reid",
  email: "alex.reid@example.com",
  avatar: findImage("user-avatar-1"),
};

export const activities: Activity[] = [
  {
    id: "act1",
    user: { name: "Innovate Inc.", avatar: findImage("client-avatar-1") },
    action: "sent a message in",
    target: "E-commerce Platform",
    timestamp: "2 hours ago",
  },
  {
    id: "act2",
    user: { name: "You", avatar: currentUser.avatar },
    action: "updated the status of",
    target: "Mobile App Redesign",
    timestamp: "5 hours ago",
  },
  {
    id: "act3",
    user: { name: "Apex Designs", avatar: findImage("client-avatar-3") },
    action: "approved the final design for",
    target: "Marketing Website",
    timestamp: "1 day ago",
  },
  {
    id: "act4",
    user: { name: "You", avatar: currentUser.avatar },
    action: "added a new task to",
    target: "Internal Dashboard",
    timestamp: "2 days ago",
  },
  {
    id: "act5",
    user: { name: "Stellar Corp.", avatar: findImage("client-avatar-4") },
    action: "requested a video call for",
    target: "Internal Dashboard",
    timestamp: "3 days ago",
  },
];

export const messages: Message[] = [
  {
    id: "msg1",
    sender: "client",
    text: "Hey! Just wanted to check on the progress for the homepage redesign. Any updates?",
    timestamp: "10:30 AM",
  },
  {
    id: "msg2",
    sender: "user",
    text: "Hi there! We've just finished the wireframes. I'm sending them over now. Let me know what you think!",
    timestamp: "10:31 AM",
  },
  {
    id: "msg3",
    sender: "client",
    text: "Great, looking forward to seeing them.",
    timestamp: "10:32 AM",
  },
  {
    id: "msg4",
    sender: "client",
    text: "These look fantastic! The new layout is much cleaner. Just one question - can we move the CTA button a bit higher?",
    timestamp: "10:45 AM",
  },
  {
    id: "msg5",
    sender: "user",
    text: "Absolutely, that's an easy change. I'll adjust it and send a revised version shortly.",
    timestamp: "10:46 AM",
  },
  {
    id: "msg6",
    sender: "client",
    text: "Perfect, thanks! Also, can we schedule a quick video call tomorrow to discuss the next steps?",
    timestamp: "10:47 AM",
  },
  {
    id: "msg7",
    sender: "user",
    text: "Of course. How does 11 AM work for you?",
    timestamp: "10:48 AM",
  },
];

export const projects: Project[] = [
  {
    id: "proj1",
    name: "E-commerce Platform",
    client: clients[0],
    dueDate: "2024-08-15",
    progress: 75,
    status: "In Progress",
  },
  {
    id: "proj2",
    name: "Mobile App Redesign",
    client: clients[1],
    dueDate: "2024-07-30",
    progress: 45,
    status: "In Progress",
  },
  {
    id: "proj3",
    name: "Marketing Website",
    client: clients[2],
    dueDate: "2024-06-20",
    progress: 100,
    status: "Completed",
  },
  {
    id: "proj4",
    name: "Internal Dashboard",
    client: clients[3],
    dueDate: "2024-09-01",
    progress: 20,
    status: "In Progress",
  },
  {
    id: "proj5",
    name: "Branding Guide",
    client: clients[0],
    dueDate: "2024-05-10",
    progress: 100,
    status: "Completed",
  },
  {
    id: "proj6",
    name: "Cloud Migration",
    client: clients[2],
    dueDate: "2024-10-10",
    progress: 10,
    status: "On Hold",
  },
];
