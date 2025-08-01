import React from "react";

interface Props {
  isLoading: boolean;
}

export const Loader = ({ isLoading }: Props) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center">
      {/* Blurred backdrop */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-md"></div>

      {/* Loader container */}
      <div className="relative z-10 flex flex-col items-center space-y-4">
        {/* Spinning loader */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-white/20 rounded-full"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-white rounded-full animate-spin"></div>
        </div>

        {/* Loading text */}
        <div className="text-white text-lg font-medium">Loading...</div>

        {/* Pulsing dots */}
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <div
            className="w-2 h-2 bg-white rounded-full animate-pulse"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-2 h-2 bg-white rounded-full animate-pulse"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>
    </div>
  );
};
