"use client";

import { useModalStore } from "@/stores/modal-store";
import { Button } from "../ui/button";
import React from "react";
import { NotePencil } from "@phosphor-icons/react";
import { useQueryState } from "nuqs";

export default function ReviewRequestModalTriggerButton({
  tripId,
}: {
  tripId: string;
}) {
  const { toggleIsReviewRequestModalOpened } = useModalStore();
  const [selectedTripId, setSelectedTripId] = useQueryState("id", {
    defaultValue: "",
  });

  const handleClick = async () => {
    console.log("clicked");
    setSelectedTripId(tripId);
    toggleIsReviewRequestModalOpened();
  };

  return (
    <Button
      onClick={handleClick}
      variant="ghost"
      className="cursor-pointer [&_svg:not([class*='size-'])]:size-5"
    >
      <NotePencil size={24} />
    </Button>
  );
}
