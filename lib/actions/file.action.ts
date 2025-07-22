"use server";

import { InputFile } from "node-appwrite/file";
import { createAdminClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { ID } from "node-appwrite";

interface UploadFilesParams {
  file: File;
  ownerId: string;
  accountId: string;
}

const getFileExtension = (filename: string): string => {
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
};

const getFileType = (extension: string): string => {
  const imageExist = ["jpg", "jpeg", "png", "gif"];
  const videoExist = ["mp4", "avi", "mov", "mwv", "flv", "webm"];
  const audioExist = ["mp3", "wav", "ogg"];
  const docExist = ["pdf", "doc", "docx", "txt", "xls", "xlsx", "rtf"];

  const ext = extension.toLowerCase();

  if (imageExist.includes(ext)) return "image";
  if (videoExist.includes(ext)) return "video";
  if (audioExist.includes(ext)) return "audio";
  if (docExist.includes(ext)) return "document";

  return "other";
};

export const uploadFiles = async ({
  file,
  ownerId,
  accountId,
}: UploadFilesParams) => {
  try {
    const { storage, databases } = await createAdminClient();

    const inputFile = InputFile.fromBuffer(
      Buffer.from(await file.arrayBuffer()),
      file.name
    );

    const bucketFile = await storage.createFile(
      appwriteConfig.bucketId,
      ID.unique(),
      inputFile
    );

    const extension = getFileExtension(file.name);
    const fileType = getFileType(extension);

    const fileUrl = await storage.getFileView(
      appwriteConfig.bucketId,
      bucketFile.$id
    );

    const fileDocument = {
      name: file.name,
      url: fileUrl,
      type: fileType,
      bucketId: bucketFile.$id,
      accountId: accountId,
      owner: ownerId,
      extension: extension,
      size: file.size,
      users: [ownerId],
    };

    const saveFile = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      ID.unique(),
      fileDocument
    );

    return {
      ...saveFile,
      url: fileUrl,
    };
  } catch (error) {
    console.error("Error uploading file:", error);
    throw new Error(`Failed to upload file`);
  }
};
