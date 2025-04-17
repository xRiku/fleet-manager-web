"use client";

import { useModalStore } from "@/stores/modal-store";
import { Button } from "../ui/button";
import { Plus } from "@phosphor-icons/react";

export default function CompleteTripModalTriggerButton() {
  const { toggleIsRequestVehicleModalOpened } = useModalStore();

  return (
    <Button
      onClick={toggleIsRequestVehicleModalOpened}
      className="cursor-pointer self-center"
      variant="default"
    >
      <span>Concluir viagem</span>
    </Button>
  );
}
