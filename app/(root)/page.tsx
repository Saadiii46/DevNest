"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const onDrop = useCallback((acceptFiles: File[]) => {
    const file = acceptFiles[0];

    if (file) {
      setSelectedFile(file); // store the file in state
      setMessage(`Selected file: ${file.name} (${file.size} bytes)`);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Upload Your Work</h1>

      {/* Dropzone area */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded p-6 cursor-pointer transition 
          ${
            isDragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 bg-white"
          }`}
      >
        {/* Hidden input under the hood */}
        <input {...getInputProps()} />

        <p className="text-center text-gray-500">
          {isDragActive
            ? "Drop the file here..."
            : "Drag & drop your file here, or click to select"}
        </p>
      </div>

      {/* Display selected file info */}
      {selectedFile && (
        <div className="mt-4 text-sm text-gray-700">
          <strong>{selectedFile.name}</strong> ({selectedFile.size} bytes)
        </div>
      )}

      {/* Show message */}
      {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}
    </div>
  );
}
