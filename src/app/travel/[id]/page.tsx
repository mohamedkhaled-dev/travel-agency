import { Header, InfoPill, TripCard } from "@/components";
import { Badge } from "@/components/ui/badge";
import { getAllTrips, getTripById } from "@/lib/trips";
import { cn, getFirstWord, parseTripData } from "@/lib/utils";
import { Trip } from "@/types";
import { ArrowLeft, Calendar, CloudSun, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function TripDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let tripData: Trip | null = null;
  let allTripsData: Trip[] = [];
  let imageUrls: string[] = [];

  if (!id) throw new Error("Trip ID is required!");

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

  const {
    name,
    duration,
    itinerary,
    travelStyle,
    groupType,
    budget,
    interests,
    estimatedPrice,
    description,
    bestTimeToVisit = [],
    weatherInfo = [],
    country,
  } = tripData || {};

  const pillItems = [
    {
      text: travelStyle,
      bg: "!bg-[var(--color-pink-50)] !text-[var(--color-pink-500)]",
    },
    {
      text: groupType,
      bg: "!bg-[var(--color-primary-50)] !text-[var(--color-primary-100)]",
    },
    {
      text: budget,
      bg: "!bg-[var(--color-success-50)] !text-[var(--color-success-700)]",
    },
    {
      text: interests,
      bg: "!bg-[var(--color-light-100)] !text-[var(--color-dark-100)]",
    },
  ];

  return (
    <main className="wrapper my-10">
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-[var(--color-gray-100)] hover:text-[var(--color-dark-100)] transition-colors"
        >
          <ArrowLeft className="size-5" />
          <span className="text-sm font-medium">Back</span>
        </Link>
      </div>
      <Header
        title="Trip Details"
        description="View and edit AI-generated travel plans"
      />

      <section className="wrapper space-y-4 mt-4">
        {/* Header Section */}
        <header className="space-y-4">
          <h1 className="text-4xl font-bold text-[var(--color-dark-100)]">
            {name}
          </h1>
          <div className="flex items-center gap-4">
            <InfoPill
              text={`${duration} day plan`}
              image="/assets/icons/calendar.svg"
            />
            <InfoPill
              text={country ?? ""}
              image="/assets/icons/location-mark.svg"
            />
          </div>
        </header>

        {/* Gallery Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {imageUrls.map((url: string, i: number) => (
            <div
              key={i}
              className={cn(
                "relative rounded-[var(--radius-20)] overflow-hidden",
                i === 0 ? "md:col-span-2 md:row-span-2 h-80" : "h-40"
              )}
            >
              <Image
                fill
                src={url}
                alt={`Trip image ${i + 1}`}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={i === 0}
              />
            </div>
          ))}
        </section>

        {/* Tags Section */}
        <section className="flex flex-wrap gap-3 mb-2 items-center">
          {pillItems.map((pill, i) => (
            <Badge
              key={i}
              variant="outline"
              className={`${pill.bg} text-base font-medium px-4 py-1.5 rounded-[var(--radius-20)]`}
            >
              {getFirstWord(pill.text)}
            </Badge>
          ))}

          <div className="flex items-center ms-2">
            {Array(5)
              .fill(null)
              .map((_, i) => (
                <Star
                  key={i}
                  className="size-5 fill-yellow-400 text-yellow-400"
                />
              ))}
            <Badge className="ml-2 bg-yellow-50 text-yellow-700 font-bold">
              4.9/5
            </Badge>
          </div>
        </section>

        {/* Price Section */}
        <div className="bg-[var(--color-primary-50)] p-4 rounded-[var(--radius-20)] my-4">
          <h2 className="text-3xl font-bold text-[var(--color-primary-500)]">
            {estimatedPrice}
          </h2>
          <p className="text-[var(--color-primary-100)]">
            Estimated total price for this trip
          </p>
        </div>

        {/* Description */}
        <p className="text-lg text-[var(--color-gray-100)] leading-relaxed">
          {description}
        </p>

        {/* Itinerary Section */}
        <section className="space-y-8">
          <h2 className="text-2xl font-bold text-[var(--color-dark-100)]">
            Daily Itinerary
          </h2>
          {itinerary?.map((dayPlan, i: number) => (
            <div
              key={i}
              className="bg-white rounded-[var(--radius-20)] shadow-[var(--shadow-300)] p-6"
            >
              <h3 className="text-xl font-semibold mb-4">
                <span className="bg-[var(--color-primary-50)] text-[var(--color-primary-500)] px-3 py-1 rounded-full mr-3">
                  Day {dayPlan.day}
                </span>
                {dayPlan.location}
              </h3>
              <ul className="space-y-4">
                {dayPlan.activities.map((activity, j) => (
                  <li key={j} className="flex items-start gap-4">
                    <div>
                      <p className="font-medium text-[var(--color-dark-100)]">
                        {activity.time}
                      </p>
                      <p className="text-[var(--color-gray-100)]">
                        {activity.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Best Time & Weather Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-[var(--radius-20)] shadow-[var(--shadow-300)] p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Calendar className="text-[var(--color-primary-500)]" size={20} />
              Best Time To Visit
            </h3>
            <ul className="space-y-3">
              {bestTimeToVisit?.map((item, i) => {
                const [season, ...descriptionParts] = item.split(":");
                const description = descriptionParts.join(":");
                return (
                  <li key={i} className="flex items-start gap-3">
                    <div>
                      <p className="font-medium text-[var(--color-dark-100)]">
                        {season.trim()}
                      </p>
                      <p className="text-[var(--color-gray-100)]">
                        {description.trim()}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="bg-white rounded-[var(--radius-20)] shadow-[var(--shadow-300)] p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <CloudSun className="text-[var(--color-primary-500)]" size={20} />
              Weather Information
            </h3>
            <ul className="space-y-3">
              {weatherInfo?.map((item, i) => {
                const [season, ...tempParts] = item.split(":");
                const temp = tempParts.join(":");
                return (
                  <li key={i} className="flex items-start gap-3">
                    <div>
                      <p className="font-medium text-[var(--color-dark-100)]">
                        {season.trim()}
                      </p>
                      <p className="text-[var(--color-gray-100)]">
                        {temp.trim()}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      </section>

      {/* Popular Trips Section */}
      <section className="mt-16 space-y-6">
        <h2 className="text-2xl font-bold text-[var(--color-dark-100)]">
          Popular Trips
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {allTripsData.map((trip) => (
            <TripCard
              key={trip.id}
              id={trip.id}
              name={trip.name}
              location={trip.itinerary?.[0]?.location ?? ""}
              imageUrl={trip.imageUrls[0]}
              tags={[trip.interests, trip.travelStyle]}
              price={trip.estimatedPrice}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
