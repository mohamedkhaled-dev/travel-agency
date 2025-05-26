"use client";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const router = useRouter();
  return (
    <section className="travel-hero">
      <div className="bg-linear200 bg-cover">
        <section className="wrapper py-48 justify-center items-start flex flex-col gap-6">
          <article className="flex flex-col w-full md:max-w-[520px] gap-3.5 min-h-[400px]">
            <h1 className="p-72-bold text-white">Plan Your Trip with Ease</h1>
            <p className="text-lg font-normal text-white">
              Customize your travel itinerary in minutes pick your destination,
              set your preferences, and explore with confidence.
            </p>
            <button
              onClick={() => router.push("/travel/create")}
              className="button-class text-white p-16-semibold mt-2 h-11"
            >
              Get Started
            </button>
          </article>
        </section>
      </div>
    </section>
  );
};

export default HeroSection;
