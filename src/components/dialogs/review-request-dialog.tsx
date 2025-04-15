"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModalStore } from "@/stores/modal-store";
import { Button } from "../ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { approveRequest } from "@/actions/actions";
import { useQueryState } from "nuqs";

export function ReviewRequestDialog() {
  const { isReviewRequestModalOpened, toggleIsReviewRequestModalOpened } =
    useModalStore();
  const [selectedTripId, setSelectedTripId] = useQueryState("id");

  const branchId = "";

  const handleApproveClick = async () => {
    await approveRequest(branchId);
    toggleIsReviewRequestModalOpened();
  };

  return (
    <Dialog
      open={isReviewRequestModalOpened}
      onOpenChange={toggleIsReviewRequestModalOpened}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Revisar solicitação</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col py-4">{`id: ${selectedTripId}`}</div>
        <DialogFooter>
          <DialogClose asChild className="cursor-pointer">
            <Button variant="secondary">Recusar</Button>
          </DialogClose>
          <Button onClick={handleApproveClick} className="cursor-pointer">
            Aprovar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
