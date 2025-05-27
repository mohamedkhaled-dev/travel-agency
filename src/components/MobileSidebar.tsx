"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { NavItems } from "@/components";
import { cn } from "@/lib/utils";
import { User } from "@/types";

type MobileSidebarProps = {
  user: User;
};

const MobileSidebar = ({ user }: MobileSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(false);
  };

  return (
    <aside className="mobile-sidebar">
      <header className="flex items-center justify-between p-4 border-b border-[var(--color-gray-200)]">
        <Link href={"/"} className="flex items-center pb-4 gap-2">
          <Image
            src={"/assets/icons/logo.png"}
            alt="Logo"
            className="size-[50px]"
            width={50}
            height={50}
          />
          <h1 className="text-xl font-bold text-[var(--color-primary-600)]">
            Velora
          </h1>
        </Link>

        <button onClick={() => setIsOpen(!isOpen)}>
          <Image
            src={"/assets/icons/menu.svg"}
            alt="Menu"
            className="size-7 cursor-pointer"
            width={28}
            height={28}
          />
        </button>
      </header>

      {/* Mobile navigation drawer */}
      <nav
        className={cn(
          "fixed inset-y-0 left-0 w-[270px] bg-white z-20 transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <NavItems user={user} handleClick={toggleSidebar} />
      </nav>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-10"
          onClick={() => setIsOpen(false)}
        />
      )}
    </aside>
  );
};

export default MobileSidebar;
