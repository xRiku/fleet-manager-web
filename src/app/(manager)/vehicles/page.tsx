import VehiclesModalTriggerButton from "@/components/buttons/vehicles-modal-trigger-button";
import { VehicleDialog } from "@/components/dialogs/vehicle-dialog";
import { GenericSkeleton } from "@/components/generic-skeleton";
import VehiclesTable from "@/components/tables/vehicles-table";
import { getBranches } from "@/lib/server-utils";
import { Suspense } from "react";

export default function Page() {
  const branches = getBranches();

  return (
    <div className="flex flex-col items-start justify-center">
      <div className="flex items-center justify-between w-full mt-8">
        <h1 className="text-xl font-semibold mb-6">Veículos</h1>
        <VehiclesModalTriggerButton />
      </div>
      <Suspense key={"vehicles"} fallback={<GenericSkeleton />}>
        <VehiclesTable />
      </Suspense>

      <Suspense fallback="Loading ...">
        <VehicleDialog branchesPromise={branches} />
      </Suspense>
    </div>
  );
}
