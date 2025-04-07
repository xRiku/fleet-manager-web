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
import { branches } from "@/db/branches";

export function BranchDialog() {
  const { isBranchModalOpened, toggleIsBranchModalOpened } = useModalStore();

  const handleClick = () => {
    branches.push({
      id: branches.length + 1 + "",
      name: "Caetité" + branches.length + 1,
    });
    toggleIsBranchModalOpened();
  };

  return (
    <Dialog open={isBranchModalOpened} onOpenChange={toggleIsBranchModalOpened}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar filial</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col py-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input id="name" placeholder="Caetité" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleClick}>Criar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
