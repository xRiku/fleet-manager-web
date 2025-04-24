import GaragesModalTriggerButton from "@/components/buttons/garages-modal-trigger-button";
import { GarageDialog } from "@/components/dialogs/garage-dialog";
import { getGarages } from "@/lib/server-utils";
import GarageCard from "@/components/garage-card";

export default async function Page() {
  const garages = await getGarages();
  return (
    <div className="flex flex-col items-start justify-center">
      <div className="flex items-center justify-between w-full mt-8">
        <h1 className="text-xl font-semibold mb-6">Garagens</h1>
        <GaragesModalTriggerButton />
      </div>
      <ul className="grid grid-cols-[repeat(4,minmax(100px,500px))] gap-4">
        {garages.map((garage, index) => (
          <GarageCard garage={garage} key={`${garage.name}-${index}`}/>

          // <li key={`${garage.name}-${index}`}>{garage.name}</li>
        ))}
      </ul>
      <GarageDialog />
    </div>
  );
}
