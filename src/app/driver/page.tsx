import TripsModalTriggerButton from "@/components/buttons/trips-modal-trigger-button";
import DriverRequestsTable from "@/components/tables/driver-requests-table";
import {
  getCurrentTripForDriver,
  getVehicleRequestsForDriver,
} from "@/lib/server-utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import CompleteTripConfirmationModalTriggerButton from "@/components/buttons/complete-trip-confirmation-modal-trigger-button";
import { Car, FlagBannerFold, MapPin } from "@phosphor-icons/react/dist/ssr";
import { format } from "date-fns";

export default async function Page() {
  const requests = await getVehicleRequestsForDriver();
  const currentTrip = await getCurrentTripForDriver();

  if (!requests.length) {
    return <VehicleRequestsEmptyState />;
  }
  

  return (
    <Tabs
      defaultValue={currentTrip ? "current-trip" : "requests"}
      className="w-full h-full"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="current-trip">Viagem atual</TabsTrigger>
        <TabsTrigger value="requests">Solicitações</TabsTrigger>
      </TabsList>
      <TabsContent value="current-trip">
        {currentTrip ? (
          <div className="flex flex-col gap-8 h-full">
            <div className="w-full rounded-md bg-muted flex flex-col p-4">
              <span className="font-semibold mb-2">{format(new Date(currentTrip?.createdAt), "dd/MM/yyyy")}</span>
              <div className="flex flex-col">
                <span className="inline-flex items-center gap-2">
                  <Car weight="duotone" />
                  {`${currentTrip?.vehicle.brand} ${currentTrip?.vehicle.model} ${currentTrip?.vehicle.color} - ${currentTrip?.vehicle.plate}`}
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin weight="duotone" />
                  Origem: {currentTrip?.origin.name}
                </span>
              </div>
              <span className="inline-flex items-center gap-2">
                <FlagBannerFold weight="duotone" />
                Destino: {currentTrip?.destiny.name}
              </span>
            </div>

            <CompleteTripConfirmationModalTriggerButton />
          </div>
        ) : (
          <CurrentTripEmptyState />
        )}
      </TabsContent>
      <TabsContent value="requests">
        <div className="flex flex-col gap-4 h-full">
          <DriverRequestsTable trips={requests} />
          <div className="mt-auto">
            <TripsModalTriggerButton />
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}

function VehicleRequestsEmptyState() {
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

function CurrentTripEmptyState() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Image width={250} height={250} src="/empty-map.png" alt="empty map" />
      <div className="flex flex-col gap-2 text-center self-center w-4/5">
        <span className="font-semibold text-xl">Nenhuma viagem atual</span>
        <p className="leading-5">
          No momento, você não possui uma viagem em andamento
        </p>
      </div>
    </div>
  );
}
