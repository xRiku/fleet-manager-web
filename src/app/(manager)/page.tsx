import TripsTable from "@/components/trips-table";
import { trips } from "@/db/trips";

export default function Home() {
  return (
    <div className="h-1/2 flex flex-col items-start justify-center">
      <h1 className="text-xl font-semibold mb-6">Viagens</h1>
      <TripsTable trips={trips} />
    </div>
  );
}
