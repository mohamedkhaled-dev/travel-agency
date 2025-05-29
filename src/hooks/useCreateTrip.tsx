import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Country, CountryData, TripFormData } from "@/types";
import { startGeneratingToasts, stopGeneratingToasts } from "@/lib/utils";

interface UseCreateTripProps {
  successRedirectPath: (tripId: string) => string;
}

export const useCreateTrip = ({ successRedirectPath }: UseCreateTripProps) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [countriesLoading, setCountriesLoading] = useState(true); 
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
        setCountriesLoading(true);
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,flags,latlng,maps"
        ); 
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
        console.error("Error fetching countries:", error);
        setError("Failed to load countries. Please try again.");
      } finally {
        setCountriesLoading(false);
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
      color: "var(--color-primary-100)",
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
        router.push(successRedirectPath(result.id));
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

  return {
    countries,
    countriesLoading, 
    formData,
    error,
    loading,
    countryData,
    mapData,
    handleSubmit,
    handleChange,
  };
};