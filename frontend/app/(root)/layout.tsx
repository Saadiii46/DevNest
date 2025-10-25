import AppSidebar from "@/components/AppSidebar";
import { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminAuth } from "@/lib/firebase/firebaseAdmin";
import { getCurrentUser } from "@/lib/firebase/getCurrentUser";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SocketProvider } from "@/components/SocketProvider";

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
    <SocketProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar user={user} />
        <div className="w-full">
          <main>{children}</main>
        </div>
      </SidebarProvider>
    </SocketProvider>
  );
};

export default layout;
