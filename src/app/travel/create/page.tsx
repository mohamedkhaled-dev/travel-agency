"use client";

import { ComboBox, Header, WorldMap } from "@/components";
import { comboBoxItems, selectItems } from "@/constants";
import {
  formatKey,
  startGeneratingToasts,
  stopGeneratingToasts,
} from "@/lib/utils";
import { Country, CountryData, TripFormData } from "@/types";
import { ArrowLeft, Ellipsis, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CreateTripPage = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const router = useRouter();
  const [formData, setFormData] = useState<TripFormData>({
    country: "",
    travelStyle: "",
    interest: "",
    budget: "",
    duration: 0,
    groupType: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all ");
        const data = await response.json();
        setCountries(
          data.map((country: CountryData) => ({
            name: country.name.common,
            flag: country.flags.svg || country.flags.png,
            alt: country.flags.alt,
            coordinates: country.latlng,
            value: country.name.common,
            openStreetMap: country.maps?.openStreetMaps,
          }))
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchCountries();
  }, []);

  const countryData = countries?.map((country) => ({
    text: country.name,
    value: country.name,
    flag: country.flag,
    alt: country.alt,
  }));

  const mapData = [
    {
      countryName: formData.country,
      coordinates:
        countries.find((c: Country) => c.name === formData.country)
          ?.coordinates || [],
      color: "#EA382E",
    },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (
      !formData.country ||
      !formData.travelStyle ||
      !formData.interest ||
      !formData.budget ||
      !formData.duration ||
      !formData.groupType
    ) {
      setError("Please fill out all the fields.");
      setLoading(false);
      return;
    }

    if (formData.duration < 1 || formData.duration > 10) {
      setError("Duration must be between 1 and 10 days");
      setLoading(false);
      return;
    }

    // Show generating toasts
    startGeneratingToasts();

    try {
      const response = await fetch("/api/create-trip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          country: formData.country,
          numberOfDays: formData.duration,
          travelStyle: formData.travelStyle,
          interests: formData.interest,
          budget: formData.budget,
          groupType: formData.groupType,
        }),
      });

      const result = await response.json();

      if (result.success && result.id) {
        stopGeneratingToasts();
        router.push(`/dashboard/trips/${result.id}`);
      } else {
        throw new Error("Failed to create trip");
      }
    } catch (e) {
      console.error("Error generating trip", e);
      setError("Failed to generate trip. Please try again.");
    } finally {
      setLoading(false);
      stopGeneratingToasts();
    }
  };

  const handleChange = (key: keyof TripFormData, value: string | number) => {
    setFormData({ ...formData, [key]: value });
  };

  return (
    <main className="flex flex-col gap-10 py-10 wrapper">
      <div className="flex items-center gap-4 mb-2">
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="size-5" />
          <span className="text-sm font-medium">Back</span>
        </Link>
      </div>
      <Header
        title="Add a New Trip"
        description="View and edit AI Generated travel plans"
      />

      <section className="mt-2.5 wrapper-md">
        <form onSubmit={handleSubmit} className="trip-form">
          {/* Form fields */}
          <div>
            <label htmlFor="country">Country</label>
            <ComboBox
              id="country"
              dataSource={countryData}
              placeholder="Select a country..."
              onChange={(value) => handleChange("country", value)}
            />
          </div>

          <div>
            <label htmlFor="duration">Duration</label>
            <input
              id="duration"
              name="duration"
              type="number"
              min={1}
              max={10}
              placeholder="Enter a number of days"
              className="form-input placeholder:text-gray-100"
              onChange={(e) => handleChange("duration", Number(e.target.value))}
            />
          </div>

          {selectItems.map((key) => (
            <div key={key}>
              <label htmlFor={key}>{formatKey(key)}</label>
              <ComboBox
                id={key}
                dataSource={comboBoxItems[key].map((item) => ({
                  text: item,
                  value: item,
                }))}
                placeholder={`Select ${formatKey(key)}`}
                onChange={(value) =>
                  handleChange(key as keyof TripFormData, value)
                }
              />
            </div>
          ))}

          <div className="mt-4 px-6">
            <label htmlFor="location">Location on the world map</label>
            <div className="mt-2 w-full max-h-[400px] rounded-md p-0">
              <WorldMap mapData={mapData} />
            </div>
          </div>

          <div className="bg-gray-200 h-px w-full" />

          {error && (
            <div className="error">
              <p>{error}</p>
            </div>
          )}

          <footer className="px-6 w-full">
            <button
              disabled={loading}
              type="submit"
              className="button-class h-12 w-full"
            >
              {loading ? (
                <Ellipsis
                  className="animate-spin size-5 text-white"
                  style={{
                    animation: "spin 1.5s linear infinite",
                  }}
                />
              ) : (
                <Sparkles className="size-5 text-white" />
              )}
              <span className="p-16-semibold text-white">
                {loading ? "Generating..." : "Generate Trip"}
              </span>
            </button>
          </footer>
        </form>
      </section>
    </main>
  );
};

export default CreateTripPage;
