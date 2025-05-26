import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import { TrendResult, Trip, TripFormData } from "@/types";
import { toast } from "sonner";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (dateString: string): string => {
  return dayjs(dateString).format("MMMM DD, YYYY");
};

export function parseMarkdownToJson(markdownText: string): unknown | null {
  const regex = /```json\n([\s\S]+?)\n```/;
  const match = markdownText.match(regex);

  if (match && match[1]) {
    try {
      return JSON.parse(match[1]);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return null;
    }
  }
  console.error("No valid JSON found in markdown text.");
  return null;
}

export function parseTripData(jsonString: string): Trip | null {
  try {
    const data: Trip = JSON.parse(jsonString);

    return data;
  } catch (error) {
    console.error("Failed to parse trip data:", error);
    return null;
  }
}

export function getFirstWord(input: string = ""): string {
  return input?.trim().split(/\s+/)[0] || "";
}

export const calculateTrendPercentage = (
  countOfThisMonth: number,
  countOfLastMonth: number
): TrendResult => {
  if (countOfLastMonth === 0) {
    return countOfThisMonth === 0
      ? { trend: "no change", percentage: 0 }
      : { trend: "increment", percentage: 100 };
  }

  const change = countOfThisMonth - countOfLastMonth;
  const percentage = Math.abs((change / countOfLastMonth) * 100);

  if (change > 0) {
    return { trend: "increment", percentage };
  } else if (change < 0) {
    return { trend: "decrement", percentage };
  } else {
    return { trend: "no change", percentage: 0 };
  }
};

export const formatKey = (key: keyof TripFormData) => {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
};

export const getMonthNames = (
  currentMonth: number,
  lastMonth: number
): { label: string; value: number }[] => {
  const now = new Date();
  const currentMonthName = now.toLocaleString("default", { month: "long" });
  const prevMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const prevMonthName = prevMonthDate.toLocaleString("default", {
    month: "long",
  });

  return [
    { label: prevMonthName, value: lastMonth },
    { label: currentMonthName, value: currentMonth },
  ];
};

let toastInterval: NodeJS.Timeout | null = null;
let currentToastId: string | number | null = null;

const loadingMessages = [
  {
    title: "AI is working...",
    description: "Fetching your destination data.",
  },
  {
    title: "Almost there!",
    description: "Crafting your perfect itinerary.",
  },
  {
    title: "Finalizing plan",
    description: "Your personalized trip is almost ready!",
  },
];

export const startGeneratingToasts = (): number | string => {
  let index = 0;

  // Show first toast immediately
  const id = toast(loadingMessages[index].title, {
    description: loadingMessages[index].description,
  });

  currentToastId = id;

  // Then loop every 3 seconds
  toastInterval = setInterval(() => {
    index = (index + 1) % loadingMessages.length;
    currentToastId = toast(loadingMessages[index].title, {
      description: loadingMessages[index].description,
    });
  }, 3000);

  return id; // return initial toast ID for reference
};

export const stopGeneratingToasts = () => {
  if (toastInterval) {
    clearInterval(toastInterval);
    toastInterval = null;
  }

  if (currentToastId) {
    toast.dismiss(currentToastId);
    currentToastId = null;
  }
};
