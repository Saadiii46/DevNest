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

export default async function Home() {
  const currentUser = await getCurrentUser();

  const userFiles = await getUserFiles({
    ownerId: currentUser.$id,
  });

  const totalUserFiles = userFiles.length;
  const totalSize = userFiles.reduce((acc, file) => acc + (file.size || 0), 0);
  const totalStorage = formatFileSize(totalSize);
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
              <InfoCard
                label="Total Files"
                count={totalUserFiles}
                className="bg-blue-50 p-2 rounded-lg text-slate-700"
                icon={<File />}
              />
              <InfoCard
                label="Storage Used"
                count={totalStorage}
                className="bg-purple-50 p-2 rounded-lg text-slate-700"
                icon={<HardDrive />}
              />
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
            <SearchAndFiles
              file={userFiles}
              refreshFiles={userFiles as Files[]}
              lastUpload={lastUpload}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
