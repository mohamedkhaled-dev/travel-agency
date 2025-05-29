"use client";

import { CreateTripForm, Header, SkeletonForm } from "@/components";
import { useCreateTrip } from "@/hooks/useCreateTrip";

export default function DashboardCreateTripPage() {
  const { countriesLoading } = useCreateTrip({
    successRedirectPath: (tripId) => `/dashboard/trips/${tripId}`,
  });

  if (countriesLoading) {
    return <SkeletonForm />;
  }
  return (
    <main className="flex flex-col pb-6 sm:pb-10 wrapper">
      <Header
        title="Add a New Trip"
        description="View and edit AI Generated travel plans"
      />

      <CreateTripForm
        successRedirectPath={(tripId) => `/dashboard/trips/${tripId}`}
      />
    </main>
  );
}
