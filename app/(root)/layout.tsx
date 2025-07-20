import AppSidebar from "@/components/AppSidebar";
import Navbar from "@/components/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <div className="flex">
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <main className="w-full">
          <Navbar />
          <div className="p-4">{children}</div>
        </main>
      </SidebarProvider>
    </div>
  );
};

export default layout;
