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
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

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
        <Separator />
        <ScrollArea className="p-4 max-h-[60vh] overflow-auto">
          <RequestVehicleForm garagesPromise={garagesPromise} />
          <DrawerFooter className="pt-2 mt-4">
            <Button type="submit" form="request-vehicle-form">
              Solicitar
            </Button>

            <DrawerClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DrawerClose>
          </DrawerFooter>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}
