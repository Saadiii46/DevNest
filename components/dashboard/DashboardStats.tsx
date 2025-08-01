"use client";

import { useQuery } from "@tanstack/react-query";
import InfoCard from "../InfoCard";
import { FileType, formatFileSize } from "@/constants";
import { getUserFiles } from "@/lib/actions/file.action";
import { HardDrive, File } from "lucide-react";

interface Props {
  ownerId: string;
}

const DashboardStats = ({ ownerId }: Props) => {
  const { data: files = [], isLoading } = useQuery<FileType[]>({
    queryKey: ["user-files"],
    queryFn: () => getUserFiles({ ownerId }),
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 5,
  });

  const totalUserFiles = files.length;
  const totalSize = files.reduce((acc, file) => acc + (file.size || 0), 0);
  const totalStorage = formatFileSize(totalSize);

  return (
    <div className="flex flex-col gap-4">
      <InfoCard
        label="Total Files"
        count={totalUserFiles}
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
    </div>
  );
};

export default DashboardStats;
