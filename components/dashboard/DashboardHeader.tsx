"use client";

import { signOutUser } from "@/lib/actions/user.action";
import { Skeleton } from "../ui/skeleton";
import { useRouter } from "next/navigation";

interface Props {
  user: string;
}

const dashboardHeader = ({ user }: Props) => {
  const isUsernameLoading = !user;
  const router = useRouter();

  // Logout user

  const handleLogout = async () => {
    try {
      await signOutUser();
      router.push("/sign-in");
    } catch (error) {
      console.error("Logout Failed:", error);
      throw new Error("Logout Failed");
    }
  };

  return (
    <div className="flex justify-between">
      <div className="header">
        <h1>
          Welcome Back,{" "}
          {isUsernameLoading ? (
            <Skeleton className="h-6 w-[200px] inline-block loader" />
          ) : (
            user
          )}
        </h1>
        <p className="text-slate-600 text-sm font-light">
          Today is {new Date().toLocaleDateString()}
        </p>
      </div>
      <button onClick={handleLogout} className="upload-area-btn">
        Logout
      </button>
    </div>
  );
};

export default dashboardHeader;
