import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/header";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <SidebarProvider>
        <AppSidebar />
        <main className="flex flex-col w-full px-2">
          <Header />
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
