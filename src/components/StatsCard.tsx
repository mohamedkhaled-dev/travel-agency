import { calculateTrendPercentage, cn } from "@/lib/utils";
import type { StatsCard as StatsCardProps } from "@/types";
import Image from "next/image";

const StatsCard = ({
  headerTitle,
  total,
  lastMonthCount,
  currentMonthCount,
}: StatsCardProps) => {
  const { trend, percentage } = calculateTrendPercentage(
    currentMonthCount,
    lastMonthCount
  );
  const isDecrement = trend === "decrement";

  return (
    <article className="stats-card">
      <h3 className="text-base font-medium">{headerTitle}</h3>

      <div className="content">
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl font-semibold">{total}</h2>
          <div className="flex items-center gap-2">
            <figure className="flex items-center gap-1">
              <Image
                width={20}
                height={20}
                className="size-5"
                src={`/assets/icons/${
                  isDecrement ? "arrow-down-red.svg" : "arrow-up-green.svg"
                }`}
                alt="arrow"
              />
              <figcaption
                className={cn(
                  "text-sm font-medium",
                  isDecrement ? "text-red-500" : "text-success-700"
                )}
              >
                {Math.round(percentage)}%
              </figcaption>
            </figure>
            <p className="text-sm font-medium text-gray-100 truncate">
              vs last month
            </p>
          </div>
        </div>
        {/* Replace this with a chart */}
        <Image
         className="xl:w-32 w-full h-full md:h-32 xl:h-full"
          width={60}
          height={60}
          src={`/assets/icons/${
            isDecrement ? "decrement.svg" : "increment.svg"
          }`}
          alt="chart"
        />
      </div>
    </article>
  );
};

export default StatsCard;
