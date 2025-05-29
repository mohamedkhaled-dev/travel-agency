import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="wrapper space-y-6 p-4 sm:p-6">
      {/* Header */}
      <Skeleton className="bg-light-300 h-10 w-full" />
      <Skeleton className="bg-light-300 h-10 w-1/2" />

      {/* Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div className="flex flex-col gap-4" key={i}>
            <Skeleton className="bg-light-300 h-40 md:h-80 rounded-lg" />
            <Skeleton className="bg-light-300 h-4 w-full" />
            <Skeleton className="bg-light-300 h-6 w-16 rounded-full" />
          </div>
        ))}
      </div>

      {/* Sections */}
      <Skeleton className="bg-light-300 h-10 w-full" />
    </div>
  );
}
