"use client";

import { CompanyTabBar } from "@/features/company/components/company-tab-bar";
import { ProfileTabBar } from "@/features/company/components/profile-tab-bar";
import { usePathname } from "next/navigation";

const PROFILE_PREFIXES = [
  "/account/manage/profile-details",
  "/account/manage/user-skills",
  "/account/manage/user-education",
  "/account/manage/user-project",
  "/account/manage/user-recomndation", // keeping your exact route
];

function isProfileRoute(pathname: string) {
  // Normalize to avoid accidental trailing slash mismatches
  const p =
    pathname.endsWith("/") && pathname !== "/"
      ? pathname.slice(0, -1)
      : pathname;
  return PROFILE_PREFIXES.some(
    (prefix) => p === prefix || p.startsWith(prefix + "/")
  );
}

export default function TabBarSwitcher() {
  const pathname = usePathname();
  const showProfile = isProfileRoute(pathname || "/");

  return showProfile ? <ProfileTabBar /> : <CompanyTabBar />;
}
