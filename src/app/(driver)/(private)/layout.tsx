import Header from "@/components/header";
import { RequestVehicleDrawer } from "@/components/request-vehicle-drawer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col w-full">
      <Header />
      <div className="py-8 px-4">{children}</div>
      <RequestVehicleDrawer />
    </main>
  );
}
