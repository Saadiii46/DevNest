export const appwriteConfig = {
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
  endpointUrl: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
  usersCollectionId: process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!,
  filesCollectionId: process.env.NEXT_PUBLIC_APPWRITE_FILES_COLLECTION_ID!,
  commentsCollectionId:
    process.env.NEXT_PUBLIC_APPWRITE_COMMENTS_COLLECTION_ID!,
  bucketId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
  functionId: process.env.NEXT_PUBLIC_EXTRACT_FUNCTION_ID!,
  secretKey: process.env.APPWRITE_SECRET_KEY!,
};
