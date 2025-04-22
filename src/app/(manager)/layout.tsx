import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import AdminHeader from "@/components/admin-header";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { redirect } from "next/navigation";
import { Role } from "@/types";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user.role === Role.USER) {
    redirect("/driver");
  }

  return (
    <NuqsAdapter>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex flex-col w-full px-4">
          <AdminHeader />
          {children}
        </main>
      </SidebarProvider>
    </NuqsAdapter>
  );
}
