"use client";

import { ComboBoxComponent, WorldMap } from "@/components";
import { comboBoxItems, selectItems } from "@/constants";
import { useCreateTrip } from "@/hooks/useCreateTrip";
import { formatKey } from "@/lib/utils";
import { TripFormData } from "@/types";
import { Ellipsis, Sparkles } from "lucide-react";

interface CreateTripFormProps {
  successRedirectPath: (tripId: string) => string;
}

const CreateTripForm = ({ successRedirectPath }: CreateTripFormProps) => {
  const {
    countryData,
    mapData,
    error,
    loading,
    countriesLoading,
    handleSubmit,
    handleChange,
    formData,
  } = useCreateTrip({ successRedirectPath });

  return (
    <section className="wrapper-md mt-2 sm:mt-4">
      <form
        onSubmit={handleSubmit}
        className="trip-form space-y-4 sm:space-y-6"
      >
        {/* Country Field */}

        <div>
          <label
            htmlFor="country"
            className="p-16-semibold text-[var(--color-dark-100)] text-sm sm:text-base"
          >
            Country
          </label>
          <ComboBoxComponent
            id="country"
            dataSource={countryData}
            placeholder="Select a country..."
            onChange={(value) => handleChange("country", value)}
            className="mt-1 sm:mt-2 "
          />
        </div>

        {/* Duration Field */}
        <div>
          <label
            htmlFor="duration"
            className="p-16-semibold text-[var(--color-dark-100)] text-sm sm:text-base"
          >
            Duration
          </label>
          <input
            id="duration"
            name="duration"
            type="number"
            min={1}
            max={10}
            placeholder="Enter a number of days"
            className="form-input mt-1 sm:mt-2 w-full"
            onChange={(e) => handleChange("duration", Number(e.target.value))}
          />
        </div>

        {/* Dynamic Select Fields */}
        {selectItems.map((key) => (
          <div key={key}>
            <label
              htmlFor={key}
              className="p-16-semibold text-[var(--color-dark-100)] text-sm sm:text-base"
            >
              {formatKey(key)}
            </label>
            <ComboBoxComponent
              id={key}
              dataSource={comboBoxItems[key].map((item) => ({
                text: item,
                value: item,
              }))}
              placeholder={`Select ${formatKey(key)}`}
              onChange={(value) =>
                handleChange(key as keyof TripFormData, value)
              }
              className="mt-1 sm:mt-2"
            />
          </div>
        ))}

        {/* World Map */}
        <div className="mt-4 sm:mt-6">
          <label
            htmlFor="location"
            className="p-16-semibold text-[var(--color-dark-100)] text-sm sm:text-base"
          >
            Location on the world map
          </label>
          <div className="mt-1 sm:mt-2 w-full rounded-[var(--radius-20)] overflow-hidden">
            {mapData[0].coordinates.length > 0 ||
              (!formData.country && <WorldMap mapData={mapData} />)}
          </div>
        </div>

        <div className="bg-[var(--color-gray-200)] h-px w-full mt-4 sm:mt-6" />

        {/* Error Display */}
        {error && (
          <div className="error text-[var(--color-red-500)] p-2 mt-2 text-sm sm:text-base">
            <p>{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <footer className="w-full mt-4 sm:mt-6">
          <button
            disabled={loading || countriesLoading}
            type="submit"
            className="button-class h-10 sm:h-12 w-full flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? (
              <Ellipsis
                className="animate-spin size-4 sm:size-5 text-white"
                style={{
                  animation: "spin 1.5s linear infinite",
                }}
              />
            ) : (
              <Sparkles className="size-4 sm:size-5 text-white" />
            )}
            <span className="p-16-semibold text-white text-sm sm:text-base ml-1 sm:ml-2">
              {loading ? "Generating..." : "Generate Trip"}
            </span>
          </button>
        </footer>
      </form>
    </section>
  );
};

export default CreateTripForm;
