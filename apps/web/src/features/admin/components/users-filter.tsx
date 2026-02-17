// "use client";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Search } from "lucide-react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useState } from "react";

// export function UsersFilter() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [search, setSearch] = useState(searchParams.get("search") || "");

//   const currentRole = searchParams.get("role") || "";
//   const currentBanned = searchParams.get("banned") || "";

//   const handleSearchSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     updateUrl({ search: search.trim() });
//   };

//   const updateUrl = (params: Record<string, string>) => {
//     const newSearchParams = new URLSearchParams(searchParams);

//     Object.entries(params).forEach(([key, value]) => {
//       if (value && value.trim() !== "" && value !== "all") {
//         newSearchParams.set(key, value);
//       } else {
//         newSearchParams.delete(key);
//       }
//     });

//     // Reset to page 1 when filtering
//     newSearchParams.set("page", "1");

//     router.push(`?${newSearchParams.toString()}`);
//   };

//   const handleRoleChange = (value: string) => {
//     updateUrl({ role: value === "all" ? "" : value });
//   };

//   const handleStatusChange = (value: string) => {
//     updateUrl({ banned: value === "all" ? "" : value });
//   };

//   return (
//     <div className="flex flex-col md:flex-row gap-4">
//       {/* Search */}
//       <form onSubmit={handleSearchSubmit} className="flex gap-2">
//         <div className="relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//           <Input
//             type="text"
//             placeholder="Search users..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="pl-10 w-64"
//           />
//         </div>
//         <Button type="submit" size="sm">
//           Search
//         </Button>
//       </form>

//       {/* Role Filter */}
//       <Select value={currentRole || "all"} onValueChange={handleRoleChange}>
//         <SelectTrigger className="w-40">
//           <SelectValue placeholder="All Roles" />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectItem value="all">All Roles</SelectItem>
//           <SelectItem value="admin">Admin</SelectItem>
//           <SelectItem value="moderator">B2B</SelectItem>
//           <SelectItem value="user">User</SelectItem>
//         </SelectContent>
//       </Select>

//       {/* Status Filter */}
//       <Select value={currentBanned || "all"} onValueChange={handleStatusChange}>
//         <SelectTrigger className="w-40">
//           <SelectValue placeholder="All Status" />
//         </SelectTrigger>
//         <SelectContent>
//           <SelectItem value="all">All Status</SelectItem>
//           <SelectItem value="false">Active</SelectItem>
//           <SelectItem value="true">Banned</SelectItem>
//         </SelectContent>
//       </Select>

//       {/* Clear Filters */}
//       {(currentRole || currentBanned || search) && (
//         <Button
//           variant="outline"
//           onClick={() => {
//             setSearch("");
//             router.push("/adminpanel/users");
//           }}
//         >
//           Clear Filters
//         </Button>
//       )}
//     </div>
//   );
// }

"use client";

import { authClient } from "@/lib/auth-client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building2, Search, Shield, Users } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface SessionData {
  user: {
    id: string;
    email: string;
    name?: string;
    role?: string;
    activeOrganizationId?: string;
  } | null;
  session: {
    id: string;
    activeOrganizationId?: string;
  } | null;
}

export function UsersFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [isLoadingSession, setIsLoadingSession] = useState(true);

  const currentRole = searchParams.get("role") || "";

  // Check if current user has organization access
  const hasOrganizationAccess =
    sessionData?.session?.activeOrganizationId ||
    sessionData?.user?.activeOrganizationId;

  useEffect(() => {
    const fetchSession = async () => {
      try {
        setIsLoadingSession(true);
        const { data: session } = await authClient.getSession();
        console.log("Session data:", session);
        setSessionData(session as SessionData | null);
      } catch (error) {
        console.error("Error fetching session:", error);
        setSessionData(null);
      } finally {
        setIsLoadingSession(false);
      }
    };

    fetchSession();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUrl({ search: search.trim() });
  };

  const updateUrl = (params: Record<string, string>) => {
    const newSearchParams = new URLSearchParams(searchParams);

    Object.entries(params).forEach(([key, value]) => {
      if (value && value.trim() !== "" && value !== "all") {
        newSearchParams.set(key, value);
      } else {
        newSearchParams.delete(key);
      }
    });

    // Reset to page 1 when filtering
    newSearchParams.set("page", "1");

    router.push(`?${newSearchParams.toString()}`);
  };

  const handleRoleChange = (value: string) => {
    updateUrl({ role: value === "all" ? "" : value });
  };

  // status filter removed

  const clearAllFilters = () => {
    setSearch("");
    router.push("/admin/users");
  };

  return (
    <div className="space-y-4">
      {/* Organization Status Indicator */}
      {!isLoadingSession && (
        <div className="flex items-center gap-2">
          {hasOrganizationAccess ? (
            <Badge
              variant="default"
              className="bg-purple-100 text-purple-800 hover:bg-purple-100"
            >
              <Building2 className="h-3 w-3 mr-1" />
              Organization Access Available
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-gray-50 text-gray-600">
              <Users className="h-3 w-3 mr-1" />
              Personal Account
            </Badge>
          )}
          {sessionData?.session?.activeOrganizationId && (
            <span className="text-xs text-muted-foreground">
              Org ID: {sessionData.session.activeOrganizationId.slice(0, 8)}...
            </span>
          )}
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Button type="submit" size="sm">
            Search
          </Button>
        </form>

        {/* Role Filter */}
        <Select value={currentRole || "all"} onValueChange={handleRoleChange}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Filter by Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              <div className="flex items-center gap-2">
                <Shield className="h-3 w-3" />
                All Roles
              </div>
            </SelectItem>
            <SelectItem value="admin">
              <div className="flex items-center gap-2">
                <Shield className="h-3 w-3 text-red-600" />
                Admin
              </div>
            </SelectItem>
            <SelectItem value="user">
              <div className="flex items-center gap-2">
                <Users className="h-3 w-3 text-gray-600" />
                Regular User
              </div>
            </SelectItem>
          </SelectContent>
        </Select>

        {/* Status filter removed */}

        {/* Clear Filters */}
        {(currentRole || search) && (
          <Button variant="outline" onClick={clearAllFilters}>
            Clear All Filters
          </Button>
        )}
      </div>

      {/* Filter Summary */}
      {(currentRole || search) && (
        <div className="flex flex-wrap gap-2">
          {search && (
            <Badge variant="secondary" className="text-xs">
              Search: "{search}"
            </Badge>
          )}
          {currentRole && currentRole !== "all" && (
            <Badge variant="secondary" className="text-xs">
              Role:{" "}
              {currentRole === "b2b"
                ? "B2B User"
                : currentRole.charAt(0).toUpperCase() + currentRole.slice(1)}
            </Badge>
          )}
          {/* status badge removed */}
        </div>
      )}

      {/* Organization Access Info */}
    </div>
  );
}
