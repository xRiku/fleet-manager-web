import { ReviewRequestDialog } from "@/components/dialogs/review-request-dialog";
import { GenericSkeleton } from "@/components/generic-skeleton";
import TripsTable from "@/components/tables/trips-table";
import { Suspense } from "react";

export default async function Page() {
  return (
    <div className="flex flex-col items-start justify-center">
      <div className="flex items-center justify-between w-full mt-8">
        <h1 className="text-xl font-semibold mb-6">Viagens</h1>
      </div>
      <Suspense fallback={<GenericSkeleton />}>
        <TripsTable />
      </Suspense>
      <ReviewRequestDialog />
    </div>
  );
}
