import { deleteFile } from "@/lib/actions/file.action";
import { useRouter } from "next/navigation";

interface FileType {
  file: {
    $id: string;
    name: string;
    url: string;
    type: string;
    extension: string;
    size: number;
    owner: string;
    accountId: string;
    bucketField: string;
    users: string[];
  };
}

const FileCard = ({ file }: FileType) => {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmDelete = confirm(`Delete file "${file.name}"?`);

    if (!confirmDelete) return;

    const res = await deleteFile(file.$id, file.bucketField);

    if (res.succes) {
      alert("File deleted successfully");
      router.refresh();
    } else {
      alert("Failed to delete file");
    }
  };

  return <div></div>;
};

export default FileCard;
