import { Icon } from "@/components/ui/icon";
import { UserTable } from "@/components/admin/users/user-table";
import { getUsers } from "@/lib/api/users";

export default async function AdminUsersPage() {
  // Server Component: Fetch data on the server
  const users = await getUsers();

  return (
    <main className="flex-1 w-full px-4 md:px-8 py-8 flex flex-col gap-8 overflow-hidden">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-900">User Management</h1>
        <div className="lg:hidden flex items-center gap-2">
          <button className="flex items-center gap-2 text-sm font-bold text-neutral-600 hover:text-primary">
            <Icon name="menu" />
            Menu
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4 bg-white border border-neutral-200 rounded-2xl p-6 shadow-soft flex-1">
        <UserTable users={users} />
      </div>
    </main>
  );
}

