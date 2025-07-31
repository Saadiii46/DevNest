import React, { useState } from "react";

// Universal Loader Component - Fixed Version
export const Loader = ({ isVisible = false }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      {/* Loader Container */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Mind-blowing Multi-layered Spinner - Blue to Purple Theme */}
        <div className="relative">
          {/* Outer rotating ring with blue to purple gradient */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-1 animate-spin">
            <div className="w-full h-full bg-black rounded-full"></div>
          </div>

          {/* Middle spinning ring */}
          <div
            className="absolute top-2 left-2 w-20 h-20 border-4 border-transparent border-t-blue-400 border-r-purple-500 rounded-full animate-spin"
            style={{ animationDuration: "0.8s" }}
          ></div>

          {/* Inner counter-rotating ring */}
          <div
            className="absolute top-4 left-4 w-16 h-16 border-4 border-transparent border-t-indigo-400 border-l-violet-500 rounded-full animate-spin"
            style={{ animationDuration: "1.2s", animationDirection: "reverse" }}
          ></div>

          {/* Core pulsing circle */}
          <div className="absolute top-6 left-6 w-12 h-12 bg-gradient-to-r from-cyan-300 to-purple-300 rounded-full animate-pulse"></div>

          {/* Orbiting dots - Blue to Purple theme */}
          <div className="absolute top-1/2 left-1/2 w-20 h-20 -translate-x-1/2 -translate-y-1/2">
            <div
              className="relative w-full h-full animate-spin"
              style={{ animationDuration: "2s" }}
            >
              <div className="absolute top-0 left-1/2 w-2 h-2 bg-blue-400 rounded-full -translate-x-1/2 animate-bounce"></div>
              <div
                className="absolute bottom-0 left-1/2 w-2 h-2 bg-purple-400 rounded-full -translate-x-1/2 animate-bounce"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <div
                className="absolute left-0 top-1/2 w-2 h-2 bg-indigo-400 rounded-full -translate-y-1/2 animate-bounce"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute right-0 top-1/2 w-2 h-2 bg-violet-400 rounded-full -translate-y-1/2 animate-bounce"
                style={{ animationDelay: "1.5s" }}
              ></div>
            </div>
          </div>

          {/* Outer glow effect - Blue to Purple */}
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-full opacity-30 blur-lg animate-pulse"></div>
        </div>

        {/* Dynamic Loading Text with Blue to Purple Gradient */}
        <div className="mt-6 text-center">
          <p className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 bg-clip-text text-transparent animate-pulse">
            Loading
            <span className="inline-block animate-bounce ml-1">.</span>
            <span
              className="inline-block animate-bounce ml-1"
              style={{ animationDelay: "0.3s" }}
            >
              .
            </span>
            <span
              className="inline-block animate-bounce ml-1"
              style={{ animationDelay: "0.6s" }}
            >
              .
            </span>
          </p>
          <div className="mt-2 w-32 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full mx-auto">
            <div className="h-full w-8 bg-white rounded-full animate-ping"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
