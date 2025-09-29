"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase"; 

export default function Protected({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) router.replace("signup");   
      else setLoading(false);
    });
    return () => unsub();
  }, [router]);

  if (loading) return <p>Loading…</p>;
  return <>{children}</>;
}
