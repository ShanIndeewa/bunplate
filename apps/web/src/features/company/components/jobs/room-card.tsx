"use client";

import { useUserCompany } from "@/features/company/queries/use-auth-company";
import { useGetJobsByCompanyId } from "@/features/company/queries/use-get-jobs-by-company-id";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Briefcase, MapPin } from "lucide-react";

export default function MyCompanyJobsPage() {
  const {
    data: companyData,
    isLoading: loadingCompany,
    error: companyError,
  } = useUserCompany();

  const companyId = companyData?.company?.id || "";
  const {
    data: jobs,
    isLoading: loadingJobs,
    error: jobsError,
  } = useGetJobsByCompanyId(companyId);

  if (loadingCompany || loadingJobs) return <p>Loading...</p>;
  if (companyError)
    return (
      <p className="text-red-500">
        Error fetching company: {companyError.message}
      </p>
    );
  if (jobsError)
    return (
      <p className="text-red-500">Error fetching jobs: {jobsError.message}</p>
    );
  if (!jobs || jobs.length === 0) return <p>No jobs found for your company.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {jobs.map((job) => (
        <Card key={job.id} className="mb-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase size={18} />
              {job.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {job.location && (
              <p className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                <MapPin size={14} /> {job.location}
              </p>
            )}
            <CardDescription className="text-sm mb-2">
              {job.description.slice(0, 120)}...
            </CardDescription>
            <p className="text-xs text-muted-foreground">
              {job.type.replace("_", " ").toUpperCase()} •{" "}
              {job.salaryMin && job.salaryMax
                ? `$${job.salaryMin} - $${job.salaryMax}`
                : "Salary not specified"}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
