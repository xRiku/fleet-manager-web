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
import { Branch } from "@/types";

export function RequestVehicleDrawer({
  branchesPromise,
}: {
  branchesPromise: Promise<Branch[]>;
}) {
  const { isRequestVehicleModalOpened, toggleRequestVehicleModalOpened } =
    useModalStore();

  return (
    <Drawer
      open={isRequestVehicleModalOpened}
      onOpenChange={toggleRequestVehicleModalOpened}
    >
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-lg">Solicitar veículo</DrawerTitle>
        </DrawerHeader>
        <RequestVehicleForm branchesPromise={branchesPromise} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
