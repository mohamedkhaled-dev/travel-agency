"use client";

import { CreateTripForm, Header } from "@/components";

export default function DashboardCreateTripPage() {
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
