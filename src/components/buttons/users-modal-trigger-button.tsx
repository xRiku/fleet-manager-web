"use client";

import { useModalStore } from "@/stores/modal-store";
import { Button } from "../ui/button";
import { UserPlus } from "@phosphor-icons/react";

export default function UsersModalTriggerButton() {
  const { toggleIsUserModalOpened } = useModalStore();

  return (
    <Button onClick={toggleIsUserModalOpened} className="cursor-pointer ">
      <UserPlus weight="bold" color="white" />
      <span className="relative top-[1px]">Adicionar</span>
    </Button>
  );
}
