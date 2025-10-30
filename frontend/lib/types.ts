import type { ImagePlaceholder } from "./placeholder-images";

export type Project = {
  id: string;
  name: string;
  client: Client;
  dueDate: string;
  progress: number;
  status: "In Progress" | "Completed" | "On Hold";
};

export type Activity = {
  id: string;
  user: {
    name: string;
    avatar: ImagePlaceholder;
  };
  action: string;
  target: string;
  timestamp: string;
};

export type Client = {
  id: string;
  name: string;
  avatar: ImagePlaceholder;
  online: boolean;
};

export type Message = {
  id: string;
  sender: "user" | "client";
  text: string;
  timestamp: string;
};

export type User = {
  name: string;
  avatar: ImagePlaceholder;
  email: string;
};

export interface SendFriendRequestProps {
  requesterId: string;
  recieverId: string;
}

export interface SearchUsersByNameProps {
  name: string;
  currentUserId: string;
}

export interface SearchUsersByEmailProps {
  email: string;
  currentUserId: string;
}

export interface user {
  id: string;
  fullName: string;
  avatarUrl?: string;
}
