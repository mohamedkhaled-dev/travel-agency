import { TripDetailContent } from "@/components";
import { fetchTripDetails } from "@/lib/trips";

export default async function TripDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { tripData, allTripsData, imageUrls } = await fetchTripDetails(id);

  return (
    <TripDetailContent
      tripData={tripData}
      allTripsData={allTripsData}
      imageUrls={imageUrls}
      popularTripsGridClass="grid-cols-1 sm:grid-cols-2 xl:grid-cols-4"
    />
  );
}
