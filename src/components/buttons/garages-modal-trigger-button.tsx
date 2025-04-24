"use client";

import { useModalStore } from "@/stores/modal-store";
import { Button } from "../ui/button";
import { Plus } from "@phosphor-icons/react";

export default function GaragesModalTriggerButton() {
  const { toggleIsGarageModalOpened } = useModalStore();

  return (
    <Button onClick={toggleIsGarageModalOpened} className="cursor-pointer">
      <Plus weight="bold" color="white" />
      <span className="relative top-[1px]">Adicionar</span>
    </Button>
  );
}
