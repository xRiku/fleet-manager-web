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
import { approveRequest, rejectRequest } from "@/actions/actions";
import { useQueryState } from "nuqs";

export function ReviewRequestDialog() {
  const { isReviewRequestModalOpened, toggleIsReviewRequestModalOpened } =
    useModalStore();
  const [selectedTripId, setSelectedTripId] = useQueryState("id");

  const handleApproveClick = async () => {
    if (selectedTripId) {
      try {
        await approveRequest(selectedTripId);
        setSelectedTripId(null);
        toggleIsReviewRequestModalOpened();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleRejectClick = async () => {
    if (selectedTripId) {
      try {
        await rejectRequest(selectedTripId);
        setSelectedTripId(null);
        toggleIsReviewRequestModalOpened();
      } catch (error) {
        console.error(error);
      }
    }
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
          <Button
            variant="secondary"
            onClick={handleRejectClick}
            className="cursor-pointer"
          >
            Recusar
          </Button>
          <Button onClick={handleApproveClick} className="cursor-pointer">
            Aprovar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
