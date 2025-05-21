import { Header } from "@/components";

const TripsPage = () => {
  return (
    <main className="all-users wrapper">
      <Header
        ctaText="Create a trip"
        ctaUrl="/dashboard/trips/create"
        title="Trips "
        description="View and edit AI-generated travel plans"
      />
    </main>
  );
};

export default TripsPage;
