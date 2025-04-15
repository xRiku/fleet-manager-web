import TripsModalTriggerButton from "@/components/buttons/trips-modal-trigger-button";
import Image from "next/image";

export default function Page() {
  // const trips = getTripsForUser()
  const trips = [];

  if (!trips.length) {
    return <DriverEmptyState />;
  }

  return <div>normar</div>;
}

function DriverEmptyState() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Image
        width={250}
        height={250}
        src="/empty-state-car.png"
        alt="empty state car"
      />
      <span className="font-light text-base px-8 text-center">
        Você não tem nenhuma solicitação de veículo ainda
      </span>
      <TripsModalTriggerButton />
    </div>
  );
}
