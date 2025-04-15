import TripsTable from "@/components/tables/trips-table";
import { getTrips } from "@/lib/server-utils";
import { Role } from "@/types";
// import { trips } from "@/db/trips";

export default async function Home() {
  const trips = (await getTrips()).map((trip) => ({
    ...trip,
    progress: trip.progress ?? undefined,
    reviewedAt: trip.reviewedAt ?? undefined,
    reviewedBy: trip.reviewedBy ?? undefined,
    driver: {
      ...trip.driver,
      role: trip.driver.role as Role, // Ensure driver.role is cast to the Role type
    },
  }));

  return (
    <div className="h-1/2 flex flex-col items-start justify-center">
      <h1 className="text-xl font-semibold mb-6">Viagens</h1>
      <TripsTable trips={trips} />
    </div>
  );
}
