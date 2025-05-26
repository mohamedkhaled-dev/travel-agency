"use client";
import { logoutUser } from "@/lib/server/appwrite";
import { cn } from "@/lib/utils";
import { User } from "@/types/index.js";
import { Globe, Home, LogOut, Users, WandSparkles } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import UserAvatar from "./UserAvatar.tsx";
import Image from "next/image.js";

interface NavItemsProps {
  handleClick?: () => void;
  user: User;
}

const sidebarItems = [
  {
    id: 1,
    icon: <Home className="size-5" />,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    id: 3,
    icon: <Users className="size-5" />,
    label: "Community",
    href: "/dashboard/all-users",
  },
  {
    id: 4,
    icon: <WandSparkles className="size-5" />,
    label: "Trip Planner",
    href: "/dashboard/trips",
  },
];

const NavItems = ({ handleClick, user }: NavItemsProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser();
    router.replace("/");
  };

  return (
    <section className="flex flex-col h-full gap-6 p-4 bg-white pt-10">
      <Link
        href="/"
        className="flex items-center gap-2 p-2 rounded-lg "
        onClick={handleClick}
      >
        <Image
        src={"/assets/icons/logo.png"}
        alt="logo"
        width={50}
        height={50}
        className="size-[50px]"
        />
        <h1 className="text-xl font-bold text-primary-600">Velora</h1>
      </Link>

      <div className="flex flex-col justify-between h-full pt-7 border-t border-light-300">
        <nav className="space-y-1">
          {sidebarItems.map(({ id, href, icon, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={id}
                href={href}
                onClick={handleClick}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg transition-colors group",
                  {
                    "bg-primary-100 text-white hover:bg-primary-500": isActive,
                    "hover:bg-light-100 text-gray-700": !isActive,
                  }
                )}
              >
                <span
                  className={cn({
                    "text-white": isActive,
                    "text-gray-500 group-hover:text-gray-900": !isActive,
                  })}
                >
                  {icon}
                </span>
                <span className="font-medium">{label}</span>
              </Link>
            );
          })}
        </nav>

        <footer className="flex items-center gap-3 p-3 mt-auto rounded-lg hover:bg-light-100 transition-colors">
          <UserAvatar user={user} size={40} />

          <article className="flex-1 min-w-0">
            <h2 className="font-medium truncate">{user?.name}</h2>
            <p className="text-sm text-gray-500 truncate">{user?.email}</p>
          </article>

          <button
            onClick={handleLogout}
            className="p-2 rounded-full hover:bg-light-200 transition-colors cursor-pointer"
            aria-label="Logout"
          >
            <LogOut className="size-5 text-gray-500 hover:text-red-500 transition-colors" />
          </button>
        </footer>
      </div>
    </section>
  );
};

export default NavItems;
