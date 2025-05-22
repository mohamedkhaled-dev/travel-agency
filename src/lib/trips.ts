import { createSessionClient } from "@/lib/server/appwrite";
import { Query } from "node-appwrite";

export const getAllTrips = async (limit: number, offset: number) => {
  const sessionClient = await createSessionClient();
  const allTrips = await sessionClient?.database.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_TRIPS_COLLECTION_ID!,
    [Query.limit(limit), Query.offset(offset), Query.orderDesc("createdAt")]
  );

  if (allTrips?.total === 0) {
    console.error("No trips found");
    return { allTrips: {}, total: 0 };
  }

  return {
    allTrips: allTrips?.documents,
    total: allTrips?.total,
  };
};

export const getTripById = async (tripId: string) => {
  const sessionClient = await createSessionClient();
  const trip = await sessionClient?.database.getDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_TRIPS_COLLECTION_ID!,
    tripId
  );

  if (!trip?.$id) {
    console.error("No trip found");
    return null;
  }

  return trip;
};
