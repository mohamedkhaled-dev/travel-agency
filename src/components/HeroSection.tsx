"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

const HeroSection = () => {
  const router = useRouter();
  return (
    <section className="relative min-h-[800px]">
      <Image
        src="/assets/images/hero-img.webp"
        alt="Hero Background"
        fill
        sizes="(max-width: 640px) 640px, (max-width: 768px) 768px, (max-width: 1024px) 1024px, 100vw"
        className="object-cover"
        priority
        quality={85} 
      />
      <div className="absolute inset-0 bg-[var(--background-image-linear200)] bg-cover">
        <div className="wrapper py-48 flex flex-col items-start gap-6">
          <div className="flex flex-col w-full md:max-w-[520px] gap-3.5 min-h-[400px]">
            <h1 className="p-72-bold text-white">Plan Your Trip with Ease</h1>
            <p className="text-lg font-normal text-white">
              Customize your travel itinerary in minutes pick your destination,
              set your preferences, and explore with confidence.
            </p>
            <button
              onClick={() => router.push("/travel/create")}
              className="button-class h-11 p-16-semibold mt-2 cursor-pointer"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
