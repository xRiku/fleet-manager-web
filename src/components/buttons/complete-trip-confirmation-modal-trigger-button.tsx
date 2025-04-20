"use client";

import { useModalStore } from "@/stores/modal-store";
import { Button } from "../ui/button";

export default function CompleteTripConfirmationModalTriggerButton() {
  const { toggleIsCompleteTripConfirmationModalOpened } = useModalStore();

  return (
    <Button
      onClick={toggleIsCompleteTripConfirmationModalOpened}
      className="cursor-pointer self-center"
      variant="default"
    >
      <span>Concluir viagem</span>
    </Button>
  );
}
