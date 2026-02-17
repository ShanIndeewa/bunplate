"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    CalendarIcon,
    EditIcon,
    ExternalLinkIcon,
    EyeIcon,
    MousePointerIcon,
    TrashIcon
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useDeleteAd } from "../api/use-delete-ad";
import { Ad } from "../schemas";

type Props = {
  ad: Ad;
};

export function AdCard({ ad }: Props) {
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteAd = useDeleteAd();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this ad?")) {
      setIsDeleting(true);
      try {
        await deleteAd.mutateAsync(ad.id);
      } catch (error) {
        console.error("Failed to delete ad:", error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const getStatusColor = (isActive: boolean) => {
    return isActive
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-red-100 text-red-800 border-red-200";
  };

  const formatDate = (date: Date | string | null) => {
    if (!date) return "Not set";
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
          <div className="space-y-1 flex-1">
            <CardTitle className="text-lg font-semibold line-clamp-2">
              {ad.title}
            </CardTitle>
            {ad.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {ad.description}
              </p>
            )}
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              {ad.category && (
                <span className="bg-gray-100 px-2 py-1 rounded">
                  {ad.category}
                </span>
              )}
              <span className="bg-gray-100 px-2 py-1 rounded">
                {ad.placement}
              </span>
              <span className="bg-gray-100 px-2 py-1 rounded">
                {ad.adSize}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={getStatusColor(ad.isActive)}>
              {ad.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Image Preview */}
          {ad.imageUrl && (
            <div className="relative w-full h-32 bg-gray-100 rounded-md overflow-hidden">
              <Image
                src={ad.imageUrl}
                alt={ad.title}
                fill
                className="object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}

          {/* Stats */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <EyeIcon className="h-4 w-4" />
              <span>{ad.viewCount} views</span>
            </div>
            <div className="flex items-center gap-1">
              <MousePointerIcon className="h-4 w-4" />
              <span>{ad.clickCount} clicks</span>
            </div>
          </div>

          {/* Dates */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarIcon className="h-4 w-4" />
              <span>Created: {formatDate(ad.createdAt)}</span>
            </div>
            {ad.startDate && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarIcon className="h-4 w-4" />
                <span>Starts: {formatDate(ad.startDate)}</span>
              </div>
            )}
            {ad.endDate && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarIcon className="h-4 w-4" />
                <span>Ends: {formatDate(ad.endDate)}</span>
              </div>
            )}
          </div>

          {/* External Link */}
          {ad.externalLink && (
            <div className="flex items-center gap-2 text-sm">
              <ExternalLinkIcon className="h-4 w-4" />
              <a
                href={ad.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline truncate"
              >
                {ad.externalLink}
              </a>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              asChild
            >
              <Link href={`/account/manage/ads/${ad.id}`}>
                <EditIcon className="h-4 w-4 mr-2" />
                View Details
              </Link>
            </Button>

            <Button
              variant="destructive"
              size="sm"
              onClick={handleDelete}
              disabled={isDeleting || deleteAd.isPending}
            >
              <TrashIcon className="h-4 w-4 mr-2" />
              {isDeleting || deleteAd.isPending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


