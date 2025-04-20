"use client";

import { useModalStore } from "@/stores/modal-store";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { finishTrip } from "@/actions/actions";

export function CompleteTripConfirmationDrawer() {
  const {
    isCompleteTripConfirmationModalOpened,
    toggleIsCompleteTripConfirmationModalOpened,
  } = useModalStore();

  const handleConfirm = async () => {
    await finishTrip();

    toggleIsCompleteTripConfirmationModalOpened();
  };

  return (
    <Drawer
      open={isCompleteTripConfirmationModalOpened}
      onOpenChange={toggleIsCompleteTripConfirmationModalOpened}
    >
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-lg">Concluir viagem</DrawerTitle>
        </DrawerHeader>
        <p className="px-4">Deseja confirmar a conclusão da viagem?</p>
        <DrawerFooter className="pt-2">
          <Button onClick={handleConfirm}>Confirmar</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
