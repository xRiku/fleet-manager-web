import { CompleteTripConfirmationDrawer } from "@/components/complete-trip-confirmation-drawer";
import Header from "@/components/header";
import { RequestVehicleDrawer } from "@/components/request-vehicle-drawer";
import { auth } from "@/lib/auth";
import { getGarages } from "@/lib/server-utils";
import { Role } from "@/types";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const garagesPromise = getGarages();
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user.role === Role.ADMIN) {
    redirect("/dashboard");
  }

  return (
    <main className="flex flex-col w-full h-dvh">
      <Header />
      <div className="py-8 px-4 h-full">{children}</div>
      <RequestVehicleDrawer garagesPromise={garagesPromise} />
      <CompleteTripConfirmationDrawer />
    </main>
  );
}
