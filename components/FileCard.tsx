import { deleteFile } from "@/lib/actions/file.action";
import { useRouter } from "next/navigation";
import Image from "next/image";

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

  return (
    <div className="relative border rounded p-4 shadow group">
      {file.type === "image" ? (
        <Image
          src={file.url}
          alt={file.name}
          width={300}
          height={200}
          className="rounded"
        />
      ) : (
        <div className="w-full h-[200px] flex items-center justify-center border">
          {file.extension.toUpperCase()}
        </div>
      )}

      <div className="mt-2 text-sm font-medium">{file.name}</div>
      <div className="text-xs text-gray-500">
        {(file.size / 1024).toFixed(1)} KB
      </div>

      <button
        onClick={handleDelete}
        className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs"
      >
        Delete
      </button>
    </div>
  );
};

export default FileCard;
