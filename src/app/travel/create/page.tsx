"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { CreateTripForm, Header, SkeletonForm } from "@/components";
import { useCreateTrip } from "@/hooks/useCreateTrip";

export default function PublicCreateTripPage() {
  const { countriesLoading } = useCreateTrip({
    successRedirectPath: (tripId) => `/travel/${tripId}`,
  });

  if (countriesLoading) {
    return <SkeletonForm />;
  }

  return (
    <main className="flex flex-col my-6 sm:my-10 wrapper">
      <div className="flex items-center gap-2 sm:gap-4 mb-2 sm:mb-4">
        <Link
          href="/"
          className="flex items-center gap-1 sm:gap-2 text-[var(--color-gray-100)] hover:text-[var(--color-dark-100)] transition-colors"
        >
          <ArrowLeft className="size-4 sm:size-5" />
          <span className="text-xs sm:text-sm font-medium">Back</span>
        </Link>
      </div>
      <Header
        title="Add a New Trip"
        description="View and edit AI Generated travel plans"
      />

      <CreateTripForm successRedirectPath={(tripId) => `/travel/${tripId}`} />
    </main>
  );
}
