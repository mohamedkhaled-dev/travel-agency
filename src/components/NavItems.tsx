"use client";
import { sidebarItems } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemsProps {
  handleClick?: () => void;
}

const NavItems = ({ handleClick }: NavItemsProps) => {
  const pathname = usePathname();
  const user = {
    name: "David Doe",
    email: "contact@david.pro",
    imageUrl: "/assets/images/david.webp",
  };

  return (
    <section className="nav-items">
      <Link href="/" className="link-logo" onClick={handleClick}>
        <Image
          src="/assets/icons/logo.svg"
          alt="Logo"
          width={30}
          height={30}
          className="size-[30px]"
        />
        <h1>Tourvisto</h1>
      </Link>
      <div className="container">
        <nav>
          {sidebarItems.map(({ id, href, icon, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={id}
                href={href}
                onClick={handleClick}
                className={cn("group nav-item", {
                  "bg-primary-100 !text-white": isActive,
                })}
              >
                <Image
                  width={20}
                  height={20}
                  src={icon}
                  alt={label}
                  className={`group-hover:brightness-0 size-5 group-hover:invert ${
                    isActive ? "brightness-0 invert" : "text-dark-200"
                  }`}
                />
                <div>{label}</div>
              </Link>
            );
          })}
        </nav>
        <footer className="nav-footer">
          <Image
            width={40}
            height={40}
            src={user?.imageUrl || "/assets/images/david.webp"}
            alt={user?.name || "David"}
          />

          <article>
            <h2>{user?.name}</h2>
            <p>{user?.email}</p>
          </article>

          <button
            className="cursor-pointer"
            onClick={() => {
              console.log({ message: "logout" });
            }}
          >
            <Image
              src="/assets/icons/logout.svg"
              alt="Logout"
              className="size-6"
              width={24}
              height={24}
            />
          </button>
        </footer>
      </div>
    </section>
  );
};

export default NavItems;