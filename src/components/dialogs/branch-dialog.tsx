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
import { useState } from "react";
import { createBranch } from "@/actions/actions";

export function BranchDialog() {
  const { isBranchModalOpened, toggleIsBranchModalOpened } = useModalStore();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleClick = async () => {
    try {
      await createBranch(name);
    } catch (error) {
      console.log(error);
    }

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
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Caetité"
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
