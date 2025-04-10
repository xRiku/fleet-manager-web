import VehiclesModalTriggerButton from "@/components/buttons/vehicles-modal-trigger-button";
import { VehicleDialog } from "@/components/dialogs/vehicle-dialog";
import VehiclesTable from "@/components/vehicles-table";
import { vehicles } from "@/db/vehicles";

export default function Page() {
  return (
    <div className="flex flex-col items-start justify-center">
      <div className="flex items-center justify-between w-full mt-8">
        <h1 className="text-xl font-semibold mb-6">Veículos</h1>
        <VehiclesModalTriggerButton />
      </div>
      <VehiclesTable vehicles={vehicles} />
      {/* <ul className="flex flex-col gap-2">
        {branches.map((branch, index) => (
          <li key={`${branch.name}-${index}`}>{branch.name}</li>
        ))}
      </ul> */}
      <VehicleDialog />
    </div>
  );
}
