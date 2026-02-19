"use client";

import { CreateJobApplicationReview } from "@/features/job-application-reviews-management/components/create-new-job-application-review";
import { JobApplicationReviewList } from "@/features/job-application-reviews-management/components/job-application-review-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRef } from "react";

export default function JobApplicationReviewManagementPage() {
  const createReviewRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Job Application Reviews Management</h1>
          <p className="text-muted-foreground">
            Create, edit, and manage job application reviews
          </p>
        </div>
        <CreateJobApplicationReview triggerRef={createReviewRef as any} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Job Application Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <JobApplicationReviewList />
        </CardContent>
      </Card>
    </div>
  );
}
