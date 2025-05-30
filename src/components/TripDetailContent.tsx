import { Header, InfoPill, TripCard } from "@/components";
import { Badge } from "@/components/ui/badge";
import { cn, getFirstWord } from "@/lib/utils";
import { Trip } from "@/types";
import { ArrowLeft, Calendar, CloudSun, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface TripDetailContentProps {
  tripData: Trip | null;
  allTripsData: Trip[];
  imageUrls: string[];
  backLink?: string;
  popularTripsGridClass?: string;
}

const TripDetailContent =({
  tripData,
  allTripsData,
  imageUrls,
  backLink,
  popularTripsGridClass = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
}: TripDetailContentProps) => {
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
    <main className="wrapper my-6 sm:my-10">
      {backLink && (
        <div className="flex items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
          <Link
            href={backLink}
            className="flex items-center gap-1 sm:gap-2 text-[var(--color-gray-100)] hover:text-[var(--color-dark-100)] transition-colors"
          >
            <ArrowLeft className="size-4 sm:size-5" />
            <span className="text-xs sm:text-sm font-medium">Back</span>
          </Link>
        </div>
      )}
      <Header
        title="Trip Details"
        description="View and edit AI-generated travel plans"
      />

      <section className="wrapper space-y-3 sm:space-y-4 mt-2 sm:mt-4">
        {/* Header Section */}
        <header className="space-y-3 sm:space-y-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--color-dark-100)]">
            {name}
          </h1>
          <div className="flex items-center gap-2 sm:gap-4">
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
        <section className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-4">
          {imageUrls.map((url: string, i: number) => (
            <div
              key={i}
              className={cn(
                "relative rounded-[var(--radius-20)] overflow-hidden",
                i === 0
                  ? "md:col-span-2 md:row-span-2 h-40 sm:h-60 md:h-80"
                  : "h-32 sm:h-40"
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
        <section className="flex flex-wrap gap-1 sm:gap-2 mb-2 items-center">
          {pillItems.map((pill, i) => (
            <Badge
              key={i}
              variant="outline"
              className={`${pill.bg} text-xs sm:text-sm md:text-base font-medium px-2 sm:px-3 py-1 rounded-[var(--radius-20)]`}
            >
              {getFirstWord(pill.text)}
            </Badge>
          ))}
          <div className="flex items-center ms-1 sm:ms-2">
            {Array(5)
              .fill(null)
              .map((_, i) => (
                <Star
                  key={i}
                  className="size-3 sm:size-4 md:size-5 fill-yellow-400 text-yellow-400"
                />
              ))}
            <Badge className="ms-1 sm:ms-2 bg-yellow-50 text-yellow-700 font-bold text-xs sm:text-sm">
              4.9/5
            </Badge>
          </div>
        </section>

        {/* Price Section */}
        <div className="bg-[var(--color-primary-50)] p-3 sm:p-4 rounded-[var(--radius-20)] my-2 sm:my-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--color-primary-500)]">
            {estimatedPrice}
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[var(--color-primary-100)]">
            Estimated total price for this trip
          </p>
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base md:text-lg text-[var(--color-gray-100)] leading-relaxed">
          {description}
        </p>

        {/* Itinerary Section */}
        <section className="space-y-6 mt-6 sm:mt-8">
          <h2 className="text-xl sm:text-2xl md:text-2xl font-bold text-[var(--color-dark-100)]">
            Daily Itinerary
          </h2>
          {itinerary?.map((dayPlan, i: number) => (
            <div
              key={i}
              className="bg-white rounded-[var(--radius-20)] shadow-[var(--shadow-300)] p-4 sm:p-6"
            >
              <h3 className="text-base sm:text-medium md:text-xl font-semibold mb-3 sm:mb-4">
                <span className="bg-[var(--color-primary-50)] text-[var(--color-primary-500)] px-2 sm:px-3 py-1 rounded-full mr-2 sm:mr-3">
                  Day {dayPlan.day}
                </span>
                {dayPlan.location}
              </h3>
              <ul className="space-y-3 sm:space-y-4">
                {dayPlan.activities.map((activity, j) => (
                  <li key={j} className="flex items-start gap-2 sm:gap-4">
                    <div>
                      <p className="text-xs sm:text-sm md:text-base font-medium text-[var(--color-dark-100)]">
                        {activity.time}
                      </p>
                      <p className="text-xs sm:text-sm md:text-base text-[var(--color-gray-100)]">
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
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white rounded-[var(--radius-20)] shadow-[var(--shadow-300)] p-4 sm:p-6 my-3 sm:my-4">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center gap-1 sm:gap-2">
              <Calendar className="text-[var(--color-primary-500)] size-4 sm:size-5" />
              Best Time To Visit
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {bestTimeToVisit?.map((item, i) => {
                const [season, ...descriptionParts] = item.split(":");
                const description = descriptionParts.join(":");
                return (
                  <li key={i} className="flex items-start gap-2 sm:gap-3">
                    <div>
                      <p className="font-medium text-[var(--color-dark-100)] text-xs sm:text-sm">
                        {season.trim()}
                      </p>
                      <p className="text-[var(--color-gray-100)] text-xs sm:text-sm">
                        {description.trim()}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="bg-white rounded-[var(--radius-20)] shadow-[var(--shadow-300)] p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center gap-1 sm:gap-2">
              <CloudSun className="text-[var(--color-primary-500)] size-4 sm:size-5" />
              Weather Information
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {weatherInfo?.map((item, i) => {
                const [season, ...tempParts] = item.split(":");
                const temp = tempParts.join(":");
                return (
                  <li key={i} className="flex items-start gap-2 sm:gap-3">
                    <div>
                      <p className="font-medium text-[var(--color-dark-100)] text-xs sm:text-sm">
                        {season.trim()}
                      </p>
                      <p className="text-[var(--color-gray-100)] text-xs sm:text-sm">
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
      <section className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl md:text-2xl font-bold text-[var(--color-dark-100)]">
          Popular Trips
        </h2>
        <div className={`grid ${popularTripsGridClass} gap-3 sm:gap-6`}>
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

export default TripDetailContent