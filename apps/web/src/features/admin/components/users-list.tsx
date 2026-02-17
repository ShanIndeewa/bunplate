import { authClient } from "@/lib/auth-client";
import { Card, CardContent } from "@/components/ui/card";
import { headers } from "next/headers";
import Link from "next/link";
import { getAllUsers } from "../actions/getAllUsers.action";
import { CreateUserForm } from "./create-user-form";
import { UsersFilter } from "./users-filter";
import { UsersPagination } from "./users-pagination";
import { UsersTable } from "./users-table";

interface UsersListProps {
  page?: string;
  limit?: string;
  search?: string;
  role?: string;
  banned?: string;
}

export async function UsersList({
  page = "1",
  limit = "20",
  search = "",
  role,
  banned,
}: UsersListProps) {
  const headersList = await headers();
  const cookieHeader = headersList.get("cookie");

  const session = await authClient.getSession({
    fetchOptions: {
      headers: {
        ...(cookieHeader && { cookie: cookieHeader }),
      },
    },
  });

  if (session.error) {
    return (
      <Card className="bg-red-50 border-none">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <h3 className="text-lg font-medium text-red-600 mb-1">
            Authentication Error
          </h3>
          <p className="text-muted-foreground max-w-sm">
            Please log in to view users.
          </p>
        </CardContent>
      </Card>
    );
  }

  try {
    // Prepare parameters
    const params = {
      page,
      limit,
      search: search?.trim() || "",
      role:
        role && ["admin", "user", "moderator"].includes(role)
          ? (role as "admin" | "user" | "moderator")
          : undefined,
      banned: banned === "true" ? true : banned === "false" ? false : undefined,
    };

    console.log("UsersList calling getAllUsers with params:", params);

    // Get users data with pagination
    const response = await getAllUsers(params);

    // Convert string dates to Date objects and ensure proper typing
    const users = response.data.map((user: any) => ({
      ...user,
      createdAt: new Date(user.createdAt),
      updatedAt: user.updatedAt ? new Date(user.updatedAt) : null,
      banExpires: user.banExpires ? new Date(user.banExpires) : null,
      lastActive: user.lastActive ? new Date(user.lastActive) : null,
      connections: user.connections || { following: 0, followers: 0 },
      posts: user.posts || 0,
    }));

    // Get pagination metadata
    const { currentPage, totalPages, totalCount } = response.meta;

    // Separate users by role for display
    const adminUsers = users.filter((user) => user.role === "admin");
    const moderatorUsers = users.filter((user) => user.role === "moderator");
    const regularUsers = users.filter(
      (user) => user.role === "user" || !user.role
    );

    return (
      <div className="space-y-6">
        {/* Header with Filter, Search, and Count */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4 flex-1">
            <UsersFilter />
          </div>
          <div className="text-sm text-muted-foreground">
            {totalCount} {totalCount === 1 ? "user" : "users"} found
            {role && <span className="ml-1">({role} role)</span>}
          </div>
        </div>

        {/* Users Table */}
        {users.length === 0 ? (
          <Card className="bg-cyan-50 border-none">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-cyan-100 p-3 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-cyan-600"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No users found
              </h3>
              <p className="text-muted-foreground max-w-sm mb-4">
                {search
                  ? `No results found for "${search}". Try a different search term.`
                  : role
                    ? `No users found with role "${role}".`
                    : "No users match the selected filters."}
              </p>
              <CreateUserForm />
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            {/* Show tables grouped by role if no specific role filter is applied */}
            {!role ? (
              <>
                {/* Administrators Table */}
                {adminUsers.length > 0 && (
                  <div>
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                        <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                        Administrators ({adminUsers.length})
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Users with full administrative privileges
                      </p>
                    </div>
                    <UsersTable users={adminUsers} />
                  </div>
                )}

                {/* Moderators Table */}
                {moderatorUsers.length > 0 && (
                  <div>
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                        <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                        Moderators ({moderatorUsers.length})
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Users with moderation privileges
                      </p>
                    </div>
                    <UsersTable users={moderatorUsers} />
                  </div>
                )}

                {/* Regular Users Table */}
                {regularUsers.length > 0 && (
                  <div>
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                        Users ({regularUsers.length})
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Regular platform users
                      </p>
                    </div>
                    <UsersTable users={regularUsers} />
                  </div>
                )}
              </>
            ) : (
              // Show single table if a specific role filter is applied
              <div>
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {role.charAt(0).toUpperCase() + role.slice(1)} Users (
                    {users.length})
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Filtered results for {role} role
                  </p>
                </div>
                <UsersTable users={users} />
              </div>
            )}
          </div>
        )}

        {/* Pagination */}
        <UsersPagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    );
  } catch (error) {
    console.error("Error in UsersList:", error);

    return (
      <Card className="bg-red-50 border-red-200">
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <h3 className="text-lg font-medium text-red-600 mb-1">
            Error Loading Users
          </h3>
          <p className="text-red-500 mb-4">
            {error instanceof Error
              ? error.message
              : "An unexpected error occurred"}
          </p>
          <div className="flex gap-2">
            <Link
              href="/admin/users"
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Try Again
            </Link>
            <Link
              href="/admin/users/debug"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Debug API
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }
}
