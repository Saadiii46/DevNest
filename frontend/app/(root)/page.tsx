import React from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import { getCurrentUser } from "@/lib/firebase/getCurrentUser";
import { ProjectList } from "@/components/dashboard/ProjectList";
import ClientList from "@/components/dashboard/ClientList";
import RecentActivity from "@/components/dashboard/RecentActivity";

export default async function Home() {
  const user = await getCurrentUser();

  if (!user) return null;

  return (
    <div>
      <DashboardHeader />

      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
        <DashboardStats />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ProjectList />
          </div>
          <div className="space-y-6">
            <ClientList />
            <RecentActivity />
          </div>
        </div>
      </main>
    </div>
  );
}
