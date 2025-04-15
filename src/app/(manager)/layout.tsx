import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import AdminHeader from "@/components/admin-header";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export default function Layout({ children }: { children: React.ReactNode }) {
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
