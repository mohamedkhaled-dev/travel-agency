"use client";

import { cn, getFirstWord } from "@/lib/utils";
import { TripCardProps } from "@/types";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "./ui/badge";

const TripCard = ({
  id,
  name,
  location,
  imageUrl,
  tags,
  price,
}: TripCardProps & { loading?: boolean }) => {
  const pathname = usePathname();

  return (
    <Link
      className="trip-card rounded-[var(--radius-20)] overflow-hidden shadow-[var(--shadow-200)] hover:shadow-[var(--shadow-300)] transition-all"
      href={
        pathname === "/" || pathname.startsWith("/travel")
          ? `/travel/${id}`
          : `/dashboard/trips/${id}`
      }
    >
      <Image
        width={600}
        height={160}
        src={imageUrl}
        alt={name}
        className="w-full h-32 sm:h-40 object-cover rounded-t-[var(--radius-20)]"
      />
      <article className="flex flex-col gap-2 sm:gap-3 mt-3 sm:mt-4 p-3 sm:p-4">
        <h2 className="text-xs sm:text-sm md:text-lg font-semibold text-[var(--color-dark-100)] line-clamp-2">
          {name}
        </h2>
        <figure className="flex items-center gap-1 sm:gap-2">
          <MapPin className="w-3 sm:w-4 h-3 sm:h-4" />
          <figcaption className="text-xs sm:text-sm font-normal text-[var(--color-gray-100)]">
            {location}
          </figcaption>
        </figure>
      </article>
      <div className="flex flex-wrap gap-1 sm:gap-2 mt-3 sm:mt-4 p-3 sm:p-4">
        {tags.map((tag, index) => (
          <Badge
            key={index}
            className={cn(
              index === 1
                ? "bg-[var(--color-pink-50)] text-[var(--color-pink-500)]"
                : "bg-[var(--color-success-50)] text-[var(--color-success-700)]",
              "text-xs sm:text-sm"
            )}
          >
            {tag && getFirstWord(tag ?? "Shopping")}
          </Badge>
        ))}
      </div>
      <article className="tripCard-pill bg-[var(--color-primary-50)] text-[var(--color-primary-500)] font-bold text-center p-2 sm:p-3">
        {price}
      </article>
    </Link>
  );
};

export default TripCard;
