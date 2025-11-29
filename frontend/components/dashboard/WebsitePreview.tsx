"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface WebsitePreviewProps {
  htmlCode: string;
  previewUrl: string;
  onClose: () => void;
}

export default function WebsitePreview({
  htmlCode,
  previewUrl,
  onClose,
}: WebsitePreviewProps) {
  const [codeView, setCodeView] = useState<"raw" | "formatted">("formatted");
  const [codePanelSize, setCodePanelSize] = useState(50); // Percentage

  // Format HTML code for better readability
  const formatHTML = (html: string): string => {
    let formatted = html;
    let indent = 0;
    const tab = "  ";

    formatted = formatted
      .replace(/></g, ">\n<")
      .split("\n")
      .map((line) => {
        if (line.match(/^<\/\w/)) indent--;
        const indented = tab.repeat(Math.max(0, indent)) + line.trim();
        if (line.match(/^<\w[^>]*[^\/]>.*$/)) indent++;
        return indented;
      })
      .join("\n");

    return formatted;
  };

  const formattedCode =
    codeView === "formatted" ? formatHTML(htmlCode) : htmlCode;

  const handleResize = (e: React.MouseEvent) => {
    const container = e.currentTarget.parentElement;
    if (!container) return;

    const startX = e.clientX;
    const startWidth = codePanelSize;
    const containerWidth = container.offsetWidth;

    const handleMouseMove = (e: MouseEvent) => {
      const diff = ((e.clientX - startX) / containerWidth) * 100;
      const newWidth = Math.max(20, Math.min(80, startWidth + diff));
      setCodePanelSize(newWidth);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full h-full max-w-[95vw] max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">
            Website Preview & Code
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Split View Content */}
        <div className="flex-1 flex overflow-hidden relative">
          {/* Code Panel - Left Side */}
          <div
            className="flex flex-col border-r bg-gray-50"
            style={{ width: `${codePanelSize}%` }}
          >
            <div className="flex items-center justify-between p-2 border-b bg-gray-100">
              <span className="text-sm font-medium text-gray-700">
                HTML Code
              </span>
              <button
                onClick={() =>
                  setCodeView(codeView === "formatted" ? "raw" : "formatted")
                }
                className="px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded transition-colors"
              >
                {codeView === "formatted" ? "Raw" : "Formatted"}
              </button>
            </div>
            <div className="flex-1 overflow-auto bg-gray-900">
              <pre className="p-4 text-sm text-gray-100 font-mono whitespace-pre-wrap">
                <code>{formattedCode}</code>
              </pre>
            </div>
          </div>

          {/* Resize Handle */}
          <div
            onMouseDown={handleResize}
            className="w-1 bg-gray-300 hover:bg-blue-500 cursor-col-resize transition-colors flex items-center justify-center group"
          >
            <div className="w-1 h-12 bg-gray-400 group-hover:bg-blue-600 rounded transition-colors" />
          </div>

          {/* Preview Panel - Right Side */}
          <div
            className="flex flex-col bg-white"
            style={{ width: `${100 - codePanelSize}%` }}
          >
            <div className="flex items-center justify-between p-2 border-b bg-gray-100">
              <span className="text-sm font-medium text-gray-700">
                Website Preview
              </span>
              <a
                href={previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 text-xs bg-blue-600 text-white hover:bg-blue-700 rounded transition-colors"
              >
                Open in New Tab
              </a>
            </div>
            <div className="flex-1 overflow-auto bg-gray-100">
              <iframe
                src={previewUrl}
                className="w-full h-full border-0 bg-white"
                title="Website Preview"
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
