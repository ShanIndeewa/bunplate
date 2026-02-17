"use client";

import { useDeleteJobWishlist } from "@/features/job-wishlist-management/api/use-delete-job-wishlist";
import { useGetJobWishlist } from "@/features/job-wishlist-management/api/use-get-single-job-wishlist";
import { useUpdateJobWishlist } from "@/features/job-wishlist-management/api/use-update-job-wishlist";
import { JobWishlistUpdateType } from "@/features/job-wishlist-management/schemas";
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
    ArrowLeftIcon,
    BriefcaseIcon,
    CalendarIcon,
    CheckCircleIcon,
    EditIcon,
    TrashIcon,
    XCircleIcon
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function JobWishlistDetailPage() {
  const params = useParams();
  const router = useRouter();
  const wishlistId = params.id as string;
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { data: wishlist, isLoading, isError } = useGetJobWishlist(wishlistId);
  const updateWishlist = useUpdateJobWishlist();
  const deleteWishlist = useDeleteJobWishlist();

  const handleUpdate = async (updates: JobWishlistUpdateType) => {
    try {
      await updateWishlist.mutateAsync({ id: wishlistId, data: updates });
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update wishlist:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to remove this job from your wishlist?")) {
      setIsDeleting(true);
      try {
        await deleteWishlist.mutateAsync(wishlistId);
        router.push("/account/manage/job-wishlist");
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
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/account/manage/job-wishlist">
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Wishlist
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

  if (isError || !wishlist) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/account/manage/job-wishlist">
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Wishlist
            </Link>
          </Button>
        </div>
        <Card>
          <CardContent className="text-center py-10">
            <p className="text-red-500">Failed to load job wishlist details.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/account/manage/job-wishlist">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Wishlist
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Job Wishlist Details</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BriefcaseIcon className="h-5 w-5" />
              Job Information
            </CardTitle>
            <CardDescription>
              Details about the job in your wishlist
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Job ID
              </label>
              <p className="text-sm font-mono bg-gray-50 p-2 rounded">
                {wishlist.jobId}
              </p>
            </div>


            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Status
              </label>
              <div className="mt-1">
                <Badge className={getStatusColor(wishlist.jobStatus || "live")}>
                  {wishlist.jobStatus || "live"}
                </Badge>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Application Status
              </label>
              <div className="mt-1">
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Timeline
            </CardTitle>
            <CardDescription>
              When this job was added and last updated
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Added to Wishlist
              </label>
              <p className="text-sm flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                {formatDate(wishlist.createdAt)}
              </p>
            </div>

            {wishlist.updatedAt && wishlist.updatedAt !== wishlist.createdAt && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Last Updated
                </label>
                <p className="text-sm flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  {formatDate(wishlist.updatedAt)}
                </p>
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-muted-foreground">
                User ID
              </label>
              <p className="text-sm font-mono bg-gray-50 p-2 rounded">
                {wishlist.userId}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Actions</CardTitle>
          <CardDescription>
            Manage this wishlist item
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setIsEditing(!isEditing)}
              disabled={updateWishlist.isPending}
            >
              <EditIcon className="h-4 w-4 mr-2" />
              {isEditing ? "Cancel Edit" : "Edit Details"}
            </Button>

            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting || deleteWishlist.isPending}
            >
              <TrashIcon className="h-4 w-4 mr-2" />
              {isDeleting || deleteWishlist.isPending ? "Removing..." : "Remove from Wishlist"}
            </Button>
          </div>

          {isEditing && (
            <div className="mt-6 p-4 border rounded-lg bg-gray-50">
              <h4 className="font-medium mb-3">Quick Edit</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isApplied"
                    checked={wishlist.isApplied}
                    onChange={(e) => {
                      handleUpdate({ isApplied: e.target.checked });
                    }}
                    disabled={updateWishlist.isPending}
                  />
                  <label htmlFor="isApplied" className="text-sm">
                    Mark as Applied
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-sm">Job Status:</label>
                  <select
                    value={wishlist.jobStatus || "live"}
                    onChange={(e) => {
                      handleUpdate({ jobStatus: e.target.value as "live" | "expired" });
                    }}
                    disabled={updateWishlist.isPending}
                    className="px-2 py-1 border rounded text-sm"
                  >
                    <option value="live">Live</option>
                    <option value="expired">Expired</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
