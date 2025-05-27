export const dynamic = "force-dynamic";
import { Header } from "@/components";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getAllUsers } from "@/lib/server/appwrite";

const AllUsersPage = async () => {
  const result = await getAllUsers(10, 0);
  const { users = [] } = result || {};

  return (
    <main className="all-users wrapper pb-10 pt-0">
      <Header
        title="Manage Users"
        description="Filter, sort, and access detailed user profiles"
      />
      <DataTable columns={columns} data={users} />
    </main>
  );
};

export default AllUsersPage;
