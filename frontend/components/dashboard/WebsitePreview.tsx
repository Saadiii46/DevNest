"use client";

import { useState, useRef } from "react";
import { X, Sun, Moon, Copy } from "lucide-react";
import Editor from "@monaco-editor/react";

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
  const [activeView, setActiveView] = useState<"preview" | "code">("preview");
  const [codeView, setCodeView] = useState<"raw" | "formatted">("formatted");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [editedCode, setEditedCode] = useState<string>(htmlCode);

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

  // Get the current code to display (edited code, formatted or raw)
  const getDisplayCode = () => {
    return codeView === "formatted" ? formatHTML(editedCode) : editedCode;
  };

  const displayCode = getDisplayCode();

  // Handle code change in editor
  const handleCodeChange = (value: string | undefined) => {
    if (value !== undefined) {
      // Store the code as-is. If we're in formatted view, we store the formatted version
      // When toggling, we'll handle it appropriately
      setEditedCode(value);
    }
  };

  // When toggling formatted/raw, update editedCode appropriately
  const handleToggleView = () => {
    if (codeView === "formatted") {
      // Switching from formatted to raw - store current display (formatted) as the new edited code
      // This way user can continue editing
      setEditedCode(displayCode);
      setCodeView("raw");
    } else {
      // Switching from raw to formatted - format the current code
      const formatted = formatHTML(editedCode);
      setEditedCode(formatted);
      setCodeView("formatted");
    }
  };

  const [copied, setCopied] = useState(false);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(displayCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  // Inject dark mode styles into HTML
  const getPreviewHTML = () => {
    const codeToPreview = editedCode;
    if (!isDarkMode) return codeToPreview;

    const darkModeStyles = `
      <style id="dark-mode-styles">
        * {
          transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease !important;
        }
        html {
          filter: invert(0.9) hue-rotate(180deg);
          background-color: #1a1a1a !important;
        }
        img, picture, video, svg {
          filter: invert(1) hue-rotate(180deg);
        }
      </style>
    `;

    // Insert dark mode styles before closing head tag or at the beginning
    if (codeToPreview.includes('</head>')) {
      return codeToPreview.replace('</head>', `${darkModeStyles}</head>`);
    } else {
      return darkModeStyles + codeToPreview;
    }
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

        {/* Content Area with Slider */}
        <div className="flex-1 overflow-hidden relative">
          {/* Preview View */}
          <div
            className={`absolute inset-0 flex flex-col bg-white transition-transform duration-300 ease-in-out ${
              activeView === "preview"
                ? "translate-x-0 opacity-100 z-10"
                : "-translate-x-full opacity-0 z-0 pointer-events-none"
            }`}
          >
            <div className="flex items-center justify-between p-2 border-b bg-gray-100">
              <span className="text-sm font-medium text-gray-700">
                Website Preview
              </span>
              <div className="flex items-center gap-2">
                {/* Toggle to code view */}
                <button
                  onClick={() => setActiveView("code")}
                  className="px-3 py-1 text-xs border border-gray-300 text-gray-700 hover:bg-gray-200 rounded transition-colors"
                >
                  View Code
                </button>
                <a
                  href={previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 text-xs bg-blue-600 text-white hover:bg-blue-700 rounded transition-colors"
                >
                  Open in New Tab
                </a>
              </div>
            </div>
            <div className="flex-1 overflow-auto bg-gray-100">
              <iframe
                key={`${isDarkMode ? "dark" : "light"}-${editedCode.substring(0, 50)}`}
                srcDoc={getPreviewHTML()}
                className="w-full h-full border-0 bg-white"
                title="Website Preview"
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
              />
            </div>
          </div>

          {/* Code View */}
          <div
            className={`absolute inset-0 flex flex-col bg-[#1e1e1e] transition-transform duration-300 ease-in-out ${
              activeView === "code"
                ? "translate-x-0 opacity-100 z-10"
                : "translate-x-full opacity-0 z-0 pointer-events-none"
            }`}
          >
            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700 bg-[#252526]">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-red-500/80" />
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-3 text-xs font-medium text-gray-400">
                  HTML Code
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleToggleView}
                  className="px-3 py-1 text-xs bg-[#3c3c3c] hover:bg-[#4a4a4a] text-gray-300 rounded transition-colors border border-gray-600"
                >
                  {codeView === "formatted" ? "Raw HTML" : "Formatted"}
                </button>
                <button
                  onClick={handleCopyCode}
                  className="px-3 py-1 text-xs bg-[#3c3c3c] hover:bg-[#4a4a4a] text-gray-300 rounded transition-colors border border-gray-600 flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" />
                  {copied ? "Copied!" : "Copy"}
                </button>
                <button
                  onClick={() => setActiveView("preview")}
                  className="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                >
                  View Preview
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              <Editor
                height="100%"
                language="html"
                value={displayCode}
                onChange={handleCodeChange}
                theme="vs-dark"
                options={{
                  readOnly: false,
                  minimap: { enabled: true },
                  fontSize: 14,
                  lineNumbers: "on",
                  wordWrap: "on",
                  automaticLayout: true,
                  scrollBeyondLastLine: false,
                  fontFamily: "'Cascadia Code', 'Fira Code', 'Consolas', 'Courier New', monospace",
                  tabSize: 2,
                  renderWhitespace: "selection",
                  bracketPairColorization: { enabled: true },
                  colorDecorators: true,
                  formatOnPaste: true,
                  formatOnType: true,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
