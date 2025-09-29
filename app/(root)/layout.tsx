"use client";

import AppSidebar from "@/components/AppSidebar";
import Navbar from "@/components/Navbar";
import { ReactNode, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";
import { useRouter } from "next/navigation";

const layout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/sign-in");
      }
    });

    return () => unsubscribe();
  });

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
