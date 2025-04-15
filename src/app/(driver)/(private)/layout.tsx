import Header from "@/components/header";
import { RequestVehicleDrawer } from "@/components/request-vehicle-drawer";
import { getBranches, getVehicles } from "@/lib/server-utils";

export default function Layout({ children }: { children: React.ReactNode }) {
  const vehiclesPromise = getVehicles();
  const branchesPromise = getBranches();

  return (
    <main className="flex flex-col w-full">
      <Header />
      <div className="py-8 px-4">{children}</div>
      <RequestVehicleDrawer
        vehiclesPromise={vehiclesPromise}
        branchesPromise={branchesPromise}
      />
    </main>
  );
}
