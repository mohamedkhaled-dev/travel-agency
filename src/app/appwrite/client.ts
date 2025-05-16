import { Account, Client, Databases, Storage } from "appwrite";

function getEnvVariable(key: string) {
  const value = process.env[key];
  if (!value) throw new Error(`Missing env variable: ${key}`);
  return value;
}

export const appwriteConfig = {
  endpointUrl: getEnvVariable("NEXT_PUBLIC_APPWRITE_API_ENDPOINT"),
  projectId: getEnvVariable("NEXT_PUBLIC_APPWRITE_PROJECT_ID"),
  apiKey: getEnvVariable("NEXT_PUBLIC_APPWRITE_API_KEY"),
  databaseId: getEnvVariable("NEXT_PUBLIC_APPWRITE_DATABASE_ID"),
  userCollectionId: getEnvVariable("NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID"),
  tripCollectionId: getEnvVariable("NEXT_PUBLIC_APPWRITE_TRIPS_COLLECTION_ID"),
};

const client = new Client()
  .setEndpoint(appwriteConfig.endpointUrl)
  .setProject(appwriteConfig.projectId);

const account = new Account(client);
const database = new Databases(client);
const storage = new Storage(client);

export { client, account, database, storage };
