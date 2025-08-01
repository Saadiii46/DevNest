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
  });

  // Use Effect

  useEffect(() => {
    if (selectedFile) {
      setShowDialogue(true);
    }
  }, [selectedFile]);

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
    <div>
      {/* Dropzone area */}
      <div {...getRootProps()}>
        {/* Hidden input under the hood */}
        <input {...getInputProps()} />
        <div className="border-2 border-dashed p-10 rounded-lg">
          <div className="flex flex-col text-center justify-center items-center h-full">
            <div className="upload-area-icon">
              <Upload className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-lg font-semibold text-slate-700 mb-2">
              Drop files here
            </h4>
            <p className="text-sm text-slate-500">or click to browse</p>
            <button onClick={open} className="upload-area-btn">
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
              <button onClick={handleUpload} className="upload-area-btn">
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
