import { Query } from "appwrite";
import { createSessionClient } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";

export const fetchUserFiles = async () => {
  const { databases, account } = await createSessionClient();
  const user = await account.get();

  const files = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.filesCollectionId,
    [Query.equal("owner", user.$id)]
  );

  return files.documents;
};
