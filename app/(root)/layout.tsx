import AppSidebar from "@/components/AppSidebar";
import Navbar from "@/components/Navbar";
import { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminAuth } from "@/lib/firebase/firebaseAdmin";
import { getCurrentUser } from "@/lib/firebase/getCurrentUser";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/theme-provider";

const layout = async ({ children }: { children: ReactNode }) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  const sessionCookie = (await cookies()).get("session")?.value;

  if (!sessionCookie) {
    redirect("/sign-in");
  }

  try {
    await adminAuth.verifySessionCookie(sessionCookie, true);
  } catch (error) {
    console.error("Invalid session", error);
    redirect("/sign-in");
  }

  const user = await getCurrentUser();

  if (!user) throw new Error("User not found");
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar user={user} />
        <div className="w-full">
          <main>{children}</main>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default layout;
