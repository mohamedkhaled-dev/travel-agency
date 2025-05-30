export const dynamic = "force-dynamic";
import { Header, TripCard } from "@/components";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getAllTrips } from "@/lib/trips";
import { parseTripData } from "@/lib/utils";
import { Trip } from "@/types";

const TripsPage = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) => {
  // Await the searchParams Promise
  const resolvedSearchParams = await searchParams;

  const limit = 8;
  const page = Math.max(
    1,
    parseInt((resolvedSearchParams.page as string) || "1", 10)
  );
  const offset = (page - 1) * limit;

  let allTripsData: Trip[] = [];
  let totalTrips = 0;

  try {
    const { allTrips, total } = await getAllTrips(limit, offset);

    if (allTrips && Array.isArray(allTrips)) {
      allTripsData = allTrips.map(({ $id, tripDetails, imageUrls }) => ({
        id: $id,
        ...parseTripData(tripDetails),
        imageUrls: imageUrls || [],
      })) as Trip[];
      totalTrips = total || 0;
    } else {
      console.warn("No trips found or invalid response format");
    }
  } catch (error) {
    console.error("Error fetching or parsing trip data:", error);
  }

  // Calculate total pages
  const totalPages = Math.ceil(totalTrips / limit);
  const currentPage = Math.min(page, totalPages || 1);

  return (
    <main className="trips-page wrapper ">
      <Header
        ctaText="Create a trip"
        ctaUrl="/dashboard/trips/create"
        title="Trips"
        description="View and edit AI-generated travel plans"
      />

      <section className="text-[var(--color-dark-100)] mt-4 sm:mt-6">
        <h1 className="p-24-semibold text-[var(--color-dark-100)] text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
          Manage Created Trips
        </h1>
        {allTripsData.length === 0 ? (
          <p className="text-sm sm:text-lg text-[var(--color-dark-400)]">
            No trips available.
          </p>
        ) : (
          <div className="trip-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
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
                  location={itinerary?.[0]?.location ?? ""}
                  imageUrl={imageUrls[0] ?? ""}
                  tags={[interests, travelStyle]}
                  price={estimatedPrice}
                />
              )
            )}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <Pagination className="mt-4 sm:mt-6">
            <PaginationContent className="flex justify-center gap-1 sm:gap-2">
              <PaginationItem>
                <PaginationPrevious
                  href={`/dashboard/trips?page=${currentPage - 1}`}
                  className={
                    currentPage <= 1
                      ? "pointer-events-none cursor-not-allowed opacity-50"
                      : "hover:bg-[var(--color-primary-100)] hover:text-white transition-colors text-sm sm:text-base"
                  }
                  aria-disabled={currentPage <= 1}
                />
              </PaginationItem>

              {/* Render page numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      href={`/dashboard/trips?page=${pageNum}`}
                      isActive={pageNum === currentPage}
                      className={
                        pageNum === currentPage
                          ? "bg-[var(--color-primary-500)] text-white text-sm sm:text-base"
                          : "hover:bg-[var(--color-primary-100)] hover:text-white transition-colors text-sm sm:text-base"
                      }
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}

              <PaginationItem>
                <PaginationNext
                  href={`/dashboard/trips?page=${currentPage + 1}`}
                  className={
                    currentPage >= totalPages
                      ? "pointer-events-none cursor-not-allowed opacity-50"
                      : "hover:bg-[var(--color-primary-100)] hover:text-white transition-colors text-sm sm:text-base"
                  }
                  aria-disabled={currentPage >= totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </section>
    </main>
  );
};

export default TripsPage;
