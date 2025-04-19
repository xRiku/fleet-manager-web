import { CompleteTripConfirmationDrawer } from "@/components/complete-trip-confirmation-drawer";
import Header from "@/components/header";
import { RequestVehicleDrawer } from "@/components/request-vehicle-drawer";
import { getBranches } from "@/lib/server-utils";

export default function Layout({ children }: { children: React.ReactNode }) {
  const branchesPromise = getBranches();

  return (
    <main className="flex flex-col w-full h-dvh">
      <Header />
      <div className="py-8 px-4 h-full">{children}</div>
      <RequestVehicleDrawer branchesPromise={branchesPromise} />
      <CompleteTripConfirmationDrawer />
    </main>
  );
}
