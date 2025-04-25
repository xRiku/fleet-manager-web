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
import { CompleteTripConfirmationForm } from "./complete-trip-confirmation-form";

export function CompleteTripConfirmationDrawer() {
  const {
    isCompleteTripConfirmationModalOpened,
    toggleIsCompleteTripConfirmationModalOpened,
  } = useModalStore();

  return (
    <Drawer
      open={isCompleteTripConfirmationModalOpened}
      onOpenChange={toggleIsCompleteTripConfirmationModalOpened}
    >
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-lg">Concluir viagem</DrawerTitle>
        </DrawerHeader>
        <CompleteTripConfirmationForm />
        <DrawerFooter className="pt-2">
          <Button form="complete-trip-form" type="submit">
            Confirmar
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
