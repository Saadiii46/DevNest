// utils/getFileIcon.tsx

import { FileText, FileImage, FileVideo, FileAudio, File } from "lucide-react"; // You can customize this

export const getFileIcon = (type: string) => {
  switch (type) {
    case "image":
      return <FileImage className="w-5 h-5 text-white" />;
    case "video":
      return <FileVideo className="w-5 h-5 text-white" />;
    case "audio":
      return <FileAudio className="w-5 h-5 text-white" />;
    case "document":
      return <FileText className="w-5 h-5 text-white" />;
    case "other":
    default:
      return <File className="w-5 h-5 text-white" />;
  }
};
