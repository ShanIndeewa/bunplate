// @ts-nocheck

"use client";

import { useGetJobApplicationsByCompany } from "@/features/company/queries/use-get-job-applications-by-company";
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
  Calendar,
  ChevronDown,
  Edit,
  Eye,
  Info,
  Mail,
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

export default function JobApplicationDetailsPage() {
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: applicationsData, isLoading, isError } = useGetJobApplicationsByCompany({
    page: currentPage,
    limit: 20,
    status: statusFilter || undefined,
    search: searchTerm || undefined,
  });

  const applications = applicationsData?.data || [];
  const paginationMeta = applicationsData?.meta;

  const updateStatusMutation = useUpdateJobApplicationStatus();

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

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
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
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Company Job Applications</h1>
            <p className="text-muted-foreground">
              Manage and review all job applications for your company
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

      <Card>
        <CardHeader>
          <CardTitle>
            Company Job Applications
            {paginationMeta && (
              <span className="text-sm font-normal text-muted-foreground ml-2">
                ({paginationMeta.totalCount} total)
              </span>
            )}
          </CardTitle>
          <CardDescription className="flex items-center gap-2">
            <Info className="h-4 w-4 text-blue-500" />
            View and manage all job applications with applicant details. Only applications marked as "Access Company" are shown.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Applicant</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Job ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Round</TableHead>
                  <TableHead>Applied Date</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      No job applications found
                    </TableCell>
                  </TableRow>
                ) : (
                  applications.map((application) => {
                    const statusInfo = statusConfig[application.status as keyof typeof statusConfig] || statusConfig.draft;

                    return (
                      <TableRow key={application.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            {application.user?.name || "Unknown"}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            {application.user?.email || "Not provided"}
                          </div>
                        </TableCell>
                        <TableCell>
                          <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                            {application.jobId}
                          </code>
                        </TableCell>
                        <TableCell>
                          <Select
                            value={application.status}
                            onValueChange={(newStatus) => handleStatusUpdate(application.id, newStatus)}
                            disabled={updatingStatus === application.id}
                          >
                            <SelectTrigger className="w-[180px] h-8 p-0 border-0 bg-transparent hover:bg-gray-50">
                              <div className="flex items-center gap-2">
                                {updatingStatus === application.id ? (
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
                          <span className="text-sm font-medium">
                            Round {application.roundNo}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            {application.submittedAt
                              ? format(new Date(application.submittedAt), "MMM dd, yyyy")
                              : application.createdAt
                                ? format(new Date(application.createdAt), "MMM dd, yyyy")
                                : "Not available"}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">
                            {application.source || "Not specified"}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button size="sm" variant="outline" asChild>
                              <Link href={`/account/manage/job-application-details/view?id=${application.id}`}>
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button size="sm" variant="outline" asChild>
                              <Link href={`/account/manage/jobapplicationreviews?applicationId=${application.id}`}>
                                <Edit className="h-4 w-4" />
                              </Link>
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
