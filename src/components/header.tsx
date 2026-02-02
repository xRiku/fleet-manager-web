import HeaderUserInfo from "./header-user-info";
import { Logo } from "./logo";

export default function Header() {
  return (
    <header className="w-full h-14 p-4 flex justify-between items-center backdrop-blur border-b bg-white/5">
      <Logo size={42} />
      <HeaderUserInfo/>
    </header>
  );
}
