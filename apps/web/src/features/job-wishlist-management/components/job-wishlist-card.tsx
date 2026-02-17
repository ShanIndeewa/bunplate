"use client";

import { useGetJobs } from "@/features/company/queries/use-get-all-jobs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    BuildingIcon,
    CalendarIcon,
    CheckCircleIcon,
    EditIcon,
    MapPinIcon,
    TrashIcon,
    XCircleIcon
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useDeleteJobWishlist } from "../api/use-delete-job-wishlist";
import { JobWishlist } from "../schemas";

type Props = {
  wishlist: JobWishlist;
};

export function JobWishlistCard({ wishlist }: Props) {
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteWishlist = useDeleteJobWishlist();

  // Get job details for display
  const { data: jobs } = useGetJobs({
    page: 1,
    limit: 1000, // Get all jobs to find the specific one
    sort: "desc",
  });

  const jobDetails = jobs?.find((job: any) => job.id === wishlist.jobId);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to remove this job from your wishlist?")) {
      setIsDeleting(true);
      try {
        await deleteWishlist.mutateAsync(wishlist.id);
      } catch (error) {
        console.error("Failed to delete wishlist:", error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "bg-green-100 text-green-800 border-green-200";
      case "expired":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg font-semibold">
              {jobDetails?.title || `Job ID: ${wishlist.jobId}`}
            </CardTitle>
            {jobDetails && (
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <BuildingIcon className="h-4 w-4" />
                  <span>{jobDetails.company?.name || 'Unknown Company'}</span>
                </div>
                {jobDetails.location && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPinIcon className="h-4 w-4" />
                    <span>{jobDetails.location}</span>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Badge className={getStatusColor(wishlist.jobStatus || "live")}>
              {wishlist.jobStatus || "live"}
            </Badge>
            {wishlist.isApplied ? (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                <CheckCircleIcon className="h-3 w-3 mr-1" />
                Applied
              </Badge>
            ) : (
              <Badge variant="outline" className="text-gray-600">
                <XCircleIcon className="h-3 w-3 mr-1" />
                Not Applied
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarIcon className="h-4 w-4" />
            <span>Added: {formatDate(wishlist.createdAt)}</span>
          </div>

          {wishlist.updatedAt && wishlist.updatedAt !== wishlist.createdAt && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarIcon className="h-4 w-4" />
              <span>Updated: {formatDate(wishlist.updatedAt)}</span>
            </div>
          )}

          <div className="flex items-center gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              asChild
            >
              <Link href={`/account/manage/job-wishlist/${wishlist.id}`}>
                <EditIcon className="h-4 w-4 mr-2" />
                View Details
              </Link>
            </Button>

            <Button
              variant="destructive"
              size="sm"
              onClick={handleDelete}
              disabled={isDeleting || deleteWishlist.isPending}
            >
              <TrashIcon className="h-4 w-4 mr-2" />
              {isDeleting || deleteWishlist.isPending ? "Removing..." : "Remove"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
