"use client";

import AppSidebar from "@/components/AppSidebar";
import Navbar from "@/components/Navbar";
import { getCurrentUser } from "@/lib/actions/user.action";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";

const layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) router.push("/sign-in");
    });
    return () => unsubscribe();
  }, [router]); 

  return (
    <div className="flex">
      {/** App sidebar component */}
      <AppSidebar />
      <main className="w-full">
        {/** Navbar component */}
        <Navbar />
        <div className="">{children}</div>
      </main>
    </div>
  );
};

export default layout;
