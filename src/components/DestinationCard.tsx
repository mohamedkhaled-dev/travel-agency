"use client";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface DestinationCardProps {
  name: string;
  imageUrl: string;
  rating: number;
  activitiesCount: number;
  id: number;
  className?: string;
}

const DestinationCard = ({
  name,
  imageUrl,
  rating,
  activitiesCount,
  id,
  className,
}: DestinationCardProps) => {
  const router = useRouter();

  return (
    <article
      className={cn(
        "relative w-full min-h-64 overflow-hidden rounded-[var(--radius-20)] shadow-[var(--shadow-300)] hover:shadow-[var(--shadow-200)] transition-shadow",
        className
      )}
      onClick={() => router.push(`/travel/${id}`)}
    >
      <Image
        src={imageUrl}
        alt={name}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover absolute inset-0 hover:scale-110 transition-transform"
      />
      <Badge className="absolute top-4 left-4 bg-white text-[var(--color-red-500)] font-semibold px-4 rounded-full">
        {rating.toFixed(1)}
      </Badge>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[var(--color-dark-300)]/90 to-transparent">
        <span className="p-18-semibold text-white block">{name}</span>
        <h3 className="p-16-semibold text-[var(--color-gray-200)]">
          {activitiesCount} Activities
        </h3>
      </div>
    </article>
  );
};

export default DestinationCard;
