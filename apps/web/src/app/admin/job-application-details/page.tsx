"use client";

import { useDeleteJobApplication } from "@/features/company/queries/use-delete-job-application";
import { useGetAllJobApplications } from "@/features/company/queries/use-get-all-job-applications";
import { useUpdateAdminAction } from "@/features/company/queries/use-update-admin-action";
import { useUpdateJobApplicationStatus } from "@/features/company/queries/use-update-job-application-status.ts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import {
    ArrowLeftIcon,
    Calendar,
    ChevronDown,
    Edit,
    Eye,
    Mail,
    MoreHorizontal,
    Trash2,
    User
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const statusConfig = {
  draft: { label: "Draft", color: "bg-gray-100 text-gray-800" },
  submitted: { label: "Submitted", color: "bg-blue-100 text-blue-800" },
  under_review: { label: "Under Review", color: "bg-yellow-100 text-yellow-800" },
  shortlisted: { label: "Shortlisted", color: "bg-green-100 text-green-800" },
  interview_scheduled: { label: "Interview Scheduled", color: "bg-purple-100 text-purple-800" },
  offer_extended: { label: "Offer Extended", color: "bg-emerald-100 text-emerald-800" },
  hired: { label: "Hired", color: "bg-green-100 text-green-800" },
  rejected: { label: "Rejected", color: "bg-red-100 text-red-800" },
  withdrawn: { label: "Withdrawn", color: "bg-gray-100 text-gray-800" },
};

const adminActionConfig = {
  admin_only: { label: "Admin Only", color: "bg-red-100 text-red-800" },
  access_company: { label: "Access Company", color: "bg-green-100 text-green-800" },
};

