"use client";

import { useGetUserAppliedJobs } from "@/features/company/queries/use-get-user-applied-jobs";
import { useGetUserSavedJobs } from "@/features/company/queries/use-get-user-saved-jobs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import {
    Bookmark,
    Briefcase,
    Calendar,
    CheckCircle,
    Clock,
    DollarSign,
    MapPin,
    Star,
    TrendingUp,
    Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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

function formatMoney(amount?: number) {
  if (!amount) return "Not specified";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

function JobCard({ job, type }: { job: any; type: "applied" | "saved" }) {
  const statusInfo = type === "applied"
    ? statusConfig[job.status as keyof typeof statusConfig] || statusConfig.submitted
    : { label: job.jobStatus, color: "bg-blue-100 text-blue-800" };

  return (
    <Card className="transition-all duration-200 border-l-4 border-l-green-500">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900 mb-1">
              {job.job?.title || "Job Title Not Available"}
            </CardTitle>
            <CardDescription className="text-sm text-gray-600 mb-2">
              {job.job?.company?.name || "Company Name Not Available"}
            </CardDescription>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              {job.job?.location && (
                <div className="flex items-center gap-1">
                  <MapPin size={14} />
                  <span>{job.job.location}</span>
                </div>
              )}
              {job.job?.isRemote && (
                <div className="flex items-center gap-1">
                  <Users size={14} />
                  <span>Remote</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>
                  {type === "applied"
                    ? `Applied ${format(new Date(job.submittedAt), "MMM dd, yyyy")}`
                    : `Saved ${format(new Date(job.createdAt), "MMM dd, yyyy")}`
                  }
                </span>
              </div>
            </div>
          </div>
          <Badge className={statusInfo.color}>
            {statusInfo.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Job Details */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            {job.job?.salaryMin && job.job?.salaryMax && (
              <div className="flex items-center gap-2">
                <DollarSign size={16} className="text-green-600" />
                <span className="text-gray-700">
                  {formatMoney(job.job.salaryMin)} - {formatMoney(job.job.salaryMax)}
                </span>
              </div>
            )}
            {job.job?.experienceRequired && (
              <div className="flex items-center gap-2">
                <TrendingUp size={16} className="text-green-600" />
                <span className="text-gray-700">{job.job.experienceRequired}</span>
              </div>
            )}
            {job.job?.type && (
              <div className="flex items-center gap-2">
                <Briefcase size={16} className="text-green-600" />
                <span className="text-gray-700 capitalize">{job.job.type}</span>
              </div>
            )}
            {job.job?.skills && job.job.skills.length > 0 && (
              <div className="flex items-center gap-2">
                <Star size={16} className="text-green-600" />
                <span className="text-gray-700">
                  {job.job.skills.slice(0, 3).join(", ")}
                  {job.job.skills.length > 3 && ` +${job.job.skills.length - 3} more`}
                </span>
              </div>
            )}
          </div>

          {/* Job Description Preview */}
          {job.job?.description && (
            <p className="text-sm text-gray-600 line-clamp-2">
              {job.job.description.substring(0, 150)}...
            </p>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              {type === "applied" && job.isApplied && (
                <div className="flex items-center gap-1 text-green-600 text-sm">
                  <CheckCircle size={14} />
                  <span>Applied</span>
                </div>
              )}
              {type === "saved" && job.isApplied && (
                <div className="flex items-center gap-1 text-blue-600 text-sm">
                  <CheckCircle size={14} />
                  <span>Applied</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/jobs/${job.jobId}`}>
                  View Details
                </Link>
              </Button>
              {type === "applied" && (
                <Button variant="outline" size="sm">
                  Track Status
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function AppliedJobsTab() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetUserAppliedJobs(page, 10);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Clock size={24} className="text-red-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Applications</h3>
        <p className="text-gray-600 mb-4">We couldn't load your job applications. Please try again.</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  if (!data?.data || data.data.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Briefcase size={24} className="text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Applications Yet</h3>
        <p className="text-gray-600 mb-4">You haven't applied to any jobs yet. Start exploring opportunities!</p>
        <Button asChild>
          <Link href="/job-search-page">Browse Jobs</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Applied Jobs</h2>
          <p className="text-sm text-gray-600">
            {data.meta.totalCount} application{data.meta.totalCount !== 1 ? 's' : ''} found
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {data.data.map((job) => (
          <JobCard key={job.id} job={job} type="applied" />
        ))}
      </div>

      {/* Pagination */}
      {data.meta.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <span className="text-sm text-gray-600">
            Page {page} of {data.meta.totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(p => Math.min(data.meta.totalPages, p + 1))}
            disabled={page === data.meta.totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

function SavedJobsTab() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetUserSavedJobs(page, 10);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Bookmark size={24} className="text-red-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Saved Jobs</h3>
        <p className="text-gray-600 mb-4">We couldn't load your saved jobs. Please try again.</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  if (!data?.data || data.data.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Bookmark size={24} className="text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Saved Jobs</h3>
        <p className="text-gray-600 mb-4">You haven't saved any jobs yet. Start bookmarking interesting opportunities!</p>
        <Button asChild>
          <Link href="/job-search-page">Browse Jobs</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Saved Jobs</h2>
          <p className="text-sm text-gray-600">
            {data.meta.totalCount} job{data.meta.totalCount !== 1 ? 's' : ''} saved
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {data.data.map((job) => (
          <JobCard key={job.id} job={job} type="saved" />
        ))}
      </div>

      {/* Pagination */}
      {data.meta.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <span className="text-sm text-gray-600">
            Page {page} of {data.meta.totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(p => Math.min(data.meta.totalPages, p + 1))}
            disabled={page === data.meta.totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

export default function ApplyJobsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Job Applications</h1>
          <p className="text-gray-600">
            Manage your job applications and saved opportunities in one place
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="applied" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="applied" className="flex items-center gap-2">
              <Briefcase size={16} />
              Applied Jobs
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex items-center gap-2">
              <Bookmark size={16} />
              Saved Jobs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="applied">
            <AppliedJobsTab />
          </TabsContent>

          <TabsContent value="saved">
            <SavedJobsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
