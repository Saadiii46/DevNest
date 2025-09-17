import React from "react";

interface Project {
  id: number;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  status: "ready" | "hosted" | "processing";
  files: number;
  icon: string;
}

interface StatusBadgeProps {
  status: Project["status"];
}

const statusConfig: Record<
  Project["status"],
  { text: string; className: string }
> = {
  ready: { text: "Ready", className: "bg-green-100 text-green-800" },
  hosted: { text: "Hosted", className: "bg-blue-100 text-blue-800" },
  processing: {
    text: "Processing",
    className: "bg-yellow-100 text-yellow-800",
  },
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const { text, className } = statusConfig[status];

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${className}`}>
      {text}
    </span>
  );
};

export default StatusBadge;
