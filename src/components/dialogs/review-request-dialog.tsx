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
import { useEffect, useState } from "react";
import { Trip } from "@/types";

export function ReviewRequestDialog() {
  const { isReviewRequestModalOpened, toggleIsReviewRequestModalOpened } =
    useModalStore();
  const [selectedTripId, setSelectedTripId] = useQueryState("id");
  const [trip, setTrip] = useState<Trip | null>(null);

  useEffect(() => {
    if (!selectedTripId) {
      return;
    }
    async function asyncFunction() {
      try {
        const fetchedTrip = await fetch(`/api/trips/${selectedTripId}`);
        const parsedTrip = await fetchedTrip.json();
        console.log(parsedTrip);
        setTrip(parsedTrip);
      } catch (error) {
        console.error(error);
      } finally {
      }
    }
    asyncFunction();
  }, [selectedTripId, isReviewRequestModalOpened]);

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
        <div className="flex flex-col gap-2 ">
          <p>
            <strong>Solicitante:</strong> {trip?.driver.name}
          </p>
          <p>
            <strong>Origem:</strong> {trip?.origin.name}
          </p>
          <p>
            <strong>Destino:</strong> {trip?.destiny.name}
          </p>
          <section className="flex flex-col gap-2">
            <p>
              <strong>Informações do veículo:</strong>
            </p>
            <p className="text-sm">
              &nbsp; <strong>Marca:</strong> {trip?.vehicle.brand}
            </p>
            <p className="text-sm">
              &nbsp; <strong>Modelo:</strong> {trip?.vehicle.model}
            </p>
            <p className="text-sm">
              &nbsp; <strong>Cor:</strong> {trip?.vehicle.color}
            </p>
            <p className="text-sm">
              &nbsp; <strong>Placa:</strong> {trip?.vehicle.plate}
            </p>
            <p className="text-sm">
              &nbsp; <strong>Ano:</strong> {trip?.vehicle.year}
            </p>
            <p className="text-sm">
              &nbsp; <strong>Quilometragem:</strong> {trip?.vehicle.odometer} km
            </p>
          </section>
        </div>
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
