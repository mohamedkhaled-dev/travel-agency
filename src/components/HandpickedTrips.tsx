import { getHandpickedTrips } from "@/lib/trips";
import TripCard from "./TripCard";
import { Trip } from "@/types";
import { parseTripData } from "@/lib/utils";

const HandpickedTrips = async () => {
  let trips: Trip[] = [];
  try {
    const { handpickedTrips } = await getHandpickedTrips(4, 0);
    if (handpickedTrips && Array.isArray(handpickedTrips)) {
      trips = handpickedTrips.map(({ $id, tripDetails, imageUrls }) => ({
        id: $id,
        ...parseTripData(tripDetails),
        imageUrls: imageUrls || [],
      })) as Trip[];
    } else {
      console.warn("No trips found or invalid response format");
    }
  } catch (error) {
    console.error("Error fetching or parsing trip data:", error);
  }

  return (
    <section className="wrapper py-10 sm:pb-20 sm:pt-0">
      <header className="flex flex-col gap-3.5 mb-10">
        <h2 className="p-30-bold text-[var(--color-dark-100)]">
          Handpicked Trips
        </h2>
        <p className="p-18-regular text-[var(--color-gray-100)]">
          Browse well-planned trips designed for different travel styles and
          interests.
        </p>
      </header>
      <div className="trip-grid">
        {trips.map((trip) => (
          <TripCard
            id={trip.id}
            key={trip.id}
            name={trip.name}
            location={trip.itinerary?.[0]?.location ?? ""}
            imageUrl={trip.imageUrls[0] ?? ""}
            tags={[trip.interests, trip.travelStyle]}
            price={trip.estimatedPrice}
          />
        ))}
      </div>
    </section>
  );
};

export default HandpickedTrips;
