"use client";

import { uploadFiles } from "@/lib/actions/file.action";
import { getCurrentUser } from "@/lib/actions/user.action";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { handleClientError } from "@/lib/handleClientError";
import { Loader } from "./Loader";

// Styles
const styles = {
  uploadBtn:
    "mt-4 px-4 py-2 bg-blue-500 text-white rounded-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm font-medium max-[1078]:text-[13px] max-[1061]:text-[12px] max-[1044]:text-[11px] max-[1027]:text-[10px] max-lg:text-sm",
};

const FileUploader = () => {
  // Use States

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showDialogue, setShowDialogue] = useState(false);

  const router = useRouter();

  const onDrop = useCallback((acceptFiles: File[]) => {
    const file = acceptFiles[0]; // Accept 0th index of file

    if (file) {
      setSelectedFile(file); // store the file in state
    }
  }, []);

  // Use Drop Zone

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    multiple: false,
    noClick: true,
    noKeyboard: true,
    accept: {
      "application/zip": [".zip", ".rar", ".7z"],
    },
  });

  // Use Effect

  useEffect(() => {
    if (selectedFile) {
      setShowDialogue(true);
    }
  }, [selectedFile]);

  // For mobile

  // Handle Upload

  const handleUpload = async () => {
    if (!selectedFile) {
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

      toast("File Uploaded successfully", {
        position: "top-center",
      });
      setSelectedFile(null);

      router.refresh();
    } catch (error) {
      const { message } = handleClientError(error);
      console.log(message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="">
      <div {...getRootProps()}>
        {/* Hidden input under the hood */}
        <input {...getInputProps()} />
        <div className="border-2 border-dashed p-10 rounded-lg">
          <div className="flex flex-col text-center justify-center items-center h-full">
            <div className="upload-area-icon">
              <Upload className="w-6 h-6 text-white" />
            </div>
            <h4
              className="text-lg font-semibold text-slate-700 mb-2 max-[1105]:text-[17px] 
            max-[1085]:text-[16px] max-[1065]:text-[15px] max-[1044]:text-[14px] 
            max-[1025]:text-[13px] max-lg:text-lg"
            >
              Drop files here
            </h4>
            <p
              className="text-sm text-slate-500 max-[1073]:text-[13px]
             max-[1049]:text-[12px] max-[1025]:text-[11px] max-lg:text-sm"
            >
              or click to browse
            </p>
            <button onClick={open} className={styles.uploadBtn}>
              Choose Files
            </button>
          </div>
        </div>
      </div>

      {selectedFile && (
        <AlertDialog open={showDialogue} onOpenChange={setShowDialogue}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Do you want to upload? {selectedFile?.name}
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <button
                className="upload-area-cancel"
                onClick={() => setShowDialogue(false)}
              >
                Cancel
              </button>
              <button onClick={handleUpload} className={styles.uploadBtn}>
                Upload File
              </button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {isUploading && <Loader isLoading={isUploading} />}
    </div>
  );
};

export default FileUploader;
