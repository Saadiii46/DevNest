"use server";

import { InputFile } from "node-appwrite/file";
import { createApiSessionClient, createSessionClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { ID, Query } from "node-appwrite";
import { getFileType } from "../utils";
import { Files } from "@/constants";
import { handleError } from "../handleError";

interface UploadFilesParams {
  file: File;
  ownerId: string;
  accountId: string;
  projectSlug: string;
}

interface HostProjectsProps {
  fileId: string;
  projectSlug: string;
}

const getFileExtension = (filename: string): string => {
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
};

export const uploadFiles = async ({
  file,
  ownerId,
  accountId,
  projectSlug,
}: UploadFilesParams) => {
  try {
    const { storage, databases } = await createSessionClient();
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
      slug: projectSlug,
      users: [ownerId],
    };

    const saveFile = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      ID.unique(),
      fileDocument
    );

    // await functions.createExecution(
    //   appwriteConfig.functionId,
    //   JSON.stringify({
    //     fileId: bucketFile.$id,
    //     projectSlug: projectSlug,
    //   }),
    //   false
    // );

    return {
      ...saveFile,
      url: fileUrl,
    };
  } catch (error) {
    handleError(error, "Failed to upload file");
  }
};

type Options = {
  ownerId: string;
};

export const getUserFiles = async ({ ownerId }: Options): Promise<Files[]> => {
  try {
    const { databases } = await createSessionClient();

    const queries = [
      Query.equal("owner", ownerId), // Getting files by ownerId
      Query.orderDesc("$createdAt"), // order files by createdAt
    ];
    const files = await databases.listDocuments<Files>(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      queries
    );

    return files.documents;
  } catch (error) {
    handleError(error, "Failed to get user files");
    return [];
  }
};

export const deleteFile = async (fileId: string, bucketField: string) => {
  try {
    const { storage, databases } = await createSessionClient();
    await storage.deleteFile(appwriteConfig.bucketId, bucketField);

    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      fileId
    );

    return { succes: true };
  } catch (error) {
    handleError(error, "Failed to delete file");
  }
};

export const enableFileSharing = async (fileId: string) => {
  try {
    const { databases } = await createSessionClient();
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
  } catch (error) {
    handleError(error, "Failed to enable file sharing");
  }
};

export const getSharedFile = async (shareId: string) => {
  try {
    const { databases } = await createSessionClient();

    const res = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      [Query.equal("shareId", [shareId])]
    );

    return res.total > 0 ? res.documents[0] : null;
  } catch (error) {
    handleError(error, "Failed to get shared files");
  }
};

export const trackFileViews = async (fileId: string, currentViews: number) => {
  try {
    const { databases } = await createSessionClient();

    const updated = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      fileId,
      {
        views: currentViews + 1,
      }
    );

    return updated;
  } catch (error) {
    handleError(error, "Failed to track file view");
  }
};

export const trackDownloads = async (fileId: string, currentCount: number) => {
  try {
    const { databases } = await createSessionClient();

    const downloadCount = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.filesCollectionId,
      fileId,
      {
        downloads: currentCount + 1,
      }
    );

    return downloadCount;
  } catch (error) {
    handleError(error, "Failed to track downloads");
  }
};

export const hostProject = async ({
  fileId,
  projectSlug,
}: HostProjectsProps) => {
  const { functions } = await createApiSessionClient();

  const payload = { fileId, projectSlug };

  try {
    const response = functions.createExecution(
      appwriteConfig.functionId,
      JSON.stringify(payload),
      false,
      "/"
    );

    console.log(fileId, projectSlug);

    console.log("Function response:", response);

    return response;
  } catch (error) {
    handleError(error, "Failed to host project");
  }
};
