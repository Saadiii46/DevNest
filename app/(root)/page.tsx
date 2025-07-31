import InfoCard from "@/components/InfoCard";
import { Files, formatFileSize, formatTimeAgo } from "@/constants";
import { getUserFiles } from "@/lib/actions/file.action";
import { getCurrentUser } from "@/lib/actions/user.action";
import React from "react";
import { HardDrive } from "lucide-react";
import SearchAndFiles from "@/components/SearchAndFiles";
import FileUploader from "@/components/FileUploader";
import { File } from "lucide-react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";

export default async function Home() {
  const currentUser = await getCurrentUser();

  const userFiles = await getUserFiles({
    ownerId: currentUser.$id,
  });

  const recentUpload = userFiles[0]?.$createdAt;
  const lastUpload = formatTimeAgo(recentUpload);

  // Frontend

  return (
    <div className="main-header">
      {/** Gradiant Color */}
      <div className="gradiant-main">
        <div className="gradiant-color"></div>
      </div>
      {/** Header */}
      <div className="">
        <DashboardHeader user={currentUser.fullName} />
      </div>

      {/** Grid Section */}

      <div className="grid-main">
        {/* Left Column */}
        <div className="col-span-12 lg:col-span-4 p-4 flex flex-col gap-4">
          <div className="gap-16 flex flex-col">
            <div className="flex flex-col gap-4">
              <DashboardStats ownerId={currentUser.$id} />
            </div>
            <div>
              <FileUploader />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-12 lg:col-span-8 p-4 max-h-screen overflow-y-auto">
          {/* Right panel content */}
          <div className="flex flex-col">
            <SearchAndFiles lastUpload={lastUpload} ownerId={currentUser.$id} />
          </div>
        </div>
      </div>
    </div>
  );
}
