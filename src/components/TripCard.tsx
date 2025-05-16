"use client";
import { TripCardProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "./ui/badge";
import { cn, getFirstWord } from "@/lib/utils";

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
          ? `/travel${id}`
          : `/trips/${id}`
      }
    >
      <Image width={600} height={160} src={imageUrl} alt={name} />
      <article>
        <h2>{name}</h2>
        <figure>
          <Image
            width={16}
            height={16}
            src={"/assets/icons/location-mark.svg"}
            alt="location"
            className="size-4"
          />
          <figcaption>{location}</figcaption>
        </figure>
      </article>

      <div className="flex gap-1 mt-5 ps-[18px] pe-3.5 pb-5">
        {tags.map((tag, index) => (
          <Badge
            key={index}
            className={cn(
              index === 1 ? "!bg-pink-50 !text-pink-500" : "!bg-success-50 !text-success-700"
            )}
          >
            {getFirstWord(tag)}
          </Badge>
        ))}
      </div>

      <article className="tripCard-pill">{price}</article>
    </Link>
  );
};

export default TripCard;
