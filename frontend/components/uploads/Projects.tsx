"use client";

import React from "react";
import ProjectCard from "./ProjectCard";
import { FileType } from "@/constants";
import ActionButtons from "./ActionButtons";

interface ProjectProps {
  userProjects: FileType[];
}

const Projects = ({ userProjects }: ProjectProps) => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userProjects.map((project, index) => (
            <ProjectCard
              key={userProjects.length + index}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
