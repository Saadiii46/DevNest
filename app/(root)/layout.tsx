import AppSidebar from "@/components/AppSidebar";
import Navbar from "@/components/Navbar";
import { getCurrentUser } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {
  const currentUser = await getCurrentUser(); // Getting current user

  if (!currentUser) return redirect("/sign-in"); // If no user redirect to sign in page

  return (
    <div className="flex">
      {/** App sidebar component */}
      <AppSidebar {...currentUser} />
      <main className="w-full">
        {/** Navbar component */}
        <Navbar {...currentUser} />
        <div className="">{children}</div>
      </main>
    </div>
  );
};

export default layout;
