export const dynamic = "force-dynamic";
import {
  Header,
  StatsCard,
  TripCard,
  TripTrendBarChart,
  UserGrowthBarChart,
} from "@/components";
import {
  getTripsByTravelStyle,
  getUserGrowthPerDay,
  getUsersAndTripsStats,
} from "@/lib/dashboard";
import { getAllUsers, getUser } from "@/lib/server/appwrite";
import { getAllTrips, getTripsByUserId } from "@/lib/trips";
import { getMonthNames, parseTripData } from "@/lib/utils";
import { Trip, UsersItineraryCount } from "@/types";
import { DataTable } from "./all-users/data-table";
import { tripColumns, userColumns } from "./columns";

const DashboardPage = async () => {
  let allTripsData: Trip[] = [];
  const [
    users,
    dashboardStats,
    allTripsResponse,
    userGrowth,
    tripsByTravelStyle,
    allUsers,
  ] = await Promise.all([
    getUser(),
    getUsersAndTripsStats(),
    getAllTrips(4, 0),
    getUserGrowthPerDay(),
    getTripsByTravelStyle(),
    getAllUsers(4, 0),
  ]);

  if (allTripsResponse?.allTrips && Array.isArray(allTripsResponse.allTrips)) {
    allTripsData = allTripsResponse.allTrips.map(
      ({ $id, tripDetails, imageUrls }) => ({
        id: $id,
        ...parseTripData(tripDetails),
        imageUrls: imageUrls || [],
      })
    ) as Trip[];
  }

  let mappedUsers: UsersItineraryCount[] = await Promise.all(
    (allUsers?.users ?? []).map(async (user) => {
      const userTrips = await getTripsByUserId(user.$id);
      return {
        imageUrl: user.imageUrl,
        name: user.name,
        count: userTrips.total, 
      };
    })
  );

  mappedUsers = await Promise.all(mappedUsers);

  const { totalUsers, usersJoined, totalTrips, tripsCreated, userRole } =
    dashboardStats;

  return (
    <main className="dashboard wrapper overflow-x-hidden">
      <Header
        title={`Welcome ${users?.name ?? "Admin"} `}
        description="Track activity, trends and popular destinations in real time"
      />

      {/* Stats cards section */}
      <section className="flex flex-col gap-4 sm:gap-6 mt-4 sm:mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 w-full">
          <StatsCard
            headerTitle="Total Users"
            total={totalUsers}
            currentMonthCount={usersJoined.currentMonth}
            lastMonthCount={usersJoined.lastMonth}
            chartData={[
              ...getMonthNames(usersJoined.currentMonth, usersJoined.lastMonth),
            ]}
          />
          <StatsCard
            headerTitle="Total Trips"
            total={totalTrips}
            currentMonthCount={tripsCreated.currentMonth}
            lastMonthCount={tripsCreated.lastMonth}
            chartData={[
              ...getMonthNames(
                tripsCreated.currentMonth,
                tripsCreated.lastMonth
              ),
            ]}
          />
          <StatsCard
            headerTitle="Active Users"
            total={userRole.total}
            currentMonthCount={userRole.currentMonth}
            lastMonthCount={userRole.lastMonth}
            chartData={[
              ...getMonthNames(userRole.currentMonth, userRole.lastMonth),
            ]}
          />
        </div>
      </section>

      <section className="container mx-auto mt-6 sm:mt-10">
        <h1 className="text-lg sm:text-xl font-semibold text-[var(--color-dark-100)]">
          Created Trips
        </h1>
        <div className="trip-grid mt-2 sm:mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {allTripsData.slice(0, 4).map((trip) => (
            <TripCard
              key={trip.id}
              id={trip.id.toString()}
              name={trip.name}
              imageUrl={trip.imageUrls[0]}
              location={trip.itinerary?.[0]?.location ?? ""}
              tags={[trip.interests, trip.travelStyle]}
              price={trip.estimatedPrice}
            />
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 mt-6 sm:mt-10">
        {/* User Growth Chart */}
        <UserGrowthBarChart data={userGrowth} />

        {/* Trip Trend Chart */}
        <TripTrendBarChart data={tripsByTravelStyle} />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 mt-6 sm:mt-10">
        {/* Users Table */}
        <div className="flex flex-col gap-3 sm:gap-4 w-full lg:col-span-5">
          <h3 className="text-lg sm:text-xl font-semibold text-[var(--color-dark-100)]">
            Latest Users
          </h3>
          <DataTable columns={userColumns} data={mappedUsers ?? []} />
        </div>

        {/* Trips Table */}
        <div className="flex flex-col gap-3 sm:gap-4 lg:col-span-7">
          <h3 className="text-lg sm:text-xl font-semibold text-[var(--color-dark-100)]">
            Trips by Interest
          </h3>
          <DataTable columns={tripColumns} data={allTripsData ?? []} />
        </div>
      </section>
    </main>
  );
};

export default DashboardPage;
