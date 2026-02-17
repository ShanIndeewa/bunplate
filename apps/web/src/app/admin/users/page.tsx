import { CreateUserForm } from "@/features/admin/components/create-user-form";
import { UsersList } from "@/features/admin/components/users-list";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

interface UsersPageProps {
  searchParams?: {
    page?: string;
    limit?: string;
    search?: string;
    role?: string;
    banned?: string;
  };
}

function UsersLoading() {
  return (
    <Card>
      <CardContent className="flex items-center justify-center py-12">
        <Loader2 className="animate-spin h-8 w-8 text-cyan-500" />
        <span className="ml-3 text-cyan-700 font-medium">Loading users...</span>
      </CardContent>
    </Card>
  );
}

export default async function UsersPage({ searchParams }: UsersPageProps) {
  // Clean and validate search params
  const cleanParams = {
    page:
      searchParams?.page && /^\d+$/.test(searchParams.page)
        ? searchParams.page
        : "1",
    limit:
      searchParams?.limit && /^\d+$/.test(searchParams.limit)
        ? searchParams.limit
        : "20",
    search: searchParams?.search?.trim() || "",
    role:
      searchParams?.role &&
      ["admin", "user", "moderator"].includes(searchParams.role)
        ? searchParams.role
        : undefined,
    banned:
      searchParams?.banned === "true"
        ? "true"
        : searchParams?.banned === "false"
          ? "false"
          : undefined,
  };

  console.log("UsersPage cleaned params:", cleanParams);

  return (
    <div className="container mx-auto py-8 px-3 max-w-6xl">
      {/* Header with title and create button */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Users Management
          </h1>
          <p className="text-muted-foreground mt-1">
            View and manage all registered users organized by their roles
          </p>
        </div>
        <div className="flex-shrink-0">
          <CreateUserForm />
        </div>
      </div>

      <Suspense fallback={<UsersLoading />}>
        <UsersList {...cleanParams} />
      </Suspense>
    </div>
  );
}
