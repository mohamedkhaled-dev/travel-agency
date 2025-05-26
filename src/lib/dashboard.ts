import { DashboardStats } from "@/types";
import { createSessionClient } from "./server/appwrite";
import { parseTripData } from "./utils";

interface Document {
  [key: string]: unknown;
}

interface UserGrowthData {
  day: string;
  count: number;
}

interface TripsByDayData {
  day: string;
  count: number;
}

interface TripsByTravelStyleData {
  travelStyle: string;
  count: number;
}

type FilterByDate = (params: {
  items: Document[];
  key: string;
  start: string;
  end?: string;
}) => number;

export const getUsersAndTripsStats = async (): Promise<DashboardStats> => {
  const d = new Date();
  const startCurrent = new Date(d.getFullYear(), d.getMonth(), 1).toISOString();
  const startPrev = new Date(
    d.getFullYear(),
    d.getMonth() - 1,
    1
  ).toISOString();
  const endPrev = new Date(d.getFullYear(), d.getMonth(), 0).toISOString();

  const sessionClient = await createSessionClient();
  const [users, trips] = await Promise.all([
    sessionClient?.database.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!
    ),
    sessionClient?.database.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_TRIPS_COLLECTION_ID!
    ),
  ]);

  const filterByDate: FilterByDate = ({ items, key, start, end }) =>
    items.filter((item) => {
      const value = (item as Record<string, unknown>)[key];
      if (typeof value === "string") {
        return value >= start && (!end || value <= end);
      }
      return false;
    }).length;

  const filterUsersByRole = (role: string) => {
    return users?.documents.filter((u: Document) => u.status === role);
  };

  return {
    totalUsers: users?.total ?? 0,
    usersJoined: {
      currentMonth: filterByDate({
        items: users?.documents ?? [],
        key: "joinedAt",
        start: startCurrent,
      }),
      lastMonth: filterByDate({
        items: users?.documents ?? [],
        key: "joinedAt",
        start: startPrev,
        end: endPrev,
      }),
    },
    userRole: {
      total: filterUsersByRole("user")?.length ?? 0,
      currentMonth: filterByDate({
        items: filterUsersByRole("user") ?? [],
        key: "joinedAt",
        start: startCurrent,
      }),
      lastMonth: filterByDate({
        items: filterUsersByRole("user") ?? [],
        key: "joinedAt",
        start: startPrev,
        end: endPrev,
      }),
    },
    totalTrips: trips?.total ?? 0,
    tripsCreated: {
      currentMonth: filterByDate({
        items: trips?.documents ?? [],
        key: "createdAt",
        start: startCurrent,
      }),
      lastMonth: filterByDate({
        items: trips?.documents ?? [],
        key: "createdAt",
        start: startPrev,
        end: endPrev,
      }),
    },
  };
};

export const getUserGrowthPerDay = async (): Promise<UserGrowthData[]> => {
  const sessionClient = await createSessionClient();
  const users = await sessionClient?.database.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!
  );

  const userGrowth = users?.documents.reduce(
    (acc: { [key: string]: number }, user: Document) => {
      const joinedAt = user.joinedAt as string | number | Date | undefined;
      const date = joinedAt ? new Date(joinedAt) : new Date(0);
      const day = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    },
    {}
  );

  return Object.entries(userGrowth || {}).map(([day, count]) => ({
    count: Number(count),
    day,
  }));
};

export const getTripsCreatedPerDay = async (): Promise<TripsByDayData[]> => {
  const sessionClient = await createSessionClient();
  const trips = await sessionClient?.database.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_TRIPS_COLLECTION_ID!
  );

  const tripsGrowth = trips?.documents.reduce(
    (acc: { [key: string]: number }, trip: Document) => {
      const date = new Date(trip.createdAt as string);
      const day = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    },
    {}
  );

  return Object.entries(tripsGrowth || {}).map(([day, count]) => ({
    count: Number(count),
    day,
  }));
};

export const getTripsByTravelStyle = async (): Promise<
  TripsByTravelStyleData[]
> => {
  const sessionClient = await createSessionClient();
  const trips = await sessionClient?.database.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_TRIPS_COLLECTION_ID!
  );

  const travelStyleCounts = trips?.documents.reduce(
    (acc: { [key: string]: number }, trip: Document) => {
      const tripDetail =
        typeof trip.tripDetails === "string"
          ? parseTripData(trip.tripDetails)
          : null;

      if (tripDetail && tripDetail.travelStyle) {
        const travelStyle = tripDetail.travelStyle;
        acc[travelStyle] = (acc[travelStyle] || 0) + 1;
      }

      return acc;
    },
    {}
  );

  return Object.entries(travelStyleCounts || {}).map(
    ([travelStyle, count]) => ({
      count: Number(count),
      travelStyle,
    })
  );
};
