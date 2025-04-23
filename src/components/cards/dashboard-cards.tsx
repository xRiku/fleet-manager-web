import { getTrips, getVehicles } from "@/lib/server-utils";
import { Suspense } from "react";
import { SkeletonCardsValue } from "./skeleton-cards";
import { sleep } from "@/lib/utils";

export function TotalVehiclesCard() {
  return (
    <div className="flex flex-col gap-2 p-4 w-full h-full border rounded-md">
      <p className="font-light">Total de veículos</p>
      <div className="text-xl text-bold">
        <Suspense fallback={<SkeletonCardsValue />}>
          <TotalVehiclesValue />
        </Suspense>
      </div>
    </div>
  );
}

export function TotalTripsCard() {
  return (
    <div className="flex flex-col gap-2 p-4 w-full h-full border rounded-md">
      <p className="font-light">Total de viagens</p>
      <div className="text-xl text-bold">
        <Suspense fallback={<SkeletonCardsValue />}>
          <TotalTripsValue />
        </Suspense>
      </div>
    </div>
  );
}

export function RequestsInAnalysisCard() {
  return (
    <div className="flex flex-col gap-2 p-4 w-full h-full border rounded-md">
      <p className="font-light">Total de solicitações em análise</p>
      <div className="text-xl text-bold">
        <Suspense fallback={<SkeletonCardsValue />}>
          <RequestsInAnalysisValue />
        </Suspense>
      </div>
    </div>
  );
}
export function AvgReviewTimeCard() {
  return (
    <div className="flex flex-col gap-2 p-4 w-full h-full border rounded-md">
      <p className="font-light">Tempo médio para revisar solicitação</p>
      <div className="text-xl text-bold">
        <Suspense fallback={<SkeletonCardsValue />}>
          <AvgReviewTimeValue />
        </Suspense>
      </div>
    </div>
  );
}

async function TotalVehiclesValue() {
  const data = await getVehicles();
  await sleep(1500);
  return <>{data.length}</>;
}

async function TotalTripsValue() {
  const data = await getTrips();
  await sleep(1500);
  return <>{data.length}</>;
}

async function AvgReviewTimeValue() {
  const data = await getTrips();

  return <p>{data.length} horas</p>;
}
async function RequestsInAnalysisValue() {
  const data = await getTrips();
  return <>{data.length}</>;
}
