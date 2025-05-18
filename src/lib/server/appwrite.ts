"use server";
import { Client, Account, Databases, ID, Query, Storage } from "node-appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  if (!session || !session.value) {
    return;
  }

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

export async function getLoggedInUser() {
  try {
    const sessionClient = await createSessionClient();
    if (!sessionClient) return null;

    const { account } = sessionClient;
    return await account.get();
  } catch (error) {
    return null;
  }
}

export const getExistingUser = async (id: string) => {
  const sessionClient = await createSessionClient();
  if (!sessionClient) return null;

  const databases = sessionClient.database;

  try {
    const result = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!,
      [Query.equal("accountId", id)]
    );

    return result.total > 0 ? result.documents[0] : null;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

export const storeUserData = async () => {
  const sessionClient = await createSessionClient();
  if (!sessionClient) return redirect("/sign-in");

  const { account, database: databases } = sessionClient;

  const user = await account.get();

  try {
    const createdUser = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!,

      ID.unique(),
      {
        accountId: user.$id,
        email: user.email,
        name: user.name,
        joinedAt: new Date().toISOString(),
        imageUrl: "",
      }
    );

    if (!createdUser.$id) return redirect("/sign-in");

    return createdUser;
  } catch (error) {
    console.error("Error storing user data:", error);
    return null;
  }
};

export const logoutUser = async () => {
  const sessionClient = await createSessionClient();
  if (!sessionClient) return;

  await sessionClient.account.deleteSession("current");

  // Clear session cookie
  const cookieStore = await cookies();
  cookieStore.delete("session");

  return { success: true };
};

export const getUser = async () => {
  const sessionClient = await createSessionClient();
  if (!sessionClient) return redirect("/sign-in");

  const { account, database: databases } = sessionClient;
  const user = await account.get();

  try {
    const result = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!,
      [
        Query.equal("accountId", user.$id),
        Query.select(["name", "email", "imageUrl", "joinedAt", "accountId"]),
      ]
    );

    return result.total > 0 ? result.documents[0] : null;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};
