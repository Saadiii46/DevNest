"use client";

import InfoCard from "@/components/InfoCard";
import { formatFileSize, formatTimeAgo, stats } from "@/constants";
import { getUserFiles } from "@/lib/actions/file.action";
import { getCurrentUser } from "@/lib/actions/user.action";
import { useState, useEffect } from "react";
import React from "react";
import { File, HardDrive, Clock, Search } from "lucide-react";
import SearchAndFiles from "@/components/SearchAndFiles";
import FileUploader from "@/components/FileUploader";

export default function Home() {
  // Use States

  const [files, setFiles] = useState<any[]>([]);
  const [username, setUsername] = useState("");
  const [totalFiles, setTotalFiles] = useState<number>(0);
  const [totalStorage, setTotalStorage] = useState<string>("0");
  const [lastUplaod, setLastUpload] = useState("");

  // Fetching User Files

  const fetchFiles = async () => {
    const currentUser = await getCurrentUser(); // Getting current user

    if (!currentUser) return;
    if (currentUser) setUsername(currentUser.fullName);

    const userFiles = await getUserFiles(currentUser.$id);

    setFiles(userFiles);
    setTotalFiles(userFiles.length);

    const totalSize = files.reduce((acc, file) => acc + (file.size || 0), 0);
    setTotalStorage(formatFileSize(totalSize));

    const recentUpload = userFiles[0]?.$createdAt;

    if (recentUpload) {
      setLastUpload(formatTimeAgo(recentUpload));
    }
  };

  // Use Effect

  useEffect(() => {
    fetchFiles();
  }, []);

  // Frontend

  return (
    <div className="main-header">
      {/** Gradiant Color */}
      <div className="gradiant-main">
        <div className="gradiant-color"></div>
      </div>
      {/** Header */}
      <div className="header">
        <h1>Welcome Back, {username}</h1>
        <p className="text-slate-600 text-sm font-light">
          Today is {new Date().toLocaleDateString()}
        </p>
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
              />
              <InfoCard
                label="Storage Used"
                count={totalStorage}
                className="bg-purple-50 p-2 rounded-lg text-slate-700"
                icon={<HardDrive />}
              />
              <InfoCard
                label="Last Uploaded"
                count={lastUplaod}
                className="bg-emerald-50 p-2 rounded-lg text-slate-700"
                icon={<Clock />}
              />
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
            <SearchAndFiles />
          </div>
        </div>
      </div>
    </div>
  );
}
