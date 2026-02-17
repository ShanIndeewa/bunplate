"use client";

import { useGetJobApplicationById } from "@/features/company/queries/use-get-job-application-by-id";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import {
    AlertCircle,
    ArrowLeftIcon,
    Briefcase,
    Calendar,
    CheckCircle,
    Clock,
    ClockIcon,
    DollarSign,
    ExternalLink,
    FileText,
    Mail,
    MapPin,
    User,
    XCircle,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const statusConfig = {
  draft: { label: "Draft", color: "bg-gray-100 text-gray-800", icon: FileText },
  submitted: { label: "Submitted", color: "bg-blue-100 text-blue-800", icon: Clock },
  under_review: { label: "Under Review", color: "bg-yellow-100 text-yellow-800", icon: AlertCircle },
  shortlisted: { label: "Shortlisted", color: "bg-green-100 text-green-800", icon: CheckCircle },
  interview_scheduled: { label: "Interview Scheduled", color: "bg-purple-100 text-purple-800", icon: Calendar },
  offer_extended: { label: "Offer Extended", color: "bg-emerald-100 text-emerald-800", icon: CheckCircle },
  hired: { label: "Hired", color: "bg-green-100 text-green-800", icon: CheckCircle },
  rejected: { label: "Rejected", color: "bg-red-100 text-red-800", icon: XCircle },
  withdrawn: { label: "Withdrawn", color: "bg-gray-100 text-gray-800", icon: XCircle },
};

function JobApplicationViewContent() {
  const searchParams = useSearchParams();
  const applicationId = searchParams.get("id");

  const { data: application, isLoading, isError } = useGetJobApplicationById(applicationId || "");

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/account/manage/job-application-details">
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Applications
            </Link>
          </Button>
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
              </CardHeader>
              <CardContent className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
              </CardHeader>
              <CardContent className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !application) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/account/manage/job-application-details">
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Applications
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Application Not Found</h1>
        </div>
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              The job application you're looking for doesn't exist or has been deleted.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const statusInfo = statusConfig[application.status] || statusConfig.draft;
  const StatusIcon = statusInfo.icon;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/account/manage/job-application-details">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Applications
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Job Application Details</h1>
          <p className="text-muted-foreground">
            View detailed information about this job application
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Application Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <StatusIcon className="h-5 w-5" />
                Application Status
              </CardTitle>
              <CardDescription>
                Current status of this job application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Badge className={`${statusInfo.color} px-3 py-1`}>
                  {statusInfo.label}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Round {application.roundNo}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Applicant Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Applicant Information
              </CardTitle>
              <CardDescription>
                Personal details of the applicant
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <User className="h-4 w-4" />
                    Full Name
                  </div>
                  <p className="text-lg font-semibold">
                    {application.user?.name || "Not provided"}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    Email Address
                  </div>
                  <p className="text-lg">
                    {application.user?.email || "Not provided"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Job Information */}
          {application.job && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Job Information
                </CardTitle>
                <CardDescription>
                  Details about the position applied for
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Briefcase className="h-4 w-4" />
                    Job Title
                  </div>
                  <p className="text-lg font-semibold">
                    {application.job.title || "Not specified"}
                  </p>
                </div>
                {application.job.description && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <FileText className="h-4 w-4" />
                      Description
                    </div>
                    <p className="text-sm leading-relaxed">
                      {application.job.description}
                    </p>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {application.job.location && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        Location
                      </div>
                      <p>{application.job.location}</p>
                    </div>
                  )}
                  {application.job.employmentType && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        <ClockIcon className="h-4 w-4" />
                        Employment Type
                      </div>
                      <p>{application.job.employmentType}</p>
                    </div>
                  )}
                </div>
                {(application.job.salaryMin || application.job.salaryMax) && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <DollarSign className="h-4 w-4" />
                      Salary Range
                    </div>
                    <p>
                      {application.job.salaryMin && application.job.salaryMax
                        ? `$${application.job.salaryMin.toLocaleString()} - $${application.job.salaryMax.toLocaleString()}`
                        : application.job.salaryMin
                        ? `From $${application.job.salaryMin.toLocaleString()}`
                        : `Up to $${application.job.salaryMax?.toLocaleString()}`}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Cover Letter */}
          {application.coverLetterText && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Cover Letter
                </CardTitle>
                <CardDescription>
                  The applicant's cover letter for this position
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">
                    {application.coverLetterText}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Application Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Application Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Applied Date
                </div>
                <p className="text-sm">
                  {application.submittedAt
                    ? format(new Date(application.submittedAt), "MMM dd, yyyy 'at' h:mm a")
                    : application.createdAt
                    ? format(new Date(application.createdAt), "MMM dd, yyyy 'at' h:mm a")
                    : "Not available"}
                </p>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  Last Updated
                </div>
                <p className="text-sm">
                  {application.updatedAt
                    ? format(new Date(application.updatedAt), "MMM dd, yyyy 'at' h:mm a")
                    : "Not available"}
                </p>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <ExternalLink className="h-4 w-4" />
                  Source
                </div>
                <p className="text-sm">
                  {application.source || "Not specified"}
                </p>
              </div>
              {application.referralCode && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <User className="h-4 w-4" />
                      Referral Code
                    </div>
                    <p className="text-sm font-mono">
                      {application.referralCode}
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" variant="outline">
                <Mail className="h-4 w-4 mr-2" />
                Contact Applicant
              </Button>
              <Button className="w-full" variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Download Resume
              </Button>
              <Button className="w-full" variant="outline">
                <CheckCircle className="h-4 w-4 mr-2" />
                Update Status
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function JobApplicationViewPage() {
  return (
    <Suspense fallback={
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/account/manage/job-application-details">
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Applications
            </Link>
          </Button>
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
              </CardHeader>
              <CardContent className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
              </CardHeader>
              <CardContent className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    }>
      <JobApplicationViewContent />
    </Suspense>
  );
}
