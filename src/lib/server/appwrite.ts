"use server";

import { cookies } from "next/headers";
import {
  Account,
  Client,
  Databases,
  ID,
  Models,
  Query,
  Storage,
} from "node-appwrite";

interface GetAllUsersResult {
  users: Models.Document[];
  total: number;
}

/**
 * Creates a session-based Appwrite client.
 * Returns null if no session exists.
 */
export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

  const cookieStore = await cookies();
  const session = cookieStore.get("session");

  if (!session?.value) return null;

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
    get database() {
      return new Databases(client);
    },
    get storage() {
      return new Storage(client);
    },
  };
}

/**
 * Creates an admin-based Appwrite client using the secret API key.
 * Should only be used in secure server contexts.
 */
export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.NEXT_APPWRITE_KEY!);

  return {
    get account() {
      return new Account(client);
    },
    get database() {
      return new Databases(client);
    },
    get storage() {
      return new Storage(client);
    },
  };
}

/**
 * Fetches the currently logged-in user's basic info.
 */
export async function getUserFromAccount() {
  const sessionClient = await createSessionClient();
  if (!sessionClient) return null;

  try {
    const user = await sessionClient.account.get();

    return {
      id: user.$id,
      email: user.email,
      name: user.name || "",
    };
  } catch (error) {
    console.error("Error fetching account user:", error);
    return null;
  }
}

/**
 * Fetches extended user data from the database.
 * Returns null if user or DB record doesn't exist.
 */
export async function getUser() {
  const sessionClient = await createSessionClient();
  if (!sessionClient) return null;

  const { account, database } = sessionClient;

  try {
    const appwriteUser = await account.get();

    const result = await database.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!,
      [Query.equal("accountId", appwriteUser.$id)]
    );

    const dbUser = result.documents[0] || null;

    return dbUser;
  } catch (error) {
    console.error("Error fetching extended user:", error);
    return null;
  }
}

/**
 * Stores user data in the database if it doesn't already exist.
 */
export async function storeUserData() {
  const sessionClient = await createSessionClient();
  if (!sessionClient) {
    console.error("No session client available.");
    return null;
  }

  const { account, database } = sessionClient;

  try {
    const user = await account.get();

    const existingUser = await database.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!,
      [Query.equal("accountId", user.$id)]
    );

    if (existingUser.total > 0) {
      return existingUser.documents[0];
    }

    const createdUser = await database.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!,
      ID.unique(),
      {
        accountId: user.$id,
        email: user.email,
        name: user.name || "",
        joinedAt: new Date().toISOString(),
        imageUrl: "",
      }
    );
    return createdUser;
  } catch (error) {
    console.error("Error storing user data:", error);
    return null;
  }
}

/**
 * Logs out the current user and clears session cookie.
 */
export async function logoutUser() {
  const sessionClient = await createSessionClient();
  if (!sessionClient) return;

  try {
    // Only try to delete session if the user is authenticated
    const account = await sessionClient.account.get();
    if (account) {
      await sessionClient.account.deleteSession("current");
    }
  } catch (e) {
    console.warn("No valid session found during logout.", e);
  }

  const cookieStore = await cookies();
  cookieStore.delete("session");

  return { success: true };
}

/**
 * Fetches list of all users (admin-only).
 */
export async function getAllUsers(
  limit: number,
  offset: number
): Promise<GetAllUsersResult | null> {
  const sessionClient = await createSessionClient();
  if (!sessionClient) return null;

  try {
    const usersData = await sessionClient.database.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!,
      [Query.limit(limit), Query.offset(offset)]
    );

    return {
      users: usersData.documents,
      total: usersData.total,
    };
  } catch (e) {
    console.error("Error fetching users:", e);
    return null;
  }
}