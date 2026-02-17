"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/components/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {};

const CompanyTabs = [
  { name: "User Profile", href: "/account/manage/profile-details" },
  { name: "User Skills", href: "/account/manage/user-skills" },
  { name: "User Education", href: "/account/manage/user-education" },
  { name: "User Projects", href: "/account/manage/user-project" },
  { name: "User Recomondation", href: "/account/manage/user-recomndation" },
  { name: "Overview", href: "/account/manage" },
  { name: "Jobs", href: "/account/manage/jobs" },
  { name: "Applications", href: "/account/manage/job-application-details" },
];

export function ProfileTabBar({}: Props) {
  const pathname = usePathname();

  const currentTab = CompanyTabs.find((tab) => tab.href === pathname);

  return (
    <div className="flex items-center gap-0.5">
      {CompanyTabs.map((tab) => (
        <Button
          key={tab.href}
          variant={"ghost"}
          className={cn(
            `px-4 min-h-11 h-full rounded-none hover:bg-secondary/30 cursor-pointer`,
            currentTab?.href === tab.href &&
              "border-b-2 border-primary bg-secondary/30"
          )}
          asChild
        >
          <Link href={tab.href}>{tab.name}</Link>
        </Button>
      ))}
    </div>
  );
}
