// components/LogoutButton.tsx
"use client";

import { logOut } from "@/actions/actions";
import { Button } from "./ui/button";
import { SignOut } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await logOut();
      router.push("/login");
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  };

  return (
    <Button
      variant="ghost"
      onClick={handleSignOut}
      className="flex gap-4 justify-start items-center cursor-pointer"
    >
      <SignOut size={20} weight="bold" />
      <p className="font-semibold text-md">Sair</p>
    </Button>
  );
}
