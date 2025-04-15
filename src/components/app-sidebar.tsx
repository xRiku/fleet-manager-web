"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Car,
  Garage,
  Gear,
  House,
  Signpost,
  Users,
} from "@phosphor-icons/react";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: House,
  },
  {
    title: "Veículos",
    url: "/vehicles",
    icon: Car,
  },
  {
    title: "Viagens",
    url: "/trips",
    icon: Signpost,
  },
  {
    title: "Filiais",
    url: "/branches",
    icon: Garage,
  },
  {
    title: "Usuários",
    url: "/users",
    icon: Users,
  },
  {
    title: "Settings",
    url: "#",
    icon: Gear,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="gap-2 mb-2">
            <Link href="/dashboard">
              <Image width={32} height={32} src="/logo.svg" alt="logo image" />
            </Link>
            <p className="text-xl font-bold text-primary">Fleet Manager</p>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className={`${
                    pathname === item.url
                      ? "bg-accent font-medium text-accent-foreground rounded-md"
                      : "font-normal text-foreground"
                  }`}
                >
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
