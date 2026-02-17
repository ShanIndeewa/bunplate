"use client";

import { getAllUsers } from "@/features/admin/actions/getAllUsers.action";
import { useGetCompanies } from "@/features/company/queries/use-get-all-companies";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Activity,
    Building2,
    Crown,
    Eye,
    FileText,
    TrendingUp,
    UserCheck,
    Users,
    UserX,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface User {
  id: string;
  email: string;
  role: string;
  activeOrganizationId?: string;
  banned?: boolean;
  emailVerified?: boolean;
  createdAt?: string;
}

interface UsersData {
  data: User[];
  meta: {
    totalCount: number;
    totalPages: number;
    currentPage: number;
  };
}

export default function AdminDashboardPage() {
  const [users, setUsers] = useState<UsersData | null>(null);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);

  // Fetch companies data
  const { data: companies, isLoading: isLoadingCompanies } = useGetCompanies({
    page: 1,
    limit: 10,
  });

  // Fetch users data
  useEffect(() => {
    async function fetchUsers() {
      try {
        setIsLoadingUsers(true);
        const userData = await getAllUsers({ page: "1", limit: "10" });
        setUsers(userData);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setIsLoadingUsers(false);
      }
    }

    fetchUsers();
  }, []);

  // Calculate statistics
  const totalUsers = users?.meta?.totalCount || 0;
  const totalCompanies = companies?.meta?.totalCount || 0;
  const activeUsers =
    users?.data?.filter((user) => !user.banned && user.emailVerified)?.length ||
    0;
  const adminUsers =
    users?.data?.filter((user) => user.role === "admin")?.length || 0;
  const b2bUsers =
    users?.data?.filter((user) => user.activeOrganizationId)?.length || 0;

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground text-lg">
          Comprehensive overview of your platform's users and companies
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              Registered platform users
            </p>
          </CardContent>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600" />
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Companies
            </CardTitle>
            <Building2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {totalCompanies}
            </div>
            <p className="text-xs text-muted-foreground">
              Registered companies
            </p>
          </CardContent>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-green-600" />
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <UserCheck className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">
              {activeUsers}
            </div>
            <p className="text-xs text-muted-foreground">
              Verified & active users
            </p>
          </CardContent>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-emerald-600" />
        </Card>

        {/* <Card className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">B2B Users</CardTitle>
            <Briefcase className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{b2bUsers}</div>
            <p className="text-xs text-muted-foreground">
              Business account users
            </p>
          </CardContent>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-purple-600" />
        </Card> */}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Recent Users */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-blue-900">
                  <Users className="h-5 w-5" />
                  Recent Users
                </CardTitle>
                <CardDescription className="text-blue-700">
                  Latest registered users on the platform
                </CardDescription>
              </div>
              <Link href="/admin/users">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-200 text-blue-700 hover:bg-blue-100"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {isLoadingUsers ? (
              <div className="p-6 text-center text-muted-foreground">
                <Activity className="h-8 w-8 animate-spin mx-auto mb-2" />
                Loading users...
              </div>
            ) : users?.data && users.data.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50/50">
                    <TableHead className="font-semibold">User</TableHead>
                    <TableHead className="font-semibold">Role</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Joined</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.data.slice(0, 5).map((user) => (
                    <TableRow
                      key={user.id}
                      className="hover:bg-blue-50/30 transition-colors"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                            <span className="text-xs font-semibold text-white">
                              {user.email.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-sm">
                              {user.email}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              ID: {user.id.slice(0, 8)}...
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            user.role === "admin"
                              ? "default"
                              : user.activeOrganizationId
                                ? "secondary"
                                : "outline"
                          }
                          className={
                            user.role === "admin"
                              ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
                              : user.activeOrganizationId
                                ? "bg-purple-100 text-purple-800 border-purple-200"
                                : ""
                          }
                        >
                          {user.role === "admin" && (
                            <Crown className="h-3 w-3 mr-1" />
                          )}
                          {user.activeOrganizationId ? "B2B" : user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            user.banned
                              ? "destructive"
                              : user.emailVerified
                                ? "default"
                                : "secondary"
                          }
                          className={
                            user.banned
                              ? "bg-red-100 text-red-800 border-red-200"
                              : user.emailVerified
                                ? "bg-green-100 text-green-800 border-green-200"
                                : "bg-yellow-100 text-yellow-800 border-yellow-200"
                          }
                        >
                          {user.banned ? (
                            <>
                              <UserX className="h-3 w-3 mr-1" />
                              Banned
                            </>
                          ) : user.emailVerified ? (
                            <>
                              <UserCheck className="h-3 w-3 mr-1" />
                              Active
                            </>
                          ) : (
                            "Unverified"
                          )}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString()
                          : "N/A"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="p-6 text-center text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No users found</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Companies */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-green-900">
                  <Building2 className="h-5 w-5" />
                  Recent Companies
                </CardTitle>
                <CardDescription className="text-green-700">
                  Latest companies registered on the platform
                </CardDescription>
              </div>
              <Link href="/admin/company">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-green-200 text-green-700 hover:bg-green-100"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {isLoadingCompanies ? (
              <div className="p-6 text-center text-muted-foreground">
                <Activity className="h-8 w-8 animate-spin mx-auto mb-2" />
                Loading companies...
              </div>
            ) : companies?.data && companies.data.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50/50">
                    <TableHead className="font-semibold">Company</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {companies.data.slice(0, 5).map((company) => (
                    <TableRow
                      key={company.id}
                      className="hover:bg-green-50/30 transition-colors"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                            <span className="text-xs font-semibold text-white">
                              {company.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-sm">
                              {company.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              ID: {company.id.slice(0, 8)}...
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            company.status === "active"
                              ? "default"
                              : "secondary"
                          }
                          className={
                            company.status === "active"
                              ? "bg-green-100 text-green-800 border-green-200"
                              : "bg-gray-100 text-gray-800 border-gray-200"
                          }
                        >
                          {company.status || "Active"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {company.createdAt
                          ? new Date(company.createdAt).toLocaleDateString()
                          : "N/A"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="p-6 text-center text-muted-foreground">
                <Building2 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No companies found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
          <CardTitle className="flex items-center gap-2 text-purple-900">
            <TrendingUp className="h-5 w-5" />
            Quick Actions
          </CardTitle>
          <CardDescription className="text-purple-700">
            Common administrative tasks and navigation
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Link href="/admin/users">
              <Button
                variant="outline"
                className="w-full h-16 flex flex-col gap-2 border-blue-200 hover:bg-blue-50 hover:border-blue-300 transition-all"
              >
                <Users className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium">Manage Users</span>
              </Button>
            </Link>
            <Link href="/admin/company">
              <Button
                variant="outline"
                className="w-full h-16 flex flex-col gap-2 border-green-200 hover:bg-green-50 hover:border-green-300 transition-all"
              >
                <Building2 className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium">Manage Companies</span>
              </Button>
            </Link>
            <Link href="/admin/job-application-details">
              <Button
                variant="outline"
                className="w-full h-16 flex flex-col gap-2 border-yellow-200 hover:bg-yellow-50 hover:border-yellow-300 transition-all"
              >
                <FileText className="h-5 w-5 text-yellow-600" />
                <span className="text-sm font-medium">Job Applications</span>
              </Button>
            </Link>
            <Button
              variant="outline"
              className="w-full h-16 flex flex-col gap-2 border-purple-200 hover:bg-purple-50 hover:border-purple-300 transition-all"
            >
              <Activity className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium">View Analytics</span>
            </Button>
            <Button
              variant="outline"
              className="w-full h-16 flex flex-col gap-2 border-orange-200 hover:bg-orange-50 hover:border-orange-300 transition-all"
            >
              <TrendingUp className="h-5 w-5 text-orange-600" />
              <span className="text-sm font-medium">Generate Reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
