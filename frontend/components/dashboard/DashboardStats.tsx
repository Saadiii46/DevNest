"use client";

import { useQuery } from "@tanstack/react-query";
import InfoCard from "../InfoCard";
import { FileType, formatFileSize } from "@/constants";
import {
  HardDrive,
  File,
  Activity,
  Clock,
  CheckCircle,
  MessageSquare,
} from "lucide-react";
import { getCurrentUser } from "@/lib/firebase/users";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const DashboardStats = () => {
  const currentUser = getCurrentUser();

  // const { data: files = [], isLoading } = useQuery<FileType[]>({
  //   queryKey: ["user-files"],
  //   queryFn:
  //   staleTime: 1000 * 60 * 2,
  //   gcTime: 1000 * 60 * 5,
  // });

  // const totalUserFiles = files.length;
  // const totalSize = files.reduce((acc, file) => acc + (file.size || 0), 0);
  // const totalStorage = formatFileSize(totalSize);

  const stats = [
    { title: "Active Projects", value: "4", icon: Activity },
    { title: "Tasks Due", value: "12", icon: Clock },
    { title: "Pending Reviews", value: "3", icon: CheckCircle },
    { title: "New Messages", value: "7", icon: MessageSquare },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-headline">{stat.value}</div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;
