"use client";

import React from "react";
import { NetworkIcon } from "lucide-react";
import { menuItems } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { cn } from "@/lib/utils";

interface SidebarProps {
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export default function ModernSidebar({ user }: SidebarProps) {
  const pathName = usePathname();

  return (
    <>
      <div>
        <Sidebar collapsible="icon" className="bg-[#112D4E]">
          <SidebarHeader className="mb-4">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <NetworkIcon size={30} />
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu className="gap-2 p-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      pathName === item.route ||
                      pathName.startsWith(`${item.route}/`)
                    }
                    className={cn(
                      "text-md transition-colors p-4",
                      "hover:bg-[var(--sidebar-accent-hover)] hover:text-[var(--sidebar-accent-hover-foreground)]",
                      "data-[active=true]:bg-[var(--sidebar-accent-active)] data-[active=true]:text-[var(--sidebar-accent-active-foreground)]"
                    )}
                  >
                    <Link href={item.route}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip={{
                    children: "Settings",
                    className:
                      "bg-sidebar text-sidebar-foreground border-sidebar-border",
                  }}
                ></SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
      </div>
    </>
  );
}
