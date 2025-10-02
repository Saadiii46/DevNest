import React from "react";
import SearchAndFiles from "@/components/SearchAndFiles";
import FileUploader from "@/components/FileUploader";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import { getCurrentUser } from "@/lib/firebase/getCurrentUser";

export default async function Home() {
  const user = await getCurrentUser();

  if (!user) return null;

  return (
    <div className="main-header">
      {/** Header */}
      <div className="">
        <DashboardHeader user={user} />
      </div>

      {/** Grid Section */}

      <div className="grid-main">
        {/* Left Column */}
        <div className="col-span-12 lg:col-span-4 p-4 flex flex-col gap-4">
          <div className="gap-16 flex flex-col">
            <div className="flex flex-col gap-4">
              <DashboardStats />
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
            <SearchAndFiles />
          </div>
        </div>
      </div>
    </div>
  );
}
