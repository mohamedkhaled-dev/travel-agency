"use client";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  ctaText?: string;
  ctaUrl?: string;
  title: string;
  description: string;
};

const Header = ({ title, description, ctaText, ctaUrl }: Props) => {
  const pathname = usePathname();

  return (
    <header className="header flex flex-col items-start sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
      <article className="space-y-1 sm:space-y-2">
        <h1
          className={cn(
            "text-[var(--color-dark-100)]",
            pathname === "/dashboard"
              ? "text-xl sm:text-2xl md:text-4xl font-bold"
              : "text-lg sm:text-xl md:text-2xl font-semibold"
          )}
        >
          {title}
        </h1>
        <p
          className={cn(
            "text-[var(--color-gray-100)] font-normal",
            pathname === "/dashboard"
              ? "text-sm sm:text-base md:text-lg"
              : "text-xs sm:text-sm md:text-lg"
          )}
        >
          {description}
        </p>
      </article>

      {ctaText && ctaUrl && (
        <Link href={ctaUrl}>
          <button
            type="button"
            className="button-class h-10 sm:h-11 w-full sm:w-40 md:w-[180px] text-white flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="size-4 sm:size-5" />
            <span className="text-sm sm:text-base font-semibold">
              {ctaText}
            </span>
          </button>
        </Link>
      )}
    </header>
  );
};

export default Header;
