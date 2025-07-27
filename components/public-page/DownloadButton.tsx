"use client";

import { appwriteConfig } from "@/lib/appwrite/config";
import { Download } from "lucide-react";

interface Props {
  fileId: string;

  currentCount: number;
}

const DownloadButton = ({ fileId, currentCount }: Props) => {
  const handleDownload = async () => {
    await fetch("/api/download", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileId, currentCount: currentCount }),
    });
  };

  return (
    <div>
      <button
        onClick={handleDownload}
        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl text-white hover:from-purple-600 hover:to-blue-600 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        <Download className="w-4 h-4" />
        Download
      </button>
    </div>
  );
};

export default DownloadButton;
