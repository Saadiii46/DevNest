import AppSidebar from "@/components/AppSidebar";
import Navbar from "@/components/Navbar";
import { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminAuth } from "@/lib/firebase/firebaseAdmin";
import { getCurrentUser } from "@/lib/firebase/getCurrentUser";

const layout = async ({ children }: { children: ReactNode }) => {
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
    <div className="flex">
      {/** App sidebar component */}
      <AppSidebar user={user} />
      <main className="w-full">
        {/** Navbar component */}
        <Navbar />
        <div className="">{children}</div>
      </main>
    </div>
  );
};

export default layout;
