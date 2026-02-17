"use client";

import { UserProfileTabBar } from "@/features/company/components/user-profile-tabbar";
import { UserTabBar } from "@/features/company/components/user-tab-bar";
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

export default function UserTabBarSwitcher() {
  const pathname = usePathname();
  const showProfile = isProfileRoute(pathname || "/");

  return showProfile ? <UserProfileTabBar /> : <UserTabBar />;
}
