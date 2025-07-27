import { Client, Storage } from "appwrite";
import { appwriteConfig } from "./config";

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpointUrl)
  .setProject(appwriteConfig.projectId);

const storage = new Storage(client);

export { storage };
