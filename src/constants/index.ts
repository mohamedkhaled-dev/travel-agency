// Removed Syncfusion import
// import type { AxisModel } from "@syncfusion/ej2-react-charts";

export const sidebarItems = [
  {
    id: 1,
    icon: "/assets/icons/home.svg",
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    id: 3,
    icon: "/assets/icons/users.svg",
    label: "All Users",
    href: "/dashboard/all-users",
  },
  {
    id: 4,
    icon: "/assets/icons/itinerary.svg",
    label: "AI Trips",
    href: "/dashboard/trips",
  },
];

// Refactored chart data for Recharts (used by shadcn/ui)
export const chartOneData = [
  {
    name: "Jan",
    series1: 0.5,
    series2: 1.5,
    series3: 0.7,
  },
  {
    name: "Feb",
    series1: 0.8,
    series2: 1.2,
    series3: 0.9,
  },
  {
    name: "Mar",
    series1: 1.2,
    series2: 1.8,
    series3: 1.5,
  },
  {
    name: "Apr",
    series1: 1.5,
    series2: 2.0,
    series3: 1.8,
  },
  {
    name: "May",
    series1: 1.8,
    series2: 2.5,
    series3: 2.0,
  },
  {
    name: "Jun",
    series1: 2.0,
    series2: 2.8,
    series3: 2.5,
  },
];

export const travelStyles = [
  "Relaxed",
  "Luxury",
  "Adventure",
  "Cultural",
  "Nature & Outdoors",
  "City Exploration",
];

export const interests = [
  "Food & Culinary",
  "Historical Sites",
  "Hiking & Nature Walks",
  "Beaches & Water Activities",
  "Museums & Art",
  "Nightlife & Bars",
  "Photography Spots",
  "Shopping",
  "Local Experiences",
];

export const budgetOptions = ["Budget", "Mid-range", "Luxury", "Premium"];

export const groupTypes = ["Solo", "Couple", "Family", "Friends", "Business"];

export const footers = ["Terms & Condition", "Privacy Policy"];

export const selectItems = [
  "groupType",
  "travelStyle",
  "interest",
  "budget",
] as (keyof TripFormData)[];

export const comboBoxItems = {
  groupType: groupTypes,
  travelStyle: travelStyles,
  interest: interests,
  budget: budgetOptions,
} as Record<keyof TripFormData, string[]>;

// Replaced Syncfusion specific axis models with more generic chart config
export const userChartConfig = {
  xAxis: {
    dataKey: "name",
    label: "Day",
  },
  yAxis: {
    min: 0,
    max: 10,
    tickCount: 6,
    label: "Count",
  },
};

export const tripChartConfig = {
  xAxis: {
    dataKey: "name",
    label: "Travel Styles",
  },
  yAxis: {
    min: 0,
    max: 10,
    tickCount: 6,
    label: "Count",
  },
};

export const CONFETTI_SETTINGS = {
  particleCount: 200, // Number of confetti pieces
  spread: 60, // Spread of the confetti burst
  colors: ["#ff0", "#ff7f00", "#ff0044", "#4c94f4", "#f4f4f4"], // Confetti colors
  decay: 0.95, // Gravity decay of the confetti
};

export const LEFT_CONFETTI = {
  ...CONFETTI_SETTINGS,
  angle: 45, // Direction of the confetti burst (90 degrees is top)
  origin: { x: 0, y: 1 }, // Center of the screen
};

export const RIGHT_CONFETTI = {
  ...CONFETTI_SETTINGS,
  angle: 135,
  origin: { x: 1, y: 1 },
};