import { AppSidebar } from "@/components/app-sidebar";
import { BranchDialog } from "@/components/dialogs/branch-dialog";
import Header from "@/components/header";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <SidebarProvider>
        <AppSidebar />
        <main className="flex flex-col w-full px-2">
          <Header />
          {children}
          <BranchDialog />
        </main>
      </SidebarProvider>
    </div>
  );
}
