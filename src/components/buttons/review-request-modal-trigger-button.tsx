"use client";

import { useModalStore } from "@/stores/modal-store";
import React, { ReactElement } from "react";
import { useQueryState } from "nuqs";

export default function ReviewRequestModalTriggerButton({
  children,
  tripId,
}: {
  children: ReactElement<{ onClick?: () => void; className?: string }>;
  tripId: string;
}) {
  const { toggleIsReviewRequestModalOpened } = useModalStore();
  const [_, setSelectedTripId] = useQueryState("id", {
    defaultValue: "",
  });

  const handleClick = async () => {
    setSelectedTripId(tripId);
    toggleIsReviewRequestModalOpened();
    console.log(_);
  };

  // Clona o elemento da linha da tabela e adiciona o onClick
  return React.cloneElement(children, {
    onClick: handleClick,
    className: `cursor-pointer hover:bg-gray-100`,
  });
}
