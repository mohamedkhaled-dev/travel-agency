"use client"
import { logoutUser } from "@/lib/server/appwrite";
import Image from "next/image";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser();
    router.replace("/sign-in");
  };
  return (
    <div>
      <button className="cursor-pointer" onClick={handleLogout}>
        <Image
          src="/assets/icons/logout.svg"
          alt="Logout"
          className="size-6"
          width={24}
          height={24}
        />
      </button>

      <button onClick={() => router.push("/dashboard")}>Dashboard</button>
    </div>
  );
};

export default HomePage;
