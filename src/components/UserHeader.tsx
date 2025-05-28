"use client";

import { logoutUser } from "@/lib/server/appwrite";
import { User } from "@/types";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

const UserHeader = ({ user }: { user: User | null }) => {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser();
    router.replace("/");
  };

  return (
    <header className="absolute right-6 top-6 z-50 flex items-center gap-4">
      {user ? (
        <>
          {user.status === "admin" && (
            <button
              className="button-class h-9 hover:-translate-y-1 transition duration-200 cursor-pointer"
              onClick={() => router.push("/dashboard")}
            >
              Dashboard
            </button>
          )}
          <div className="flex items-center gap-2 glassmorphism rounded-lg px-4 py-2 hover:-translate-y-1 transition duration-200 cursor-pointer">
            <span className="text-white font-semibold capitalize">
              {user.name.split(" ")[0]}
            </span>
            <button
              className="text-white hover:text-[var(--color-red-500)] cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut className="w-6 h-6" />
            </button>
          </div>
        </>
      ) : (
        <button
          className="button-class h-9 cursor-pointer"
          onClick={() => router.push("/sign-in")}
        >
          Sign In
        </button>
      )}
    </header>
  );
};

export default UserHeader;
