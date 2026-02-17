"use client";

import { useGetJobApplicationReview } from "@/features/job-application-reviews-management/api/use-get-single-job-application-review";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ArrowLeftIcon, CalendarIcon, EditIcon, StarIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function JobApplicationReviewDetailPage() {
  const params = useParams();
  const reviewId = params.id as string;
  const { data: review, isLoading, isError } = useGetJobApplicationReview(reviewId);

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
          <CardHeader>
            <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError || !review) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/account/manage/jobapplicationreviews">
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Reviews
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Review Not Found</h1>
        </div>
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              The job application review you're looking for doesn't exist or has been deleted.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "bg-green-50 text-green-700 border-green-200";
      case "rejected":
        return "bg-red-50 text-red-700 border-red-200";
      case "shortlisted":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "interview_scheduled":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "under_review":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "on_hold":
        return "bg-gray-50 text-gray-700 border-gray-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getRatingStars = (rating: number | null) => {
    if (!rating) return null;
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        className={`h-5 w-5 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/account/manage/jobapplicationreviews">
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Reviews
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Review for Application {review.applicationId}
            </h1>
            <p className="text-muted-foreground">
              Created {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/account/manage/jobapplicationreviews/${review.id}/edit`}>
              <EditIcon className="h-4 w-4 mr-2" />
              Edit
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Review Details</CardTitle>
              <CardDescription>Review content and feedback</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {review.comments && (
                <div className="prose max-w-none">
                  <p className="whitespace-pre-wrap">{review.comments}</p>
                </div>
              )}
              {!review.comments && (
                <p className="text-muted-foreground italic">
                  No comments available for this review.
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Status
                </label>
                <p className="text-sm flex items-center gap-2">
                  <span className={`px-2 py-1 rounded text-xs ${getStatusColor(review.status || "under_review")}`}>
                    {review.status?.replace(/_/g, " ") || "under review"}
                  </span>
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Rating
                </label>
                <p className="text-sm flex items-center gap-2">
                  {review.rating ? (
                    <>
                      {getRatingStars(review.rating)}
                      <span>({review.rating}/5)</span>
                    </>
                  ) : (
                    <span className="text-muted-foreground">No rating provided</span>
                  )}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Application ID
                </label>
                <p className="text-sm font-mono">
                  {review.applicationId}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Reviewer ID
                </label>
                <p className="text-sm font-mono">
                  {review.reviewerId}
                </p>
              </div>
              {review.interviewAt && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Interview Date & Time
                  </label>
                  <p className="text-sm flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    {new Date(review.interviewAt).toLocaleString()}
                  </p>
                </div>
              )}
              {review.interviewLocation && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Interview Location
                  </label>
                  <p className="text-sm">
                    {review.interviewLocation}
                  </p>
                </div>
              )}
              {review.meetingLink && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Meeting Link
                  </label>
                  <p className="text-sm">
                    <a
                      href={review.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {review.meetingLink}
                    </a>
                  </p>
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Last Updated
                </label>
                <p className="text-sm">
                  {new Date(review.updatedAt).toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>

          {review.attachments && (
            <Card>
              <CardHeader>
                <CardTitle>Attachments</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="text-xs bg-muted p-3 rounded overflow-auto">
                  {typeof review.attachments === 'string'
                    ? review.attachments
                    : JSON.stringify(review.attachments, null, 2)
                  }
                </pre>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
