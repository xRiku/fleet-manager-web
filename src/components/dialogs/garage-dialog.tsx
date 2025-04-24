"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useModalStore } from "@/stores/modal-store";
import { Button } from "../ui/button";
import { useState } from "react";
import { createGarage } from "@/actions/actions";

export function GarageDialog() {
  const { isGarageModalOpened, toggleIsGarageModalOpened } = useModalStore();
  const [name, setName] = useState("");

  const handleClick = async () => {
    try {
      await createGarage(name);
    } catch (error) {
      console.log(error);
    }

    toggleIsGarageModalOpened();
  };

  return (
    <Dialog open={isGarageModalOpened} onOpenChange={toggleIsGarageModalOpened}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar garagem</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Garagem"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleClick}>Criar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
