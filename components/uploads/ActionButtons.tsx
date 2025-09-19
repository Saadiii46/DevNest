"use client";

import { FileType } from "@/constants";
import React, { useState } from "react";

interface ActionButtonsProps {
  project: FileType;
  onAction?: () => void;
}

const ActionButtons = ({ project, onAction }: ActionButtonsProps) => {
  return (
    <button
      className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-1"
      type="button"
      onClick={onAction}
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
      <span>Host Project</span>
    </button>
  );
};

export default ActionButtons;
