// import React, { useState, useRef } from "react";
import {
  Download,
  Eye,
  MessageCircle,
  Send,
  User,
  Calendar,
  File,
} from "lucide-react";

import { getSharedFile } from "@/lib/actions/file.action";
import { notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/actions/user.action";
import { getFileIcon } from "@/constants/GetFileIcon";

type ShareParamProps = {
  params: {
    shareId: string;
  };
};

export const dynamic = "force-dynamic";

export default async function MyDrivePublicPage({ params }: ShareParamProps) {
  // Getting file from database

  const file = await getSharedFile(params.shareId);
  const user = await getCurrentUser();

  if (!file || !file.isPublic) {
    notFound();
  }

  const formateDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(file.$createdAt));

  // const isImage = file.extension.match(/(jpg | jpeg | png | gif | webp)/i);
  // // const isVideo = file.extenison.match(/(mp4 | mkv)/i);
  // const isPdf = file.extension === "pdf";

  // const [comments, setComments] = useState([
  //   { id: 1, name: "Anonymous", text: "Great work!", time: "2 hours ago" },
  //   {
  //     id: 2,
  //     name: "John",
  //     text: "Can you update this part?",
  //     time: "1 hour ago",
  //   },
  // ]);
  // const [newComment, setNewComment] = useState({ name: "", text: "" });
  // const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  // const fileInputRef = useRef(null);

  // const handleSubmitComment = () => {
  //   if (newComment.name.trim() && newComment.text.trim()) {
  //     const comment = {
  //       id: Date.now(),
  //       name: newComment.name,
  //       text: newComment.text,
  //       time: "Just now",
  //     };
  //     setComments([...comments, comment]);
  //     setNewComment({ name: "", text: "" });
  //   }
  // };

  // Sample file data
  const fileData = {
    name: "Project_Presentation.pdf",
    size: "2.4 MB",
    uploadedBy: "Sarah Wilson",
    uploadDate: "March 15, 2024",
    downloads: 1247,
    views: 3891,
  };

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
                  <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl text-white hover:from-purple-600 hover:to-blue-600 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-100 rounded-xl p-4 text-center border border-gray-200">
                  <div className="text-2xl font-bold text-gray-900">
                    {fileData.views.toLocaleString()}
                  </div>
                  <div className="text-gray-600 text-sm">Views</div>
                </div>
                <div className="bg-gray-100 rounded-xl p-4 text-center border border-gray-200">
                  <div className="text-2xl font-bold text-gray-900">
                    {fileData.downloads.toLocaleString()}
                  </div>
                  <div className="text-gray-600 text-sm">Downloads</div>
                </div>
                <div className="bg-gray-100 rounded-xl p-4 text-center border border-gray-200">
                  <div className="text-2xl font-bold text-gray-900">
                    {/* {comments.length} */}
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
            <div className="p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                Comments
              </h3>

              {/* Add Comment Form */}
              <div className="mb-8">
                <div className="bg-gray-100 rounded-xl p-6 border border-gray-200">
                  <h4 className="text-gray-900 font-medium mb-4">
                    Leave a Comment
                  </h4>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Your name"
                      // value={newComment.name}
                      // onChange={(e) =>
                      //   setNewComment({ ...newComment, name: e.target.value })
                      // }
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    />
                    <textarea
                      placeholder="Write your comment here..."
                      // value={newComment.text}
                      // onChange={(e) =>
                      //   // setNewComment({ ...newComment, text: e.target.value })
                      // }
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                    />
                    <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl text-white hover:from-purple-600 hover:to-blue-600 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105">
                      <Send className="w-4 h-4" />
                      Submit Comment
                    </button>
                  </div>
                </div>
              </div>

              {/* Comments List */}
              {/* <div className="space-y-4">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="bg-gray-100 rounded-xl p-6 border border-gray-200 hover:bg-gray-200 transition-all duration-200"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h5 className="font-medium text-gray-900">
                            {comment.name}
                          </h5>
                          <span className="text-gray-500 text-sm">
                            {comment.time}
                          </span>
                        </div>
                        <p className="text-gray-700">{comment.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div> */}
            </div>
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
