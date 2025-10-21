"use client";

import {
  Download,
  Grid3X3,
  List,
  MoreVerticalIcon,
  Search,
  Share2,
  Trash2,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "./ui/skeleton";
import { getFileIcon } from "@/constants/GetFileIcon";
import { FileType, formatTimeAgo, getFileColor } from "@/constants";
import { toast } from "sonner";
import { storage } from "@/lib/appwrite/AppwriteClientUsage";
import { appwriteConfig } from "@/lib/appwrite/config";
import { useQuery } from "@tanstack/react-query";
import {
  deleteFile,
  enableFileSharing,
  getUserFiles,
} from "@/lib/actions/file.action";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Loader } from "./Loader";
import { handleClientError } from "@/lib/handleClientError";
import MobileDrawer from "./MobileDrawer";

const SearchAndFiles = () => {
  // Use states
  const [showDialogue, setShowDialogue] = useState(false);
  const [mobileDrawer, setMobileDrawer] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileType | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list" | null>("grid");
  const [search, setSearch] = useState("");
  const [Loading, setLoading] = useState(false);
  // const {
  //   data: file = [],
  //   isLoading,
  //   refetch,
  // } = useQuery<FileType[]>({
  //   queryKey: ["user-files"],
  //   queryFn: () => getUserFiles({ ownerId }),
  //   staleTime: 1000 * 60 * 2,
  //   gcTime: 1000 * 60 * 5,
  // });

  // const recentUpload = file[0]?.$createdAt;
  // const lastUpload = formatTimeAgo(recentUpload);

  // Filtered files

  // const filteredFiles = file.filter((item) =>
  //   item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  // );

  // Delete user files
  // const handleDelete = useCallback(
  //   async (file: FileType) => {
  //     setLoading(true);
  //     try {
  //       const result = await deleteFile(file.$id, file.bucketField);

  //       if (result?.succes) {
  //         toast("File deleted successfully", {
  //           position: "top-center",
  //         });
  //       }

  //       // refetch();
  //     } catch (error) {
  //       toast("Failed to delete file", {
  //         position: "top-center",
  //       });
  //       handleClientError(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   },
  //   [refetch]
  // );

  // Share user files
  // const handleShare = useCallback(async (file: FileType) => {
  //   setLoading(true);
  //   try {
  //     const result = await enableFileSharing(file.$id);

  //     const publicUrl = `${(window.location, origin)}/share/${result?.shareId}`;

  //     toast("Public link created", {
  //       position: "top-center",
  //     });

  //     navigator.clipboard.writeText(publicUrl);
  //   } catch (error) {
  //     toast("Failed to share id", {
  //       position: "top-center",
  //     });
  //     handleClientError(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);

  // Download user files
  // const handleDownload = useCallback(async (file: FileType) => {
  //   setLoading(true);
  //   try {
  //     const downloadUrl = storage.getFileDownload(
  //       appwriteConfig.bucketId,
  //       file.bucketField
  //     );

  //     const link = document.createElement("a");

  //     link.href = downloadUrl.toString();
  //     link.download = file.name;
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);

  //     console.log("File Info:", file);
  //   } catch (error) {
  //     toast("Failed to download file", {
  //       position: "top-center",
  //     });
  //     handleClientError(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);

  const toggleView = (mode: "grid" | "list") => {
    setViewMode(mode);
    localStorage.setItem("viewMode", mode);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("viewMode") as "grid" | "list";
      if (saved === "list" || saved === "grid") {
        setViewMode(saved);
      }
    }
  }, []);

  if (!viewMode) return null;

  return (
    <div>
      <div className="flex gap-3 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/70 backdrop-blur-sm rounded-xl 
            border-0 shadow-lg focus:shadow-xl focus:ring-2
             focus:ring-blue-500/20 focus:outline-none transition-all duration-300 text-sm
             "
          />
        </div>

        <div className="flex bg-white/70 backdrop-blur-sm rounded-xl p-1 shadow-lg">
          <button
            onClick={() => toggleView("grid")}
            className={`p-2 rounded-lg transition-all duration-300 max-md:hidden  ${
              viewMode === "grid"
                ? "bg-blue-500 text-white shadow-md"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => toggleView("list")}
            className={`p-2 rounded-lg transition-all duration-300  ${
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
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-800 max-[483]:text-[18px] max-[357]:text-[16px]">
              Your Files
            </h3>
            <p className="text-sm text-slate-800 max-[483]:text-[12px] max-[357]:text-[10px]">
              {/* Last Upload: {lastUpload} */}
            </p>
          </div>
        </div>

        {/** Files */}
        <ScrollArea className="max-h-[calc(100vh-200px)] overflow-auto">
          <div className="space-y-2 px-4 py-2">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 p-4 h-full">
                {/* {isLoading
                  ? [...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="group bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-md"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <Skeleton className="w-10 h-10 rounded-lg loader" />
                          <Skeleton className="w-4 h-4 rounded loader" />
                        </div>
                        <Skeleton className="h-4 mb-2 w-3/4 loader" />
                        <div className="flex justify-between">
                          <Skeleton className="h-3 w-12 loader" />
                          <Skeleton className="h-3 w-20 loader" />
                        </div>
                      </div>
                    ))
                  : filteredFiles.map((item) => (
                      <div
                        key={item.$id}
                        className="group bg-white/70 backdrop-blur-sm rounded-xl p-4 
                        shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div
                            className={`w-10 h-10 ${getFileColor(
                              item.type
                            )} rounded-lg flex items-center justify-center`}
                          >
                            {getFileIcon(item.type)}
                          </div>
                          <div>
                            <button
                              onClick={() => handleDownload(item)}
                              className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors duration-200 max-sm:hidden"
                            >
                              <Download className="w-3.5 h-3.5 text-slate-500" />
                            </button>
                            <button
                              onClick={() => handleShare(item)}
                              className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors duration-200"
                            >
                              <Share2 className="w-3.5 h-3.5 text-slate-500" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedFile(item);
                                setShowDialogue(true);
                              }}
                              className="p-1.5 hover:bg-red-100 rounded-lg transition-colors duration-200"
                            >
                              <Trash2 className="w-3.5 h-3.5 text-red-500" />
                            </button>
                          </div>
                        </div>
                        <h4 className="font-semibold text-slate-800 text-sm mb-2 truncate">
                          {item.name}
                        </h4>
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span>{item.size}</span>
                        </div>
                      </div>
                    ))} */}
              </div>
            ) : (
              <div className="h-full overflow-y-auto">
                {/* {isLoading
                  ? [...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-4 bg-white/70 backdrop-blur rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <Skeleton className="w-8 h-8 rounded-lg loader" />
                          <div>
                            <Skeleton className="h-4 w-24 mb-1 loader" />
                            <Skeleton className="h-3 w-32 loader" />
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Skeleton className="w-6 h-6 rounded loader" />
                          <Skeleton className="w-6 h-6 rounded loader" />
                          <Skeleton className="w-6 h-6 rounded loader" />
                        </div>
                      </div>
                    ))
                  : filteredFiles.map((item) => (
                      <div
                        key={item.$id}
                        className="flex items-center justify-between p-4 border-b border-slate-200/50 last:border-b-0 hover:bg-slate-50/50 transition-colors duration-300 cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 ${getFileColor(
                              item.type
                            )} rounded-lg flex items-center justify-center`}
                          >
                            {getFileIcon(item.type)}
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-800 text-sm">
                              {item.name}
                            </h4>
                            <p className="text-xs text-slate-500">
                              {item.size}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDownload(item)}
                            className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors duration-200 max-md:hidden"
                          >
                            <Download className="w-3.5 h-3.5 text-slate-500" />
                          </button>
                          <button
                            onClick={() => handleShare(item)}
                            className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors duration-200 max-md:hidden"
                          >
                            <Share2 className="w-3.5 h-3.5 text-slate-500" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedFile(item);
                              setShowDialogue(true);
                            }}
                            className="p-1.5 hover:bg-red-100 rounded-lg transition-colors duration-200 max-md:hidden"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-red-500" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedFile(item);
                              setMobileDrawer(true);
                            }}
                            className="min-md:hidden"
                          >
                            <MoreVerticalIcon className="w-4 h-4 text-slate-500" />
                          </button>
                        </div>
                      </div>
                    ))} */}
              </div>
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {showDialogue && (
        <AlertDialog open={showDialogue} onOpenChange={setShowDialogue}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Do you want to delete? {selectedFile?.name}
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <button
                className="upload-area-cancel"
                onClick={() => setShowDialogue(false)}
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  if (selectedFile) {
                    // await handleDelete(selectedFile);
                    setShowDialogue(false);
                  }
                }}
                className="upload-area-btn"
              >
                Delete file
              </button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {/** Mobile Drawer */}

      {mobileDrawer && (
        <div>
          <MobileDrawer
            openDrawer={mobileDrawer}
            setOpenDrawer={setMobileDrawer}
            // handleDelete={handleDelete}
            selectedFile={selectedFile}
            // handleShare={handleShare}
            // handleDownload={handleDownload}
          />
        </div>
      )}

      {/** Loader */}
      {Loading && <Loader isLoading={Loading} />}
      {/* {isLoading && <Loader isLoading={isLoading} />} */}
    </div>
  );
};

export default SearchAndFiles;
