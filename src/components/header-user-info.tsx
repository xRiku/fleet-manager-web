import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Role } from "@/types";
import { Separator } from "./ui/separator";
import { LogoutButton } from "./loggout-button";

export default async function HeaderUserInfo() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  const user = session?.user;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <section className="flex items-center gap-2 cursor-pointer px-2">
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback>{user?.name?.charAt(0) ?? "?"}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-center">
            <p className="font-semibold text-sm">{user?.name ?? "Usuário"}</p>
            <p className="font-light text-xs">
              {user?.role === Role.ADMIN ? "Gerente" : "Motorista"}
            </p>
          </div>
        </section>
      </PopoverTrigger>
      <PopoverContent className="w-44 p-2 mx-2 flex flex-col">
        <section className="flex flex-col mb-2 items-center mt-6">
          <Avatar className="w-16 h-16 mb-4">
            <AvatarImage src="" />
            <AvatarFallback className="text-4xl">{user?.name?.charAt(0) ?? "?"}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-center mb-2">
            <p className="font-semibold text-sm">{user?.name ?? "Usuário"}</p>
            <p className="font-light text-xs">
              {user?.role === Role.ADMIN ? "Gerente" : "Motorista"}
            </p>
          </div>
        </section>
        <Separator className="my-2" />
        <LogoutButton />
      </PopoverContent>
    </Popover>
  )
}