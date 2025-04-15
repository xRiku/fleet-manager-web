import TripsModalTriggerButton from "@/components/buttons/trips-modal-trigger-button";
import TripsTable from "@/components/tables/trips-table";
import { getVehicleRequestsForUser } from "@/lib/server-utils";
import Image from "next/image";

export default async function Page() {
  const requests = await getVehicleRequestsForUser();

  if (!requests.length) {
    return <DriverEmptyState />;
  }

  const trips = requests.map((request) => ({
    ...request,
    progress: request.progress ?? undefined, // Map null to undefined for compatibility
    authorizedBy: request.authorizedBy ?? undefined, // Map null to undefined for compatibility
    authorizedAt: request.authorizedAt ?? undefined, // Map null to undefined for compatibility
  }));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-xl font-medium">Solicitações</span>
        <TripsModalTriggerButton />
      </div>
      <TripsTable trips={trips} />
    </div>
  );
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
