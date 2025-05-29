import { selectItems } from "@/constants";
import { Skeleton } from "./ui/skeleton";

const SkeletonForm = () => {
  return (
    <section className="flex flex-col space-y-6 p-4 sm:p-6 wrapper">
      {/* Header */}
      <Skeleton className="bg-light-300 h-10 w-1/4" />
      <Skeleton className="bg-light-300 h-10 w-1/2" />

      {/* Form */}
      <section className="wrapper-md mt-2 sm:mt-4">
        <div className="trip-form space-y-4 sm:space-y-6">
          <div>
            <Skeleton className="h-5 w-24  bg-light-300" />
            <Skeleton className="h-10 w-full mt-1 sm:mt-2  bg-light-300" />
          </div>
          <div>
            <Skeleton className="h-5 w-24  bg-light-300" />
            <Skeleton className="h-10 w-full mt-1 sm:mt-2  bg-light-300" />
          </div>
          {selectItems.map((_, index) => (
            <div key={index}>
              <Skeleton className="h-5 w-24  bg-light-300" />
              <Skeleton className="h-10 w-full mt-1 sm:mt-2  bg-light-300" />
            </div>
          ))}
          <div className="mt-4 sm:mt-6">
            <Skeleton className="h-5 w-40  bg-light-300" />
            <Skeleton className="h-40 sm:h-60 w-full mt-1 sm:mt-2  bg-light-300" />
          </div>
          <Skeleton className="h-px w-full bg-[var(--color-gray-200)] mt-4 sm:mt-6 " />
          <Skeleton className="h-10 sm:h-12 w-full  bg-light-300" />
        </div>
      </section>
    </section>
  );
};

export default SkeletonForm;
