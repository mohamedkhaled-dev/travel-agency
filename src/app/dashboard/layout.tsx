import { MobileSidebar, NavItems } from "@/components";
import {
  getExistingUser,
  getLoggedInUser,
  storeUserData,
} from "@/lib/server/appwrite";
import { User } from "@/types";
import { redirect } from "next/navigation";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getLoggedInUser();
  if (!user || !user.$id) redirect("/sign-in");

  // If user exists and has role 'user', redirect to home
  let existingUser = await getExistingUser(user.$id);

  if (existingUser?.status === "user") {
    return redirect("/");
  }

  const userData: User = {
    id: existingUser?.$id ?? "",
    name: existingUser?.name,
    email: existingUser?.email,
    dateJoined: existingUser?.$createdAt ?? "",
    imageUrl: existingUser?.imageUrl ?? "", // add img placeholder
  };

  console.log(userData);

  return (
    <div className="admin-layout">
      {/* Mobile Sidebar */}
      <MobileSidebar user={userData} />

      {/* Desktop Sidebar */}
      <aside className="w-full max-w-[270px] hidden lg:block">
        <NavItems user={userData} />
      </aside>
      <aside className="children">{children}</aside>
    </div>
  );
};

export default DashboardLayout;
