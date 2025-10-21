import { Upload } from "lucide-react";

const UploadArea = () => {
  return (
    <div className="border-2 border-dashed p-10 rounded-lg">
      <div className="flex flex-col text-center justify-center items-center h-full">
        <div className="upload-area-icon">
          <Upload className="w-6 h-6 text-white" />
        </div>
        <h4 className="text-lg font-semibold text-slate-700 mb-2">
          Drop files here
        </h4>
        <p className="text-sm text-slate-500">or click to browse</p>
        <button className="upload-area-btn">Choose Files</button>
      </div>
    </div>
  );
};

export default UploadArea;
