"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
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
    <header className="header">
      <article>
        <h1
          className={cn(
            "text-dark-100",
            pathname === "/dashboard"
              ? "text-2xl md:text-4xl font-bold"
              : "text-xl md:text-2xl font-semibold"
          )}
        >
          {title}
        </h1>
        <p
          className={cn(
            "text-gray-100 font-normal",
            pathname === "/dashboard"
              ? "text-base md:text-lg "
              : "text-sm md:text-lg "
          )}
        >
          {description}
        </p>
      </article>

      {ctaText && ctaUrl && (
        <Link href={ctaUrl}>
          <button
            type="button"
            className="button-class  h-11 w-full md:w-[240px] text-white "
          >
            <Image
              width={20}
              height={20}
              src={"/assets/icons/plus.svg"}
              alt="plus"
              className="size-5"
            />

            <span className="p-16-semibold">{ctaText}</span>
          </button>
        </Link>
      )}
    </header>
  );
};

export default Header;
