"use client";

import { useSearchParams } from "next/navigation";
import { useGetJobApplicationReviews } from "../api/use-get-job-application-reviews";
import { jobApplicationReview } from "../schemas";
import { JobApplicationReviewCard } from "./job-application-review-card";
import { JobApplicationReviewPagination } from "./job-application-review-pagination";
import { SearchBar } from "./search-bar";

export function JobApplicationReviewList() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const search = searchParams.get("search") || "";
  const { data, isLoading, isError } = useGetJobApplicationReviews({
    page,
    limit: 10,
    sort: "desc",
    search,
  });

  if (isLoading) {
    return <div className="text-center py-10">Loading job application reviews...</div>;
  }

  if (isError || !data) {
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load job application reviews.
      </div>
    );
  }

  const reviews: jobApplicationReview[] = data.data || [];
  const meta = data.meta || { currentPage: 1, totalPages: 1 };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold">Job Application Reviews</h2>
        <SearchBar />
      </div>
      <div className="flex flex-col gap-4">
        {reviews.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">
            No job application reviews found.
          </div>
        ) : (
          reviews.map((item) => <JobApplicationReviewCard key={item.id} review={item} />)
        )}
      </div>
      <JobApplicationReviewPagination
        currentPage={meta.currentPage}
        totalPages={meta.totalPages}
      />
    </div>
  );
}
