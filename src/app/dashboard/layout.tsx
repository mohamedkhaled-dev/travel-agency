import { redirect } from "next/navigation";
import { getUser } from "@/lib/server/appwrite";
import { User } from "@/types";
import { MobileSidebar, NavItems } from "@/components";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const existingUser = await getUser();

  if (!existingUser) {
    return redirect("/sign-in");
  }

  if (existingUser.status === "user") {
    return redirect("/");
  }

  const userData: User = {
    id: existingUser.$id ?? "",
    name: existingUser.name,
    email: existingUser.email,
    dateJoined: existingUser.joinedAt ?? "",
    imageUrl: existingUser.imageUrl ?? "", // fallback to placeholder if needed
  };

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
