import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="wrapper space-y-6 p-4 sm:p-6">
      {/* Header */}
      <Skeleton className="bg-light-300 h-10 w-full" />
      <Skeleton className="bg-light-300 h-10 w-1/2" />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 w-full">
        {Array.from({ length: 3 }).map((_, i) => (
          <div className="flex flex-col gap-4" key={i}>
            <Skeleton className="bg-light-300 h-40 md:h-80 rounded-lg" />
            <Skeleton className="bg-light-300 h-4 w-full" />
            <Skeleton className="bg-light-300 h-12 w-full" />
          </div>
        ))}
      </div>

      <Skeleton className="bg-light-300 h-6 w-42" />

      {/* Trips Gallery */}
      <div className="trip-grid mt-2 sm:mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div className="flex flex-col gap-4" key={i}>
            <Skeleton className="bg-light-300 h-40 md:h-80 rounded-lg" />
            <Skeleton className="bg-light-300 h-4 w-full" />
            <Skeleton className="bg-light-300 h-6 w-16 rounded-full" />
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 mt-6 sm:mt-10">
        {Array.from({ length: 2 }).map((_, i) => (
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
