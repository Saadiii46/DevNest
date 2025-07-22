"use client";

import { Button } from "@/components/ui/button";
import { getUserFiles, uploadFiles } from "@/lib/actions/file.action";
import { getCurrentUser } from "@/lib/actions/user.action";
import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import React from "react";

export default function Home() {
  // Use States

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [files, setFiles] = useState<any[]>([]);

  // Use Call Back

  const onDrop = useCallback((acceptFiles: File[]) => {
    const file = acceptFiles[0];

    if (file) {
      setSelectedFile(file); // store the file in state
      setMessage(`Selected file: ${file.name} (${file.size} bytes)`);
    }
  }, []);

  // Use Effect

  useEffect(() => {
    const fetchFiles = async () => {
      const currentUser = await getCurrentUser();

      if (!currentUser) return;

      const userFiles = await getUserFiles(currentUser.$id);
      setFiles(userFiles);
    };

    fetchFiles();
  }, []);

  // Use Drop Zone

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  // Handle Upload

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage("Please select a file first.");
      return;
    }

    try {
      setIsUploading(true);

      const currentUser = await getCurrentUser();

      if (!currentUser) throw new Error("User not Authenticated");

      await uploadFiles({
        file: selectedFile,
        ownerId: currentUser.$id,
        accountId: currentUser.accountId,
      });

      setMessage("File uploaded succesfully");
      setSelectedFile(null);
    } catch (error) {
      console.error("Failed to upload file", error);
      setMessage("Upload Failed");
    } finally {
      setIsUploading(false);
    }
  };

  // Frontend

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

      <Button
        onClick={handleUpload}
        disabled={!selectedFile || isUploading}
        className={`mt-4 px-4 py-2 rounded text-white transition duration-200 ${
          !selectedFile || isUploading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {isUploading ? "Uploading..." : "Upload File"}
      </Button>

      {/* Show message */}
      {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}

      {files && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Your Files</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
            {files.map((file) => (
              <div
                key={file.$id}
                className="border rounded p-4 shadow-sm hover:shadow-md transition"
              >
                {file.type === "image" ? (
                  <Image
                    src={file.url}
                    alt={file.name}
                    height={40}
                    width={40}
                  />
                ) : (
                  <div>{file.extension.toUpperCase()}</div>
                )}

                <div>{file.name}</div>
                <div>{(file.size / 1024).toFixed(1)} KB</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