export default function JobApplicationDetailsPage() {
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedApplications, setSelectedApplications] = useState<Set<string>>(new Set());
  const [isBulkUpdating, setIsBulkUpdating] = useState(false);

  const { data: applicationsData, isLoading, isError } = useGetAllJobApplications({
    page: currentPage,
    limit: 20,
    status: statusFilter || undefined,
    search: searchTerm || undefined,
  });

  const applications = applicationsData?.data || [];
  const paginationMeta = applicationsData?.meta;

  const updateStatusMutation = useUpdateJobApplicationStatus();
  const updateAdminActionMutation = useUpdateAdminAction();
  const deleteJobApplicationMutation = useDeleteJobApplication();

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, searchTerm]);

  const handleStatusUpdate = async (applicationId: string, newStatus: string) => {
    try {
      setUpdatingStatus(applicationId);
      await updateStatusMutation.mutateAsync({
        id: applicationId,
        status: newStatus as any,
      });
      toast.success("Application status updated successfully");
    } catch (error) {
      toast.error("Failed to update application status");
      console.error("Status update error:", error);
    } finally {
      setUpdatingStatus(null);
    }
  };

  const handleAdminActionUpdate = async (applicationId: string, newAdminAction: "admin_only" | "access_company") => {
    try {
      await updateAdminActionMutation.mutateAsync({
        id: applicationId,
        adminAction: newAdminAction,
      });
    } catch (error) {
      console.error("Admin action update error:", error);
    }
  };

  const handleSelectApplication = (applicationId: string, checked: boolean) => {
    setSelectedApplications(prev => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(applicationId);
      } else {
        newSet.delete(applicationId);
      }
      return newSet;
    });
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedApplications(new Set(applications.map(app => (app as any).id)));
    } else {
      setSelectedApplications(new Set());
    }
  };

  const handleBulkAdminActionUpdate = async (newAdminAction: "admin_only" | "access_company") => {
    if (selectedApplications.size === 0) {
      toast.error("Please select at least one application");
      return;
    }

    try {
      setIsBulkUpdating(true);
      const updatePromises = Array.from(selectedApplications).map(applicationId =>
        updateAdminActionMutation.mutateAsync({
          id: applicationId,
          adminAction: newAdminAction,
        })
      );

      await Promise.all(updatePromises);
      toast.success(`Successfully updated ${selectedApplications.size} applications to ${adminActionConfig[newAdminAction].label}`);
      setSelectedApplications(new Set());
    } catch (error) {
      toast.error("Failed to update some applications");
      console.error("Bulk admin action update error:", error);
    } finally {
      setIsBulkUpdating(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedApplications.size === 0) {
      toast.error("Please select at least one application");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete ${selectedApplications.size} job application(s)? This action cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    try {
      setIsBulkUpdating(true);
      const deletePromises = Array.from(selectedApplications).map(applicationId =>
        deleteJobApplicationMutation.mutateAsync(applicationId)
      );

      await Promise.all(deletePromises);
      toast.success(`Successfully deleted ${selectedApplications.size} applications`);
      setSelectedApplications(new Set());
    } catch (error) {
      toast.error("Failed to delete some applications");
      console.error("Bulk delete error:", error);
    } finally {
      setIsBulkUpdating(false);
    }
  };

  const handleIndividualDelete = async (applicationId: string, applicantName: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the job application for ${applicantName}? This action cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteJobApplicationMutation.mutateAsync(applicationId);
    } catch (error) {
      console.error("Individual delete error:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/account/manage/jobapplicationreviews">
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Reviews
            </Link>
          </Button>
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
        </div>
        <Card>
          <CardContent className="py-12">
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError || !applications) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/account/manage/jobapplicationreviews">
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Reviews
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Error Loading Applications</h1>
        </div>
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              Failed to load job applications. Please try again later.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin">
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Admin
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">All Job Applications</h1>
            <p className="text-muted-foreground">
              Manage and review all job applications across the platform
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search by name, email, job ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm w-64"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="">All Statuses</option>
            {Object.entries(statusConfig).map(([key, config]) => (
              <option key={key} value={key}>
                {config.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Global Admin Action Controls */}
      {selectedApplications.size > 0 && (
        <div className="flex justify-start">
          <Card className="border-gray-200 bg-white max-w-2xl">
            <CardContent className="py-3 px-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-900">
                  {selectedApplications.size} selected
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedApplications(new Set())}
                  className="text-gray-700 border-gray-300 hover:bg-gray-100"
                >
                  Clear
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={isBulkUpdating}
                      className="flex items-center gap-1"
                    >
                      <MoreHorizontal className="h-3 w-3" />
                      Bulk Actions
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem
                      onClick={() => handleBulkAdminActionUpdate("access_company")}
                      disabled={isBulkUpdating}
                      className="text-green-800 focus:text-green-800 focus:bg-green-50"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Access Company
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleBulkAdminActionUpdate("admin_only")}
                      disabled={isBulkUpdating}
                      className="text-red-800 focus:text-red-800 focus:bg-red-50"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Admin Only
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBulkDelete}
                  disabled={isBulkUpdating}
                  className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 flex items-center gap-1"
                >
                  <Trash2 className="h-3 w-3" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>
            All Job Applications
            {paginationMeta && (
              <span className="text-sm font-normal text-muted-foreground ml-2">
                ({paginationMeta.totalCount} total)
              </span>
            )}
          </CardTitle>
          <CardDescription>
            View and manage all job applications with applicant details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={applications.length > 0 && selectedApplications.size === applications.length}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Applicant</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Job ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Admin Action</TableHead>
                  <TableHead>Round</TableHead>
                  <TableHead>Applied Date</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
                      No job applications found
                    </TableCell>
                  </TableRow>
                ) : (
                  applications.map((application) => {
                    const statusInfo = statusConfig[(application as any).status as keyof typeof statusConfig] || statusConfig.draft;

                    return (
                      <TableRow key={(application as any).id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedApplications.has((application as any).id)}
                            onCheckedChange={(checked) => handleSelectApplication((application as any).id, checked as boolean)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            {application.user?.image ? (
                              <img
                                src={application.user.image}
                                alt="User avatar"
                                className="h-6 w-6 rounded-full object-cover"
                              />
                            ) : (
                              <User className="h-4 w-4 text-muted-foreground" />
                            )}
                            {application.user?.name ||
                             ((application as any).applicantProfile as any)?.fullName ||
                             "Unknown"}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            {application.user?.email ||
                             ((application as any).applicantProfile as any)?.email ||
                             "Not provided"}
                          </div>
                        </TableCell>
                        <TableCell>
                          <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                            {(application as any).jobId}
                          </code>
                        </TableCell>
                        <TableCell>
                          <Select
                            value={(application as any).status}
                            onValueChange={(newStatus) => handleStatusUpdate((application as any).id, newStatus)}
                            disabled={updatingStatus === (application as any).id}
                          >
                            <SelectTrigger className="w-[180px] h-8 p-0 border-0 bg-transparent hover:bg-gray-50">
                              <div className="flex items-center gap-2">
                                {updatingStatus === (application as any).id ? (
                                  <>
                                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                    <span className="text-sm text-muted-foreground">Updating...</span>
                                  </>
                                ) : (
                                  <>
                                    <Badge className={`${statusInfo.color} px-2 py-1`}>
                                      {statusInfo.label}
                                    </Badge>
                                    <ChevronDown className="h-3 w-3 text-muted-foreground" />
                                  </>
                                )}
                              </div>
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(statusConfig).map(([key, config]) => (
                                <SelectItem key={key} value={key}>
                                  <div className="flex items-center gap-2">
                                    <Badge className={`${config.color} px-2 py-1`}>
                                      {config.label}
                                    </Badge>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Select
                            value={application.adminAction || "access_company"}
                            onValueChange={(newAdminAction) => handleAdminActionUpdate((application as any).id, newAdminAction as "admin_only" | "access_company")}
                            disabled={updateAdminActionMutation.isPending}
                          >
                            <SelectTrigger className="w-[160px] h-8 p-0 border-0 bg-transparent hover:bg-gray-50">
                              <div className="flex items-center gap-2">
                                {updateAdminActionMutation.isPending ? (
                                  <>
                                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                    <span className="text-sm text-muted-foreground">Updating...</span>
                                  </>
                                ) : (
                                  <>
                                    <Badge className={`${adminActionConfig[application.adminAction || "access_company"].color} px-2 py-1`}>
                                      {adminActionConfig[application.adminAction || "access_company"].label}
                                    </Badge>
                                    <ChevronDown className="h-3 w-3 text-muted-foreground" />
                                  </>
                                )}
                              </div>
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(adminActionConfig).map(([key, config]) => (
                                <SelectItem key={key} value={key}>
                                  <div className="flex items-center gap-2">
                                    <Badge className={`${config.color} px-2 py-1`}>
                                      {config.label}
                                    </Badge>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm font-medium">
                            Round {(application as any).roundNo}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            {(application as any).submittedAt
                              ? format(new Date((application as any).submittedAt), "MMM dd, yyyy")
                              : (application as any).createdAt
                              ? format(new Date((application as any).createdAt), "MMM dd, yyyy")
                              : "Not available"}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">
                            {(application as any).source || "Not specified"}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button size="sm" variant="outline" asChild>
                              <Link href={`/account/manage/job-application-details/view?id=${(application as any).id}`}>
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button size="sm" variant="outline" asChild>
                              <Link href={`/account/manage/jobapplicationreviews?applicationId=${(application as any).id}`}>
                                <Edit className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleIndividualDelete(
                                (application as any).id,
                                application.user?.name ||
                                ((application as any).applicantProfile as any)?.fullName ||
                                "Unknown"
                              )}
                              disabled={deleteJobApplicationMutation.isPending}
                              className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination Controls */}
          {paginationMeta && paginationMeta.totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-muted-foreground">
                Showing {((paginationMeta.currentPage - 1) * paginationMeta.limit) + 1} to{" "}
                {Math.min(paginationMeta.currentPage * paginationMeta.limit, paginationMeta.totalCount)} of{" "}
                {paginationMeta.totalCount} applications
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={paginationMeta.currentPage <= 1}
                >
                  Previous
                </Button>
                <span className="text-sm">
                  Page {paginationMeta.currentPage} of {paginationMeta.totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(paginationMeta.totalPages, prev + 1))}
                  disabled={paginationMeta.currentPage >= paginationMeta.totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
