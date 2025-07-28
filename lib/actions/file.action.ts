"use server";

import { InputFile } from "node-appwrite/file";
import { createAdminClient, createSessionClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { ID, Query } from "node-appwrite";
import { getFileType } from "../utils";
import { Files } from "@/constants";

interface UploadFilesParams {
  file: File;
  ownerId: string;
  accountId: string;
}

const getFileExtension = (filename: string): string => {
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
};

export const uploadFiles = async ({
  file,
  ownerId,
  accountId,
}: UploadFilesParams) => {
  try {
    const { storage, databases } = await createAdminClient();
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const inputFile = InputFile.fromBuffer(buffer, file.name);

    const bucketFile = await storage.createFile(
      appwriteConfig.bucketId,
      ID.unique(),
      inputFile
    );

    const extension = getFileExtension(file.name);
    const fileType = getFileType(extension);
    const fileUrl = `${appwriteConfig.endpointUrl}/storage/buckets/${appwriteConfig.bucketId}/files/${bucketFile.$id}/view?project=${appwriteConfig.projectId}`;

    const fileDocument = {
      name: file.name,
      url: fileUrl,
      type: fileType,
      bucketField: bucketFile.$id,
      accountId: accountId,
      owner: ownerId,
      extension: extension,
      size: file.size,
      users: [ownerId],
    };

    console.log("File size:", file.size);

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

export const getUserFiles = async (ownerId: string): Promise<Files[]> => {
  try {
    const { databases } = await createAdminClient();

    const files = await databases.listDocuments<Files>(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      [Query.equal("owner", ownerId), Query.orderDesc("$createdAt")]
    );

    return files.documents;
  } catch (error) {
    console.error("Error fetching files", error);
    return [];
  }
};

export const deleteFile = async (fileId: string, bucketField: string) => {
  try {
    const { storage, databases } = await createAdminClient();
    await storage.deleteFile(appwriteConfig.bucketId, bucketField);

    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      fileId
    );

    return { succes: true };
  } catch (error) {
    console.error("Failed to delete file", error);
    throw new Error("Failed to delete file");
  }
};

export const enableFileSharing = async (fileId: string) => {
  const { databases } = await createAdminClient();
  const shareId = ID.unique();
  const now = new Date();

  const expireLink = new Date(
    now.getTime() + 24 * 60 * 60 * 1000
  ).toISOString();

  const result = await databases.updateDocument(
    appwriteConfig.databaseId,
    appwriteConfig.filesCollectionId,
    fileId,
    {
      isPublic: true,
      shareId: shareId,
      expiresAt: expireLink,
    }
  );

  return result;
};

export const getSharedFile = async (shareId: string) => {
  const { databases } = await createAdminClient();

  const res = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.filesCollectionId,
    [Query.equal("shareId", [shareId])]
  );

  return res.total > 0 ? res.documents[0] : null;
};

export const trackFileViews = async (fileId: string, currentViews: number) => {
  const { databases } = await createAdminClient();

  const updated = await databases.updateDocument(
    appwriteConfig.databaseId,
    appwriteConfig.filesCollectionId,
    fileId,
    {
      views: currentViews + 1,
    }
  );

  return updated;
};

export const trackDownloads = async (fileId: string, currentCount: number) => {
  const { databases } = await createAdminClient();

  const downloadCount = await databases.updateDocument(
    appwriteConfig.databaseId,
    appwriteConfig.filesCollectionId,
    fileId,
    {
      downloads: currentCount + 1,
    }
  );

  return downloadCount;
};
