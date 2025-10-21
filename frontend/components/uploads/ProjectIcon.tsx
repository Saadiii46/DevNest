import React from "react";

interface ProjectIconProps {
  path: string;
}

export const ProjectIcon = ({ path }: ProjectIconProps) => {
  return (
    <svg
      className="w-5 h-5 text-blue-600"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d={path}
      />
    </svg>
  );
};
