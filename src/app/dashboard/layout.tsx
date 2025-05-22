import { redirect } from "next/navigation";
import { getUser, logoutUser } from "@/lib/server/appwrite";
import { User } from "@/types";
import { MobileSidebar, NavItems } from "@/components";

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
  } catch (error) {
    // If something goes wrong fetching user
    return redirect("/sign-in");
  }
  return (
    <div className="admin-layout overflow-y-hidden">
      {/* Mobile Sidebar */}
      <MobileSidebar user={userData} />

      {/* Desktop Sidebar */}
      <aside className="w-full max-w-[270px] hidden lg:block">
        <NavItems user={userData} />
      </aside>

      <main className="children overflow-y-auto">{children}</main>
    </div>
  );
};

export default DashboardLayout;
