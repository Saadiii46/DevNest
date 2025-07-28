"use server";

import { ID } from "node-appwrite";
import { createSessionClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
import { Query } from "appwrite";

// Prop types
interface CommentProps {
  fileId: string;
  name: string;
  comment: string;
}

export const submitPublicComments = async ({
  fileId,
  name,
  comment,
}: CommentProps) => {
  const { databases } = await createSessionClient(); // Using session client because this is public comments

  await databases.createDocument(
    appwriteConfig.databaseId, // database Id
    appwriteConfig.commentsCollectionId, // Comments collection Id
    ID.unique(), // Unique Id of comments document
    {
      fileId, // Comment on which file
      name, // Name of the commenter
      comment, //  Actual comment
      createdAt: new Date().toISOString(),
    }
  );
};

export const getPublicComments = async (fileId: string) => {
  try {
    const { databases } = await createSessionClient(); // Using session client because this is public comments

    const publicComments = await databases.listDocuments(
      appwriteConfig.databaseId, //  Database Id
      appwriteConfig.commentsCollectionId, // Comments collection Id
      [
        Query.equal("fileId", fileId), // Query comments from document query by fileId
        Query.orderDesc("createdAt"), // Order by createdAt
      ]
    );

    return publicComments.documents;
  } catch (error) {
    console.error("Failed to fetch comments", error);
    return [];
  }
};
