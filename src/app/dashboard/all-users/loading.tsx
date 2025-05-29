import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="all-users wrapper ">
      <Skeleton className="bg-light-300 h-10 w-full" />
      <Skeleton className="bg-light-300 h-10 w-1/2" />

      <div className="flex flex-col gap-4">
        <Skeleton className="bg-light-300 h-40 md:h-80 rounded-lg" />
        <Skeleton className="bg-light-300 h-10 w-full" />
        <Skeleton className="bg-light-300 h-10 w-full" />
      </div>
    </div>
  );
}
