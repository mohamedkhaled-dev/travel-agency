import { Header, InfoPill, TripCard } from "@/components";
import { Badge } from "@/components/ui/badge";
import { getAllTrips, getTripById } from "@/lib/trips";
import { cn, getFirstWord, parseTripData } from "@/lib/utils";
import { Trip } from "@/types";
import { Star } from "lucide-react";
import Image from "next/image";

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
    { text: travelStyle, bg: "!bg-pink-50 !text-pink-500" },
    { text: groupType, bg: "!bg-primary-50 !text-primary-500" },
    { text: budget, bg: "!bg-success-50 !text-success-700" },
    { text: interests, bg: "!bg-navy-50 !text-navy-500" },
  ];

  const visitTimeAndWeatherInfo = [
    { title: "Best Time To Visit", items: bestTimeToVisit },
    { title: "Weather", items: weatherInfo },
  ];

  return (
    <main className="travel-detail wrapper">
      <Header
        title="Trip Details"
        description="View and edit AI-generated travel plans"
      />

      <section className="container wrapper-md">
        <header>
          <h1 className="p-40-semibold text-dark-100">{name}</h1>
          <div className="flex item-center gap-5">
            <InfoPill
              text={`${duration} day plan`}
              image="/assets/icons/calendar.svg"
            />

            <InfoPill
              text={`${
                itinerary
                  ?.slice(0, 4)
                  .map((item) => item.location)
                  .join(", ") || ""
              } `}
              image="/assets/icons/location-mark.svg"
            />
          </div>
        </header>

        <section className="gallery">
          {imageUrls.map((url: string, i: number) => (
            <Image
              width={800}
              height={400}
              src={url}
              alt={`Trip image no. ${i + 1}`}
              key={i}
              className={cn(
                "w-full rounded-xl object-cover",
                i === 0
                  ? "md:col-span-2 md:row-span-2 h-[330px]"
                  : "md:row-span-1 h-[150px]"
              )}
            />
          ))}
        </section>

        <section className="flex gap-3 md:gap-5 items-center flex-wrap">
          {pillItems.map((pill, i) => (
            <Badge
              key={i}
              className={`${pill.bg} !text-base !font-medium !px-4`}
            >
              {getFirstWord(pill.text)}
            </Badge>
          ))}

          <ul className="flex gap-1 items-center">
            {Array(5)
              .fill(null)
              .map((_, i) => (
                <li key={i}>
                  <Star
                    className="size-[18px]"
                    fill="#FBBF24"
                    stroke="#FBBF24"
                  />
                </li>
              ))}

            <li className="ms-1">
              <Badge className="!bg-yellow-50 !text-yellow-700 font-bold">
                4.9/5
              </Badge>
            </li>
          </ul>
        </section>

        <section className="title">
          <article>
            <h3>
              {duration}-Day {country} {travelStyle}
            </h3>
            <p>
              {budget}, {groupType} and {interests}
            </p>
          </article>

          <h2>{estimatedPrice}</h2>
        </section>

        <p className="text-sm md:text-lg font-normal text-dark-400">
          {description}
        </p>

        <ul className="itinerary">
          {itinerary?.map((dayPlan, i: number) => (
            <li key={i}>
              <h3>
                Day {dayPlan.day}: {dayPlan.location}
              </h3>

              <ul>
                {dayPlan.activities.map((activity, i: number) => (
                  <li key={i}>
                    <span className="flex-shrink-0 p-18-semibold">
                      {activity.time}
                    </span>
                    <p className="flex-grow">{activity.description}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        {visitTimeAndWeatherInfo.map((section) => (
          <section key={section.title} className="visit">
            <div>
              <h3>{section.title}</h3>

              <ul>
                {section.items?.map((item) => (
                  <li key={item}>
                    <p className="flex-grow">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </section>
      <section className="flex flex-col gap-6">
        <h2 className="p-24-semibold text-dark-100">Popular Trips</h2>
        <div className="trip-grid">
          {allTripsData.map(
            ({
              id,
              name,
              imageUrls,
              itinerary,
              interests,
              travelStyle,
              estimatedPrice,
            }) => (
              <TripCard
                id={id}
                key={id}
                name={name}
                location={itinerary?.[0].location ?? ""}
                imageUrl={imageUrls[0]}
                tags={[interests, travelStyle]}
                price={estimatedPrice}
              />
            )
          )}
        </div>
      </section>
    </main>
  );
}
