"use client";

import { useModalStore } from "@/stores/modal-store";
import { Button } from "../ui/button";
import { Plus } from "@phosphor-icons/react";

export default function TripsModalTriggerButton() {
  const { toggleRequestVehicleModalOpened } = useModalStore();

  return (
    <Button
      onClick={toggleRequestVehicleModalOpened}
      className="cursor-pointer "
    >
      <Plus weight="bold" color="white" />
      <span>Solicitar veículo</span>
    </Button>
  );
}
