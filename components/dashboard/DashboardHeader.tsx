"use client";

import { signOutUser } from "@/lib/actions/user.action";
import { Skeleton } from "../ui/skeleton";
import { useRouter } from "next/navigation";
import { handleClientError } from "@/lib/handleClientError";
import { toast } from "sonner";
import { useState } from "react";
import { Loader } from "../Loader";
import { LogOut } from "lucide-react";

// Styles

const styles = {
  logoutBtn:
    "mt-4 px-4 py-2 bg-gradient-to-r from-red-600 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm font-medium flex items-center justify-center gap-2 max-md:hidden",
};

interface Props {
  user: string;
}

const DashboardHeader = ({ user }: Props) => {
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
        <h1 className="max-lg:text-[24px]">
          Welcome Back,{" "}
          {isUsernameLoading ? (
            <Skeleton className="h-6 w-[200px] inline-block loader" />
          ) : (
            <span className="max-[864]:hidden">{user}</span>
          )}
        </h1>
        <p className="text-slate-600 text-sm font-light">
          Today is {new Date().toLocaleDateString()}
        </p>
      </div>

      <button onClick={handleLogout} className={styles.logoutBtn}>
        <LogOut className="text-white w-4 h-4" />
        <span className="max-lg:hidden">Logout</span>
      </button>

      {isLoading && <Loader isLoading={isLoading} />}
    </div>
  );
};

export default DashboardHeader;
