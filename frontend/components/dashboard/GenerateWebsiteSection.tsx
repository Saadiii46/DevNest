"use client";

import { useState, useEffect } from "react";
import WebsitePreview from "./WebsitePreview";

interface GenerateButtonProps {
  folder?: string;
}

export default function GenerateButton({
  folder: propFolder,
}: GenerateButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [htmlCode, setHtmlCode] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [error, setError] = useState("");
  const [availableFolders, setAvailableFolders] = useState<string[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string>("");
  const [isLoadingFolders, setIsLoadingFolders] = useState(true);

  // Fetch available folders on mount
  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const res = await fetch("/api/agent-gather/list-folders");
        const data = await res.json();
        if (data.folders && data.folders.length > 0) {
          setAvailableFolders(data.folders);
          // Use prop folder if provided, otherwise use most recent (first in list)
          setSelectedFolder(propFolder || data.folders[0]);
        }
      } catch (err) {
        console.error("Failed to fetch folders:", err);
      } finally {
        setIsLoadingFolders(false);
      }
    };

    fetchFolders();
  }, [propFolder]);

  const handleGenerate = async () => {
    if (!selectedFolder) {
      setError("Please select a folder first");
      return;
    }

    setIsGenerating(true);
    setError("");

    try {
      const res = await fetch("/api/agent-gather/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder: selectedFolder }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        const errorMessage =
          data.message || data.error || "Failed to generate website";
        throw new Error(errorMessage);
      }

      setHtmlCode(data.htmlCode || "");
      setPreviewUrl(data.redirectUrl || "");
      setShowPreview(true);
    } catch (err: any) {
      setError(err.message || "Failed to generate website. Please try again.");
      console.error("Generation error:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  if (isLoadingFolders) {
    return (
      <div className="w-full mt-4 p-4 bg-gray-50 rounded-lg text-center text-gray-600">
        Loading available projects...
      </div>
    );
  }

  if (availableFolders.length === 0) {
    return (
      <div className="w-full mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-yellow-800 text-sm">
          No projects found. Please create a project summary first by using the
          agent chat.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="w-full">
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Project Folder:
          </label>
          <select
            value={selectedFolder}
            onChange={(e) => setSelectedFolder(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            {availableFolders.map((folder) => (
              <option key={folder} value={folder}>
                {folder}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleGenerate}
          disabled={isGenerating || !selectedFolder}
          className="w-full mt-4 py-2 rounded-lg text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {isGenerating ? "Generating Website..." : "Generate Website"}
        </button>

        {error && (
          <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}
      </div>

      {showPreview && htmlCode && previewUrl && (
        <WebsitePreview
          htmlCode={htmlCode}
          previewUrl={previewUrl}
          onClose={() => setShowPreview(false)}
        />
      )}
    </>
  );
}
