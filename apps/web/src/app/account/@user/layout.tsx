import React from "react";

import { AppSidebar } from "@/components/user-dashboard/app-sidebar";
import { SiteHeader } from "@/components/user-dashboard/site-header";
import UserTabBarSwitcher from "@/features/company/components/user-tab-bar-switcher";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

type Props = {
  children?: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset className="bg-background">
        <SiteHeader />
        <UserTabBarSwitcher />

        <div className="flex flex-1 flex-col">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
