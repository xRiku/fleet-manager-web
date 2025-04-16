"use client";

import { useModalStore } from "@/stores/modal-store";
import { Button } from "../ui/button";
import { Plus } from "@phosphor-icons/react";

export default function TripsModalTriggerButton() {
  const { toggleIsRequestVehicleModalOpened } = useModalStore();

  return (
    <Button
      onClick={toggleIsRequestVehicleModalOpened}
      className="cursor-pointer "
    >
      <Plus weight="bold" color="white" />
      <span>Solicitar veículo</span>
    </Button>
  );
}
