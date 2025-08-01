// import React, { useState, useRef } from "react";
import { Eye, User, Calendar, File } from "lucide-react";

import { getSharedFile, trackFileViews } from "@/lib/actions/file.action";
import { notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/actions/user.action";
import { getFileIcon } from "@/constants/GetFileIcon";
import { storage } from "@/lib/appwrite/AppwriteClientUsage";
import { appwriteConfig } from "@/lib/appwrite/config";
import DownloadButton from "@/components/public-page/DownloadButton";
import CommentForm from "@/components/public-page/CommentForm";
import CommentLists from "@/components/public-page/CommentLists";
import { getPublicComments } from "@/lib/actions/comments.action";

// Param type
type PageProps = {
  params: Promise<{ shareId: string }>;
};

export const dynamic = "force-dynamic";

export default async function MyDrivePublicPage({ params }: PageProps) {
  const { shareId } = await params;
  const file = await getSharedFile(shareId); // Calling server action getting shared files

  // If no fil then show not found page
  if (!file || !file.isPublic) {
    notFound();
  }

  const user = await getCurrentUser(); // Getting current user
  const comments = await getPublicComments(file.$id); // Calling server action getting public comments
  const totalComments = comments.length; // Total length of public comments

  // Formate date
  const formateDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(file.$createdAt));

  // Setting that file will be expire after 24 hours
  if (file.expiresAt) {
    const now = new Date();
    const expires = new Date(file.expiresAt);

    // If file expired then show not found page
    if (now > expires) {
      notFound();
    }
  }

  await trackFileViews(file.$id, file.views); // Calling server action to track total file views

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
              <File className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              MyDrive
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Secure file sharing made simple. View, download, and collaborate on
            shared files.
          </p>
        </div>

        {/* Main Content Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-50/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
            {/* File Info Section */}
            <div className="p-8 border-b border-gray-200">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                    {getFileIcon(file.type)}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {file.name}
                    </h2>
                    <div className="flex items-center gap-4 text-gray-600">
                      <span className="flex items-center gap-1">
                        <File className="w-4 h-4" />
                        {file.size}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {user.fullName}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formateDate}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="px-6 py-3 bg-gray-100 backdrop-blur-sm rounded-xl text-gray-700 hover:bg-gray-200 transition-all duration-200 flex items-center gap-2 border border-gray-300 hover:border-gray-400">
                    <Eye className="w-4 h-4" />
                    Preview
                  </button>
                  <a
                    href={storage.getFileDownload(
                      appwriteConfig.bucketId,
                      file.bucketField
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <DownloadButton
                      fileId={file.$id}
                      currentCount={file.downloads}
                    />
                  </a>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-100 rounded-xl p-4 text-center border border-gray-200">
                  <div className="text-2xl font-bold text-gray-900">
                    {file.views.toLocaleString()}
                  </div>
                  <div className="text-gray-600 text-sm">Views</div>
                </div>
                <div className="bg-gray-100 rounded-xl p-4 text-center border border-gray-200">
                  <div className="text-2xl font-bold text-gray-900">
                    {file.downloads.toLocaleString()}
                  </div>
                  <div className="text-gray-600 text-sm">Downloads</div>
                </div>
                <div className="bg-gray-100 rounded-xl p-4 text-center border border-gray-200">
                  <div className="text-2xl font-bold text-gray-900">
                    {totalComments}
                  </div>
                  <div className="text-gray-600 text-sm">Comments</div>
                </div>
                <div className="bg-gray-100 rounded-xl p-4 text-center border border-gray-200">
                  <div className="text-2xl font-bold text-gray-900">100%</div>
                  <div className="text-gray-600 text-sm">Secure</div>
                </div>
              </div>
            </div>

            {/* Preview Section */}
            <div className="p-8 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5" />
                File Preview
              </h3>
              <div className="bg-gray-100 rounded-xl p-8 text-center border border-gray-200 min-h-[200px] flex items-center justify-center">
                <div className="text-gray-500">
                  <File className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">
                    Preview not available for this file type
                  </p>
                  <p className="text-sm mt-2">
                    Click download to view the full file
                  </p>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <CommentForm fileId={file.$id} />
            <CommentLists fileId={file.$id} />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors duration-200">
            <File className="w-4 h-4" />
            <span>Made with MyDrive - Start your own</span>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {/* {isPreviewOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white backdrop-blur-lg rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-gray-200">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">
                File Preview
              </h3>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors duration-200"
              >
                ×
              </button>
            </div>
            <div className="p-8 text-center min-h-[400px] flex items-center justify-center">
              <div className="text-gray-500">
                <File className="w-24 h-24 mx-auto mb-6 opacity-50" />
                <p className="text-xl mb-2">Full preview would appear here</p>
                <p className="text-sm">
                  This is a demo - actual file preview would be loaded
                </p>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}
