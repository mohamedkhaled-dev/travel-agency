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
}: TripCardProps) => {
  const pathname = usePathname();
  return (
    <Link
      className="trip-card"
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
        className="w-full h-40 rounded-t-[var(--radius-20)] object-cover aspect-video"
      />
      <article className="flex flex-col gap-3 mt-4 pl-[18px] pr-3.5">
        <h2 className="text-sm md:text-lg font-semibold text-[var(--color-dark-100)] line-clamp-2">
          {name}
        </h2>
        <figure className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <figcaption className="text-xs md:text-sm font-normal text-[var(--color-gray-100)]">
            {location}
          </figcaption>
        </figure>
      </article>
      <div className="flex gap-1 mt-5 pl-[18px] pr-3.5 pb-5">
        {tags.map((tag, index) => (
          <Badge
            key={index}
            className={cn(
              index === 1
                ? "bg-[var(--color-pink-50)] text-[var(--color-pink-500)]"
                : "bg-[var(--color-success-50)] text-[var(--color-success-700)]"
            )}
          >
            {tag && getFirstWord(tag ?? "Shopping")}
          </Badge>
        ))}
      </div>
      <article className="tripCard-pill">{price}</article>
    </Link>
  );
};

export default TripCard;
