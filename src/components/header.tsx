import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function Header() {
  return (
    <header className="w-full h-14 p-4 flex justify-between items-center backdrop-blur border-b bg-white/5">
      <Image width={42} height={42} src="/logo.png" alt="logo image" />
      <Avatar>
        <AvatarImage src="" />
        <AvatarFallback>PH</AvatarFallback>
      </Avatar>
    </header>
    // <header className="flex w-full items-center justify-center h border-b border-slate-200/95">
    //   <Bell />
    // </header>
  );
}
