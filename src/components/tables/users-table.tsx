import { Role, User } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  SteeringWheel as Driver,
  UserGear,
} from "@phosphor-icons/react/dist/ssr";

export default function UsersTable({ users }: { users: User[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="text-lg">
          <TableHead>Nome completo</TableHead>
          <TableHead>Cargo</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell className="font-medium">
              <p className="flex items-center gap-2 ">
                {user.role === Role.ADMIN ? (
                  <>
                    <UserGear weight="bold" size={20} /> Gerente
                  </>
                ) : (
                  <>
                    <Driver weight="bold" size={20} /> Motorista
                  </>
                )}
              </p>
            </TableCell>
            <TableCell className="font-medium"></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
