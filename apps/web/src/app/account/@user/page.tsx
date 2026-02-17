"use client";

import { useGetCompanies } from "@/features/company/queries/use-get-all-companies";
import { useGetJobs } from "@/features/company/queries/use-get-all-jobs";
import { useGetJobApplications } from "@/features/company/queries/use-get-job-application-by-userid";
import { useGetUserSavedJobs } from "@/features/company/queries/use-get-user-saved-jobs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Bookmark,
    Briefcase,
    Building2,
    Clock,
    FileText,
    TrendingUp,
    Users
} from "lucide-react";
import Link from "next/link";

type Props = {};

// Stat Card Component
function StatCard({
  title,
  value,
  icon: Icon,
  description,
  color = "green",
  loading = false
}: {
  title: string;
  value: number | string;
  icon: any;
  description: string;
  color?: "green" | "blue" | "purple" | "orange" | "red";
  loading?: boolean;
}) {
  const colorClasses = {
    green: "bg-green-500 text-white",
    blue: "bg-blue-500 text-white",
    purple: "bg-purple-500 text-white",
    orange: "bg-orange-500 text-white",
    red: "bg-red-500 text-white"
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-full"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          </div>
          <div className={`p-3 rounded-full ${colorClasses[color]}`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Application Status Badge Component
function StatusBadge({ status }: { status: string }) {
  const statusConfig = {
    submitted: { label: "Submitted", color: "bg-blue-100 text-blue-800" },
    under_review: { label: "Under Review", color: "bg-yellow-100 text-yellow-800" },
    shortlisted: { label: "Shortlisted", color: "bg-green-100 text-green-800" },
    interview_scheduled: { label: "Interview Scheduled", color: "bg-purple-100 text-purple-800" },
    offer_extended: { label: "Offer Extended", color: "bg-emerald-100 text-emerald-800" },
    hired: { label: "Hired", color: "bg-green-100 text-green-800" },
    rejected: { label: "Rejected", color: "bg-red-100 text-red-800" },
    withdrawn: { label: "Withdrawn", color: "bg-gray-100 text-gray-800" },
    draft: { label: "Draft", color: "bg-gray-100 text-gray-800" }
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;

  return (
    <Badge className={config.color}>
      {config.label}
    </Badge>
  );
}

export default function UserAccountPage({}: Props) {
  // Fetch user's job applications
  const {
    data: applications = [],
    isLoading: applicationsLoading
  } = useGetJobApplications();

  // Fetch user's saved jobs
  const {
    data: savedJobs = [],
    isLoading: savedJobsLoading
  } = useGetUserSavedJobs();

  // Fetch recent jobs for recommendations
  const {
    data: recentJobs = [],
    isLoading: jobsLoading
  } = useGetJobs({
    page: 1,
    limit: 5,
    sort: "desc"
  });

  // Fetch companies for context
  const {
    data: companies,
    isLoading: companiesLoading
  } = useGetCompanies({
    page: 1,
    limit: 10
  });

  // Calculate statistics
  const totalApplications = applications.length;
  const totalSavedJobs = savedJobs.length;
  const activeApplications = applications.filter(app =>
    ['submitted', 'under_review', 'shortlisted', 'interview_scheduled'].includes(app.status)
  ).length;
  const successfulApplications = applications.filter(app =>
    ['hired', 'offer_extended'].includes(app.status)
  ).length;

  // Get recent applications (last 5)
  const recentApplications = applications.slice(0, 5);

  // Get application status distribution
  const statusCounts = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's an overview of your job search activity.</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Applications"
            value={totalApplications}
            icon={FileText}
            description="Jobs you've applied to"
            color="blue"
            loading={applicationsLoading}
          />
          <StatCard
            title="Active Applications"
            value={activeApplications}
            icon={Clock}
            description="Currently in progress"
            color="orange"
            loading={applicationsLoading}
          />
          <StatCard
            title="Saved Jobs"
            value={totalSavedJobs}
            icon={Bookmark}
            description="Jobs you've bookmarked"
            color="purple"
            loading={savedJobsLoading}
          />
          <StatCard
            title="Success Rate"
            value={totalApplications > 0 ? `${Math.round((successfulApplications / totalApplications) * 100)}%` : "0%"}
            icon={TrendingUp}
            description="Offers received"
            color="green"
            loading={applicationsLoading}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Applications */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Recent Applications
                  </CardTitle>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/account/manage/apply-jobs">View All</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {applicationsLoading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                ) : recentApplications.length > 0 ? (
                  <div className="space-y-4">
                    {recentApplications.map((application) => (
                      <div key={application.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">Job Application #{application.id.slice(-8)}</h4>
                          <p className="text-sm text-gray-600">
                            Applied {application.submittedAt ? new Date(application.submittedAt).toLocaleDateString() : 'Recently'}
                          </p>
                        </div>
                        <StatusBadge status={application.status} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
                    <p className="text-gray-600 mb-4">Start applying to jobs to see your applications here.</p>
                    <Button asChild>
                      <Link href="/job-search-page">Browse Jobs</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats & Actions */}
          <div className="space-y-6">
            {/* Application Status Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Application Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                {Object.keys(statusCounts).length > 0 ? (
                  <div className="space-y-3">
                    {Object.entries(statusCounts).map(([status, count]) => (
                      <div key={status} className="flex items-center justify-between">
                        <StatusBadge status={status} />
                        <span className="font-medium">{count}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No applications to show</p>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" asChild>
                  <Link href="/job-search-page">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Browse Jobs
                  </Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/account/manage/apply-jobs">
                    <FileText className="h-4 w-4 mr-2" />
                    My Applications
                  </Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/account/manage/profile-details">
                    <Users className="h-4 w-4 mr-2" />
                    Update Profile
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Platform Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Platform Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Jobs</span>
                    <span className="font-medium">{companies?.meta?.totalCount || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Companies</span>
                    <span className="font-medium">{companies?.meta?.totalCount || 0}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
