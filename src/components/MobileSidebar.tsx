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
    <aside className="mobile-sidebar wrapper">
      <header>
        <Link href={"/"}>
          <Image
            src={"/assets/icons/logo.svg"}
            alt="Logo"
            className="size-[30px]"
            width={30}
            height={30}
          />
          <h1>Tourvisto</h1>
        </Link>

        <button onClick={() => setIsOpen(!isOpen)}>
          <Image
            src={"/assets/icons/menu.svg"}
            alt={"Menu"}
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
