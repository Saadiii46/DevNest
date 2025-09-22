"use client";

import React, { useEffect, useState } from "react";
import { ProjectIcon } from "./ProjectIcon";
import StatusBadge from "./StatusBadge";
import ActionButtons from "./ActionButtons";
import { FileType, formatTimeAgo } from "@/constants";

interface ProjectCardProps {
  project: FileType;
  index: number;
}

const ProjectCard = ({ index, project }: ProjectCardProps) => {
  const [lastUpload, setlastUpload] = useState<string>("");

  useEffect(() => {
    setlastUpload(formatTimeAgo(project.$createdAt));
  }, [project.$createdAt]);

  return (
    <div
      className="bg-white rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 border border-gray-100 transition-all duration-300"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="p-6">
        {/* Project Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              {/* <ProjectIcon path={project.icon} /> */}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-gray-800 truncate">
                {project.name}
              </h3>
              <p className="text-sm text-gray-500">{project.type}</p>
            </div>
          </div>
          {/* <StatusBadge status={project.status} /> */}
        </div>

        {/* Project Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-lg font-bold text-gray-800">
              {/* {project.files} */}
            </div>
            <div className="text-xs text-gray-500">Files</div>
          </div>
          <div className="text-center border-l border-r border-gray-200">
            <div className="text-xs font-bold text-gray-800">
              {project.size}
            </div>
            <div className="text-xs text-gray-500">Size</div>
          </div>
          <div className="text-center">
            <div className="text-xs font-medium text-gray-600">
              {lastUpload}
            </div>
            <div className="text-xs text-gray-500">Uploaded</div>
          </div>
        </div>

        {/* Action Button */}
        <ActionButtons project={project} />
      </div>
    </div>
  );
};

export default ProjectCard;
