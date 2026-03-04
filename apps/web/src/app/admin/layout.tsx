import React from "react";

import { AppSidebar } from "@/components/admin-dashboard/app-sidebar";
import { SiteHeader } from "@/components/admin-dashboard/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

type Props = {
  children?: React.ReactNode;
};

export default function AdminDashboardLayout({ children }: Props) {
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      }}
    >
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <AppSidebar variant="inset" />
        <SidebarInset className="bg-background" style={{ flex: 1, marginLeft: 'calc(var(--sidebar-width))' }}>
          <SiteHeader />
          <div className="flex flex-1 flex-col">{children}</div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
