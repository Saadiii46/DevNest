"use client";

import { Command, LogOut, Plus, Search, UserPlus } from "lucide-react";
import { Bell } from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { SidebarTrigger } from "../ui/sidebar";

const DashboardHeader = () => {
  return (
    <header className="flex h-16 items-center gap-4 border-b bg-card px-4 lg:px-8 shrink-0">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <h1 className="text-xl font-headline font-semibold">Dashboard</h1>
      </div>
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
        <Button className="hidden sm:inline-flex">
          <Plus className="mr-2" />
          New Project
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
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
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashboardHeader;
