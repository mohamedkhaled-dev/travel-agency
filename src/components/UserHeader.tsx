"use client";

import { logoutUser } from "@/lib/server/appwrite";
import { User } from "@/types";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UserHeader({ user }: { user: User | null }) {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser();
    router.replace("/");
  };

  return (
    <header className="absolute end-6 top-6 flex items-center gap-4 cursor-pointer">
      {user ? (
        <>
          {user.status === "admin" && (
            <button
              className="bg-primary text-white px-4 py-2 rounded-lg shadow-md hover:bg-primary/90 transition duration-200 cursor-pointer hover:-translate-y-1"
              onClick={() => router.push("/dashboard")}
            >
              Admin Dashboard
            </button>
          )}
          <div className="flex items-center gap-2 bg-white/30 backdrop-blur-sm rounded-lg px-4 py-2 hover:-translate-y-1 transition duration-200  ">
            <span className="text-white capitalize">{user.name}</span>
            <button
              className="text-red-500 cursor-pointer"
              onClick={handleLogout}
            >
              <LogOut className="size-6" />
            </button>
          </div>
        </>
      ) : (
        <button
          className="button-class h-9 text-white"
          onClick={() => router.push("/sign-in")}
        >
          Sign In
        </button>
      )}
    </header>
  );
}
