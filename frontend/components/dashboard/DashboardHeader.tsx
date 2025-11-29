"use client";

import { Command, Plus, Search, UserPlus, Bell } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { SidebarTrigger } from "../ui/sidebar";
import AppTheme from "@/components/dashboard/AppTheme";
import ChatBot from "@/components/dashboard/Chatbot";
import { getCurrentUser, signOutUser } from "@/lib/firebase/users";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const DashboardHeader = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const handleLogout = () => {
    signOutUser();

    router.push("/sign-in");
  };

  const handleOpenFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setOpen(true);
    }
  };

  const handleNewProjectUpload = async (e: React.FormEvent) => {
    const currentUser = getCurrentUser();
    if (!currentUser || !currentUser.id) return console.log("no user found");
    if (!selectedFile) return alert("Please select your file ");
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("userId", currentUser.id);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    if (!res.ok) return alert(`Failed to upload: error ${data.error}`);
    alert("File upload successfully");
    setSelectedFile(null);
    setIsLoading(false);
  };

  const handleGithubLogin = () => {
    window.location.href = "api/github/login";
  };

  return (
    <header className="relative flex h-16 items-center gap-4 border-b bg-card px-4 lg:px-8 shrink-0">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <h1 className="text-xl font-headline font-semibold">Dashboard</h1>
      </div>

      {/* Right side */}
      <div className="flex w-full items-center gap-2 md:ml-auto">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] bg-background"
            />
          </div>
        </form>

        <Button variant="outline" className="hidden sm:inline-flex">
          <Command className="mr-2" />
          Command
        </Button>
        <Button variant="outline" size="icon" className="hidden sm:inline-flex">
          <UserPlus />
          <span className="sr-only">Add Client</span>
        </Button>
        {/* <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <Button
            className="hidden sm:inline-flex"
            onClick={handleOpenFilePicker}
          >
            <Plus className="mr-2" />
            New Project
          </Button>
          {url && <p className="text-white font-bold">File Uplaoded: {url}</p>}
        </div> */}
        <Button className="hidden sm:inline-flex" onClick={handleGithubLogin}>
          <Plus className="mr-2" />
          Connect Github
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Toggle notifications</span>
        </Button>

        <div>
          <AppTheme />
        </div>

        {/* Profile dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/*  Add ChatBot here */}
      <ChatBot />

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{selectedFile?.name}</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to uplaod this project?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleNewProjectUpload}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </header>
  );
};

export default DashboardHeader;
