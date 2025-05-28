import { Figtree, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

// Define fonts with subsets and weights
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const figtree = Figtree({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-figtree",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Home | Velora",
  description:
    "A travel agency app that helps you plan and book your trips with ease. Explore destinations, create itineraries, and connect with fellow travelers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${figtree.variable}`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
      <Toaster
        position="top-right"
        richColors
        toastOptions={{
          classNames: {
            toast: "!text-primary-500",
            description: "!text-gray-100",
          },
        }}
      />
    </html>
  );
}
