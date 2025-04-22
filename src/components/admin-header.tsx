import HeaderUserInfo from "./header-user-info";

export default function AdminHeader() {

  return (
    <header className="flex w-full items-center justify-end gap-2 p-2 border-b border-slate-200/95">
      <HeaderUserInfo/>
    </header>
  );
}
