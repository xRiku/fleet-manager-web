import UsersModalTriggerButton from "@/components/buttons/users-modal-trigger-button";
import { CreateUserDialog } from "@/components/dialogs/create-user-dialog";
import UsersTable from "@/components/tables/users-table";
import { getUsers } from "@/lib/server-utils";
import { Role } from "@/types";
// import { trips } from "@/db/trips";

export default async function Home() {
  const users = (await getUsers()).map((user) => ({
    ...user,
    role: user.role as Role,
  }));

  return (
    <div className="flex flex-col items-start justify-center">
      <div className="flex items-center justify-between w-full mt-8">
        <h1 className="text-xl font-semibold mb-6">Usuários</h1>
        <UsersModalTriggerButton />
      </div>
      <UsersTable users={users} />
      <CreateUserDialog />
    </div>
  );
}
