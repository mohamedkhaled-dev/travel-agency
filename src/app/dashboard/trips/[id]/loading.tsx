import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function Loading() {
  return (
    <div className="wrapper my-6 sm:my-10 space-y-6">
      {/* Header */}
      <Skeleton className="bg-light-300 h-10 w-full" />
      <Skeleton className="bg-light-300 h-10 w-1/2" />

      {/* Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            className={cn(
              "relative rounded-[var(--radius-20)] overflow-hidden",
              i === 0
                ? "md:col-span-2 md:row-span-2 h-40 sm:h-60 md:h-80"
                : "h-32 sm:h-40"
            )}
            key={i}
          >
            <Skeleton className="bg-light-300 h-40 md:h-80 rounded-lg" />
            <Skeleton className="bg-light-300 h-4 w-full" />
            <Skeleton className="bg-light-300 h-6 w-16 rounded-full" />
          </div>
        ))}
      </div>

      {/*Tags Sections */}
      <Skeleton className="bg-light-300 h-10 w-full mb-4" />

      {/*Price Sections */}
      <Skeleton className="bg-light-300 h-20 w-full mb-4 mx-2" />

      {/* Description */}
      <Skeleton className="bg-light-300 h-20 w-full mb-2" />

      {/* Trip detail section */}
      <div className="space-y-6 mt-6 sm:mt-8">
        <Skeleton className="bg-light-300 h-6 w-32 rounded-full" />
        <Skeleton className="bg-light-300 h-40 md:h-80 rounded-lg" />
        <Skeleton className="bg-light-300 h-10 w-full" />
        <Skeleton className="bg-light-300 h-10 w-full" />
      </div>

      {/* Time and Weather Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 mt-6 sm:mt-10">
        {Array.from({ length: 2 }).map((_, i) => (
          <div className="flex flex-col gap-4" key={i}>
            <Skeleton className="bg-light-300 h-40 md:h-80 rounded-lg" />
            <Skeleton className="bg-light-300 h-4 w-full" />
            <Skeleton className="bg-light-300 h-4 w-full" />
            <Skeleton className="bg-light-300 h-4 w-full" />
          </div>
        ))}
      </div>

      {/* Trips Gallery */}
      <div className="trip-grid mt-2 sm:mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div className="flex flex-col gap-4" key={i}>
            <Skeleton className="bg-light-300 h-40 md:h-80 rounded-lg" />
            <Skeleton className="bg-light-300 h-4 w-full" />
            <Skeleton className="bg-light-300 h-6 w-16 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
