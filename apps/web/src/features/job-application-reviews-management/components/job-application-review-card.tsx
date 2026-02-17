"use client";

import { useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import {
    CalendarIcon,
    EditIcon,
    ExternalLinkIcon,
    StarIcon,
    TrashIcon,
    UserIcon,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useId } from "react";
import { useDeleteJobApplicationReview } from "../api/use-delete-job-application-review";
import type { jobApplicationReview } from "../schemas";

type Props = {
  review: jobApplicationReview;
};

export function JobApplicationReviewCard({ review }: Props) {
  const id = useId();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { mutate: deleteReview, isPending: isDeleting } = useDeleteJobApplicationReview();
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    deleteReview(review.id, {
      onSuccess: () => {
        toast.success("Job application review deleted successfully");
        setShowDeleteDialog(false);
        queryClient.invalidateQueries({ queryKey: ["job-application-reviews"] });
      },
      onError: () => {
        toast.error("Failed to delete job application review");
        setShowDeleteDialog(false);
      },
    });
  };

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
        className={`h-4 w-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <>
      <Card
        key={id}
        className="transition-all hover:shadow-lg border-l-4 border-l-indigo-500 p-4"
      >
        <div className="flex items-center gap-4">
          {/* Avatar section */}
          <Avatar className="h-16 w-16 rounded-full border">
            <AvatarImage
              src=""
              alt={`Review ${review.id}`}
              className="size-16"
            />
            <AvatarFallback className="bg-indigo-50 text-indigo-700">
              <UserIcon className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>

          {/* Main content section */}
          <div className="flex-grow">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
              <div>
                <h3 className="font-semibold line-clamp-1">
                  Review for Application {review.applicationId}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Created {formatDistanceToNow(new Date(review.createdAt))} ago
                </p>
              </div>
            </div>

            {/* Info with separators */}
            <div className="flex flex-wrap items-center gap-2 text-sm mt-2">
              {review.comments && (
                <span className="text-xs text-muted-foreground line-clamp-2">
                  {review.comments}
                </span>
              )}
              {review.rating && (
                <>
                  <div className="text-gray-300 text-sm px-1">|</div>
                  <div className="flex items-center gap-1">
                    {getRatingStars(review.rating)}
                    <span className="text-sm">({review.rating}/5)</span>
                  </div>
                </>
              )}
              {review.interviewAt && (
                <>
                  <div className="text-gray-300 text-sm px-1">|</div>
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="h-3.5 w-3.5 text-indigo-500" />
                    <span className="text-sm">
                      {new Date(review.interviewAt).toLocaleDateString()}
                    </span>
                  </div>
                </>
              )}
              {review.interviewLocation && (
                <>
                  <div className="text-gray-300 text-sm px-1">|</div>
                  <span className="text-sm">{review.interviewLocation}</span>
                </>
              )}
            </div>
          </div>

          {/* Actions section */}
          <div className="flex items-center gap-2 ml-2 shrink-0">
            <Badge
              variant="outline"
              className={`text-xs w-fit ${getStatusColor(review.status || "under_review")}`}
            >
              {review.status?.replace(/_/g, " ") || "under review"}
            </Badge>
            <Button size="sm" variant="outline" asChild className="h-8 px-2">
              <Link href={`/account/manage/jobapplicationreviews/${review.id}`}>
                <ExternalLinkIcon className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="sm" variant="outline" asChild className="h-8 px-2">
              <Link href={`/account/manage/job-application-details?id=${review.applicationId}`}>
                <UserIcon className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="sm" variant="outline" asChild className="h-8 px-2">
              <Link href={`/account/manage/jobapplicationreviews/${review.id}/edit`}>
                <EditIcon className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setShowDeleteDialog(true)}
              disabled={isDeleting}
              className="h-8 px-2"
            >
              <TrashIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the job application review for application "{review.applicationId}". This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete Review"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
