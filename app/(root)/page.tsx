import { getCurrentUser } from "@/lib/firebase/users";
import React from "react";
import SearchAndFiles from "@/components/SearchAndFiles";
import FileUploader from "@/components/FileUploader";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import { auth } from "@/lib/firebase/firebase";

export default async function Home() {
  return (
    <div className="main-header">
      {/** Header */}
      <div className="">
        <DashboardHeader />
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
