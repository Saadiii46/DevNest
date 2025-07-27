"use client";

import InfoCard from "@/components/InfoCard";
import { Files, formatFileSize, formatTimeAgo } from "@/constants";
import { getUserFiles } from "@/lib/actions/file.action";
import { getCurrentUser, signOutUser } from "@/lib/actions/user.action";
import { useState, useEffect } from "react";
import React from "react";
import { HardDrive } from "lucide-react";
import SearchAndFiles from "@/components/SearchAndFiles";
import FileUploader from "@/components/FileUploader";
import { Skeleton } from "@/components/ui/skeleton";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { File } from "lucide-react";

export default function Home() {
  // Use States

  const [files, setFiles] = useState<Files[]>([]);
  const [username, setUsername] = useState("");
  const [totalFiles, setTotalFiles] = useState<number>(0);
  const [totalStorage, setTotalStorage] = useState<string>("0");
  const [lastUplaod, setLastUpload] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  // Fetching user name

  const fetchUsername = async () => {
    const userNameCookie = Cookies.get("user_fullName");

    if (userNameCookie) {
      setUsername(userNameCookie);
      return;
    }

    const user = await getCurrentUser();
    if (!user) return;
    setUsername(user.fullName);
    Cookies.set("user_fullName", user.fullName, { expires: 1 });
  };

  // Fetching user files

  const fetchFiles = async () => {
    try {
      setIsLoading(true);
      const currentUser = await getCurrentUser(); // Getting current user

      if (!currentUser) {
        return;
      }

      const userFiles = await getUserFiles(currentUser.$id);
      setFiles(userFiles as Files[]);
      setTotalFiles(userFiles.length);

      const totalSize = userFiles.reduce(
        (acc, file) => acc + (file.size || 0),
        0
      );

      setTotalStorage(formatFileSize(totalSize));
      const recentUpload = userFiles[0]?.$createdAt;

      if (recentUpload) {
        setLastUpload(formatTimeAgo(recentUpload));
      }
    } catch (error) {
      console.error("Failed yo fetch user", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Use Effect

  useEffect(() => {
    fetchUsername();
    fetchFiles();
  }, []);

  const isUsernameLoading = !username;

  // Frontend

  return (
    <div className="main-header">
      {/** Gradiant Color */}
      <div className="gradiant-main">
        <div className="gradiant-color"></div>
      </div>
      {/** Header */}
      <div className="flex  justify-between">
        <div className="header">
          <h1>
            Welcome Back,{" "}
            {isUsernameLoading ? (
              <Skeleton className="h-6 w-[200px] inline-block loader" />
            ) : (
              username
            )}
          </h1>
          <p className="text-slate-600 text-sm font-light">
            Today is {new Date().toLocaleDateString()}
          </p>
        </div>
        <div>
          <button onClick={handleLogout} className="upload-area-btn">
            Logout
          </button>
        </div>
      </div>

      {/** Grid Section */}

      <div className="grid-main">
        {/* Left Column */}
        <div className="col-span-12 lg:col-span-4 p-4 flex flex-col gap-4">
          <div className="gap-16 flex flex-col">
            <div className="flex flex-col gap-4">
              <InfoCard
                label="Total Files"
                count={totalFiles}
                className="bg-blue-50 p-2 rounded-lg text-slate-700"
                icon={<File />}
                isLoading={isLoading}
              />
              <InfoCard
                label="Storage Used"
                count={totalStorage}
                className="bg-purple-50 p-2 rounded-lg text-slate-700"
                icon={<HardDrive />}
                isLoading={isLoading}
              />
              {/* <InfoCard
                label="Last Uploaded"
                lastUpload={lastUplaod}
                className="bg-emerald-50 p-2 rounded-lg text-slate-700"
                icon={<Clock />}
                isLoading={isLoading}
              /> */}
            </div>
            <div>
              <FileUploader refreshFiles={fetchFiles} />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-12 lg:col-span-8 p-4 max-h-screen overflow-y-auto">
          {/* Right panel content */}
          <div className="flex flex-col">
            {/** search and filter */}
            <SearchAndFiles
              file={files}
              isLoading={isLoading}
              refreshFiles={fetchFiles}
              lastUpload={lastUplaod}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
