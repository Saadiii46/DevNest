"use client";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { FileType } from "@/constants";
import { Download, Share2, Trash2 } from "lucide-react";

interface DrawerProps {
  openDrawer: boolean;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: (file: FileType) => void;
  handleShare: (file: FileType) => void;
  handleDownload: (file: FileType) => void;
  selectedFile: FileType | null;
}

const MobileDrawer = ({
  openDrawer,
  setOpenDrawer,
  handleDelete,
  selectedFile,
  handleShare,
  handleDownload,
}: DrawerProps) => {
  if (!selectedFile) return null;

  return (
    <div>
      <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{selectedFile.name}</DrawerTitle>
            <DrawerDescription asChild>
              <div className="flex flex-col">
                <div className="w-full h-px bg-gray-300 my-4" />
                <div className="ml-4">
                  <button
                    onClick={() => handleDownload(selectedFile)}
                    className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors duration-200
                   flex items-center justify-center gap-4"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-500" /> Download
                  </button>
                </div>
                <div className="ml-4 mt-2">
                  <button
                    onClick={() => handleShare(selectedFile)}
                    className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors duration-200 
                  flex items-center justify-center gap-4"
                  >
                    <Share2 className="w-3.5 h-3.5 text-slate-500" /> Share
                  </button>
                </div>
                <div className="ml-4 mt-2">
                  <button
                    onClick={() => handleDelete(selectedFile)}
                    className="p-1.5 hover:bg-red-100 rounded-lg transition-colors duration-200
                    flex items-center justify-center gap-4 text-red-500"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-red-500" /> Delete
                  </button>
                </div>
              </div>
            </DrawerDescription>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default MobileDrawer;
