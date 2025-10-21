import React from "react";

const EmptyState = () => {
  return (
    <div className="col-span-full text-center py-16">
      <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg
          className="w-12 h-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-600 mb-2">
        No Projects Yet
      </h3>
      <p className="text-gray-500">Upload your first project to get started</p>
    </div>
  );
};

export default EmptyState;
