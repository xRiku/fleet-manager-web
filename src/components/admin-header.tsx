import { Bell } from "@phosphor-icons/react/dist/ssr";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function AdminHeader() {
  return (
    <header className="flex w-full items-center justify-end gap-2 p-2 border-b border-slate-200/95">
      <Bell />
      <Avatar>
        <AvatarImage src="" />
        <AvatarFallback>PH</AvatarFallback>
      </Avatar>
      <div className="flex flex-col justify-center ">
        <p className="font-semibold text-sm">Philipe Marques</p>
        <p className="font-light text-xs">Gerente</p>
      </div>
    </header>
  );
}
