"use client";

import { files } from "@/constants";
import {
  Download,
  Eye,
  File,
  Grid3X3,
  List,
  MoreHorizontal,
  Search,
  Share2,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const SearchAndFiles = () => {
  const [viewMode, setViewMode] = useState("grid");
  const [bottomBar, setBottomBar] = useState(false);

  return (
    <div>
      <div className="flex gap-3 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-3 bg-white/70 backdrop-blur-sm rounded-xl border-0 shadow-lg focus:shadow-xl focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-300 text-sm"
          />
        </div>

        <div className="flex bg-white/70 backdrop-blur-sm rounded-xl p-1 shadow-lg">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg transition-all duration-300 ${
              viewMode === "grid"
                ? "bg-blue-500 text-white shadow-md"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-lg transition-all duration-300 max-sm:hidden max-md:hidden ${
              viewMode === "list"
                ? "bg-blue-500 text-white shadow-md"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="flex-1 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-200/50">
          <h3 className="text-xl font-bold text-slate-800">Your Files</h3>
        </div>

        {/** Files */}
        <ScrollArea className="max-h-[calc(100vh-200px)] overflow-auto">
          <div className="space-y-2 px-4 py-2">
            {viewMode === "grid" ? (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 p-4 h-full">
                  {files.map((file, index) => (
                    <div
                      key={file.id}
                      onClick={() => setBottomBar(true)}
                      className="group bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div
                          className={`w-10 h-10 ${file.color} rounded-lg flex items-center justify-center`}
                        >
                          <File className="w-5 h-5 text-white" />
                        </div>
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <MoreHorizontal className="w-4 h-4 text-slate-400" />
                        </button>
                      </div>
                      <h4 className="font-semibold text-slate-800 text-sm mb-2 truncate">
                        {file.name}
                      </h4>
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>{file.size}</span>
                        <span>{file.modified}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-full overflow-y-auto">
                {files.map((file, index) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between p-4 border-b border-slate-200/50 last:border-b-0 hover:bg-slate-50/50 transition-colors duration-300 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 ${file.color} rounded-lg flex items-center justify-center`}
                      >
                        <File className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 text-sm">
                          {file.name}
                        </h4>
                        <p className="text-xs text-slate-500">
                          {file.size} • {file.modified}
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors duration-200">
                          <Download className="w-3.5 h-3.5 text-slate-500" />
                        </button>
                        <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors duration-200">
                          <Share2 className="w-3.5 h-3.5 text-slate-500" />
                        </button>
                        <button className="p-1.5 hover:bg-red-100 rounded-lg transition-colors duration-200">
                          <Trash2 className="w-3.5 h-3.5 text-red-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
      {bottomBar && (
        <div className="mt-4 bg-slate-800 text-white px-4 py-3 rounded-xl shadow-xl flex items-center justify-between animate-slide-up">
          <span className="font-medium text-sm">files selected</span>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors duration-200">
              <Download className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors duration-200">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-red-600 rounded-lg transition-colors duration-200">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchAndFiles;
