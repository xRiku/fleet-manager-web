import {
  AvgReviewTimeCard,
  TotalTripsCard,
  TotalVehiclesCard,
  RequestsInAnalysisCard,
} from "@/components/cards/dashboard-cards";
import { AvailabilityPieChart } from "@/components/charts/availability-pie-chart";
import { TripsOverTimeLineChart } from "@/components/charts/trips-line-chart";

export default function Home() {
  return (
    <div className="flex flex-col justify-between w-full mt-8">
      <h1 className="text-xl font-semibold mb-6">Dashboard</h1>
      <div className="grid grid-cols-8 gap-2 ">
        <span className="col-span-2">
          <TotalVehiclesCard />
        </span>
        <span className="col-span-2">
          <TotalTripsCard />
        </span>
        <span className="col-span-2">
          <AvgReviewTimeCard />
        </span>
        <span className="col-span-2">
          <RequestsInAnalysisCard />
        </span>
        <div className="col-span-5">
          <TripsOverTimeLineChart />
        </div>
        <div className="col-span-3">
          <AvailabilityPieChart />
        </div>
      </div>
    </div>
  );
}
