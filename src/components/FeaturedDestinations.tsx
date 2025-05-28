"use client";
import { cn } from "@/lib/utils";
import DestinationCard from "./DestinationCard";

const destinations = [
  {
    name: "Barcelona Tour",
    imageUrl: "/assets/images/card-img-1.png",
    rating: 3.5,
    activitiesCount: 196,
    id: 1,
  },
  {
    name: "Australia Tour",
    imageUrl: "/assets/images/card-img-2.png",
    rating: 3.5,
    activitiesCount: 196,
    id: 2,
  },
  {
    name: "London, United Kingdom",
    imageUrl: "/assets/images/card-img-3.png",
    rating: 3.5,
    activitiesCount: 196,
    id: 3,
  },
  {
    name: "Japan Tour",
    imageUrl: "/assets/images/card-img-4.png",
    rating: 3.5,
    activitiesCount: 196,
    id: 4,
  },
  {
    name: "New York City Tour",
    imageUrl: "/assets/images/card-img-5.png",
    rating: 4.0,
    activitiesCount: 150,
    id: 5,
  },
  {
    name: "Rome Adventure",
    imageUrl: "/assets/images/card-img-6.png",
    rating: 4.5,
    activitiesCount: 180,
    id: 6,
  },
];

const FeaturedDestinations = () => {
  return (
    <section className="wrapper py-10 sm:py-20">
      <header className="flex flex-col gap-3.5 mb-10">
        <h2 className="p-30-bold text-[var(--color-dark-100)]">
          Featured Travel Destinations
        </h2>
        <p className="p-18-regular text-[var(--color-gray-100)]">
          Check out some of the best places you can visit around the world.
        </p>
      </header>
      <div className="trip-grid">
        {destinations.map((destination, i) => (
          <DestinationCard
            key={destination.name}
            {...destination}
            className={cn({
              "xl:col-span-3": i === 0,
              "xl:col-span-1": i !== 0,
            })}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedDestinations;
