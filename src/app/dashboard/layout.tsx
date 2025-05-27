export const dynamic = "force-dynamic";
import { MobileSidebar, NavItems } from "@/components";
import { getUser } from "@/lib/server/appwrite";
import { User } from "@/types";
import { redirect } from "next/navigation";

// Static metadata
export const metadata = {
  title: "Dashboard | Velora",
  description:
    "Explore your personalized travel dashboard with Velora. Manage destinations, itineraries, and user activities seamlessly.",
};

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  let userData: User;

  try {
    const existingUser = await getUser();

    if (!existingUser) {
      return redirect("/sign-in");
    }

    if (existingUser.status === "user") {
      return redirect("/");
    }

    userData = {
      id: existingUser.$id ?? "",
      name: existingUser.name,
      email: existingUser.email,
      dateJoined: existingUser.joinedAt ?? "",
      imageUrl: existingUser.imageUrl ?? "",
    };
  } catch (e) {
    console.log("User not found", e);
    return redirect("/sign-in");
  }
  return (
    <div className="admin-layout">
      {/* Mobile Sidebar */}
      <MobileSidebar user={userData} />

      {/* Desktop Sidebar */}
      <aside className="w-full max-w-[270px] hidden lg:block">
        <NavItems user={userData} />
      </aside>

      <main className="children">{children}</main>
    </div>
  );
};

export default DashboardLayout;
