"use client";

import {
  IconBriefcase,
  IconBuildings,
  IconDashboard,
  IconFileText,
  IconHelp,
  IconNotification,
  IconSearch,
  IconSettings,
  IconStar,
} from "@tabler/icons-react";
import * as React from "react";

import { NavDocuments } from "@/components/dashboard/nav-documents";
import { NavMain } from "@/components/dashboard/nav-main";
import { NavSecondary } from "@/components/dashboard/nav-secondary";
import { NavUser } from "@/components/dashboard/nav-user";
import { authClient } from "@/lib/auth-client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { PiBuilding } from "react-icons/pi";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: IconDashboard,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Manage Company",
      url: "/account/manage",
      icon: IconBuildings,
    },
    {
      name: "Jobs",
      url: "/account/manage/jobs",
      icon: IconBriefcase,
    },
    {
      name: "Job Applications",
      url: "/account/manage/job-application-details",
      icon: IconFileText,
    },
    // {
    //   name: "Payment Details",
    //   url: "/account/manage/payment-details",
    //   icon: IconCreditCard,
    // },
    // {
    //   name: "User Profile",
    //   url: "/account/manage/profile-details",
    //   icon: IconUser,
    // },
    // {
    //   name: "Ads Manage",
    //   url: "/account/manage/ads",
    //   icon: IconUser,
    // },
    {
      name: "Job Wishlist",
      url: "/account/manage/job-wishlist",
      icon: IconStar,
    },
    // {
    //   name: "Article",
    //   url: "/account/manage/article",
    //   icon: IconNews,
    // },
    {
      name: "Job Application Reviews",
      url: "/account/manage/jobapplicationreviews",
      icon: IconStar,
    },
    {
      name: "Notification Management",
      url: "/account/manage/notifications",
      icon: IconNotification,
    },
    // {
    //   name: "Bulk Messages",
    //   url: "/account/manage/bulk-messages",
    //   icon: IconUser,
    // },
  ],
  userManagement: [
    {
      name: "All Users",
      url: "/dashboard/users",
      icon: IconBuildings,
    },
    {
      name: "Organizations",
      url: "/dashboard/organizations",
      icon: IconBuildings,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const activeOrg = authClient.useActiveOrganization();

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            {activeOrg.isPending ? (
              <Skeleton className="h-6 w-full rounded-md" />
            ) : activeOrg.data ? (
              <SidebarMenuButton
                asChild
                className="data-[slot=sidebar-menu-button]:!p-1.5"
              >
                <div>
                  {activeOrg.data.logo ? (
                    <Image
                      src={activeOrg.data.logo}
                      alt="Organization Logo"
                      width={24}
                      height={24}
                      className="rounded object-cover"
                    />
                  ) : (
                    <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded">
                      <PiBuilding className="size-4" />
                    </div>
                  )}

                  <span className="text-base font-semibold font-heading">
                    {activeOrg.data.name}
                  </span>
                </div>
              </SidebarMenuButton>
            ) : (
              <></>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        {/* <NavUserManagement items={data.userManagement} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
