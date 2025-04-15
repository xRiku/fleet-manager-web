import TripsTable from "@/components/tables/trips-table";
import { getTrips } from "@/lib/server-utils";
import { Role } from "@/types";

export default async function Page() {
  const trips = (await getTrips()).map((trip) => ({
    ...trip,
    driver: {
      ...trip.driver,
      role: trip.driver.role as Role, // Ensure role is cast to the correct type
    },
    progress: trip.progress ?? undefined, // Convert null to undefined for compatibility
    authorizedBy: trip.authorizedBy ?? undefined, // Convert null to undefined for compatibility
    authorizedAt: trip.authorizedAt ?? undefined, // Convert null to undefined for compatibility
  }));

  return (
    <div className="flex flex-col items-start justify-center">
      <div className="flex items-center justify-between w-full mt-8">
        <h1 className="text-xl font-semibold mb-6">Viagens</h1>
      </div>
      <TripsTable trips={trips} />
    </div>
  );
}
