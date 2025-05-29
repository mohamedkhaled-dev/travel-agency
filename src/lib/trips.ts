import { createSessionClient } from "@/lib/server/appwrite";
import { Trip } from "@/types";
import { Client, Query, Databases } from "node-appwrite";
import { parseTripData } from "./utils";

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

const createPublicClient = () => {
  const client = new Client();

  return client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);
};

export const getHandpickedTrips = async (limit: number, offset: number) => {
  const client = createPublicClient();

  const database = new Databases(client);

  try {
    const response = await database.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_TRIPS_COLLECTION_ID!,
      [
        Query.limit(limit),
        Query.offset(offset),
        Query.orderDesc("$createdAt"),
        Query.equal("isFeatured", true),
      ]
    );

    return {
      handpickedTrips: response.documents,
      total: response.total,
    };
  } catch (error) {
    console.error("Error fetching handpicked trips:", error);
    return {
      handpickedTrips: [],
      total: 0,
    };
  }
};

export async function getTripsByUserId(userId: string) {
  const sessionClient = await createSessionClient();
  if (!sessionClient) return { trips: [], total: 0 };

  try {
    const { database } = sessionClient;
    const response = await database.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_TRIPS_COLLECTION_ID!,
      [Query.equal("userId", userId)]
    );

    return {
      trips: response.documents,
      total: response.total,
    };
  } catch (e) {
    console.error(`Error fetching trips for userId ${userId}:`, e);
    return { trips: [], total: 0 };
  }
}

export async function fetchTripDetails(id: string) {
  if (!id) throw new Error("Trip ID is required!");

  let tripData: Trip | null = null;
  let allTripsData: Trip[] = [];
  let imageUrls: string[] = [];

  try {
    const [trip, allTripsResponse] = await Promise.all([
      getTripById(id),
      getAllTrips(4, 0),
    ]);
    if (trip) {
      tripData = parseTripData(trip.tripDetails) as Trip;
      imageUrls = trip.imageUrls || [];
    }

    if (
      allTripsResponse?.allTrips &&
      Array.isArray(allTripsResponse.allTrips)
    ) {
      allTripsData = allTripsResponse.allTrips.map(
        ({ $id, tripDetails, imageUrls }) => ({
          id: $id,
          ...parseTripData(tripDetails),
          imageUrls: imageUrls || [],
        })
      ) as Trip[];
    }
  } catch (error) {
    console.error("Error fetching or parsing trip data:", error);
  }

  return { tripData, allTripsData, imageUrls };
}
