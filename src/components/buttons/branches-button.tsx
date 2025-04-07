"use client";

import { useModalStore } from "@/stores/modal-store";
import { Button } from "../ui/button";
import { Plus } from "@phosphor-icons/react";

export default function BranchesButton() {
  const { toggleIsBranchModalOpened } = useModalStore();

  return (
    <Button onClick={toggleIsBranchModalOpened}>
      <Plus weight="bold" color="white" />
      <span className="relative top-[1px]">Adicionar</span>
    </Button>
  );
}
