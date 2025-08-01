"use client";

import { signOutUser } from "@/lib/actions/user.action";
import { Skeleton } from "../ui/skeleton";
import { useRouter } from "next/navigation";
import { handleClientError } from "@/lib/handleClientError";
import { toast } from "sonner";
import { useState } from "react";
import { Loader } from "../Loader";

interface Props {
  user: string;
}

const dashboardHeader = ({ user }: Props) => {
  const isUsernameLoading = !user;
  const router = useRouter();
  const [isLoading, setIsloading] = useState(false);

  // Logout user

  const handleLogout = async () => {
    setIsloading(true);
    try {
      await signOutUser();
      router.push("/sign-in");
    } catch (error) {
      const { message } = handleClientError(error);
      toast.error(message);
    } finally {
      setIsloading(false);
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

      {isLoading && <Loader isVisible={isLoading} />}
    </div>
  );
};

export default dashboardHeader;
