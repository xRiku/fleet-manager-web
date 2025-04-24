"use client";

import { useModalStore } from "@/stores/modal-store";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";
import { Button } from "./ui/button";
import { RequestVehicleForm } from "./request-vehicle-form";
import { Garage } from "@/types";

export function RequestVehicleDrawer({
  garagesPromise,
}: {
  garagesPromise: Promise<Garage[]>;
}) {
  const { isRequestVehicleModalOpened, toggleIsRequestVehicleModalOpened } =
    useModalStore();

  return (
    <Drawer
      open={isRequestVehicleModalOpened}
      onOpenChange={toggleIsRequestVehicleModalOpened}
    >
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-lg">Solicitar veículo</DrawerTitle>
        </DrawerHeader>
        <RequestVehicleForm garagesPromise={garagesPromise} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
