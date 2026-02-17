"use client";

import { useDeleteAd } from "@/features/ads-management/api/use-delete-ad";
import { useGetAd } from "@/features/ads-management/api/use-get-single-ad";
import { useUpdateAd } from "@/features/ads-management/api/use-update-ad";
import { AdUpdateType } from "@/features/ads-management/schemas";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
    ArrowLeftIcon,
    CalendarIcon,
    EditIcon,
    ExternalLinkIcon,
    EyeIcon,
    ImageIcon,
    MousePointerIcon,
    TrashIcon
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const placementOptions = [
  { value: "homepage_top", label: "Homepage Top" },
  { value: "homepage_sidebar", label: "Homepage Sidebar" },
  { value: "job_listing_top", label: "Job Listing Top" },
  { value: "job_listing_sidebar", label: "Job Listing Sidebar" },
  { value: "profile_page", label: "Profile Page" },
  { value: "search_results", label: "Search Results" },
];

const adSizeOptions = [
  { value: "300x250", label: "300x250 (Medium Rectangle)" },
  { value: "728x90", label: "728x90 (Leaderboard)" },
  { value: "160x600", label: "160x600 (Wide Skyscraper)" },
  { value: "300x600", label: "300x600 (Half Page)" },
  { value: "320x50", label: "320x50 (Mobile Banner)" },
  { value: "250x250", label: "250x250 (Square)" },
];

const categoryOptions = [
  { value: "Jobs", label: "Jobs" },
  { value: "Events", label: "Events" },
  { value: "Services", label: "Services" },
  { value: "Products", label: "Products" },
  { value: "General", label: "General" },
];

export default function AdDetailPage() {
  const params = useParams();
  const router = useRouter();
  const adId = params.id as string;
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editData, setEditData] = useState<AdUpdateType>({});

  const { data: ad, isLoading, isError } = useGetAd(adId);
  const updateAd = useUpdateAd();
  const deleteAd = useDeleteAd();

  const handleUpdate = async () => {
    try {
      await updateAd.mutateAsync({ id: adId, data: editData });
      setIsEditing(false);
      setEditData({});
    } catch (error) {
      console.error("Failed to update ad:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this ad?")) {
      setIsDeleting(true);
      try {
        await deleteAd.mutateAsync(adId);
        router.push("/account/manage/ads");
      } catch (error) {
        console.error("Failed to delete ad:", error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const formatDate = (date: Date | string | null) => {
    if (!date) return "Not set";
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
            <Link href="/account/manage/ads">
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Ads
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

  if (isError || !ad) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/account/manage/ads">
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Ads
            </Link>
          </Button>
        </div>
        <Card>
          <CardContent className="text-center py-10">
            <p className="text-red-500">Failed to load ad details.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/account/manage/ads">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Ads
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Ad Details</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Ad Information
            </CardTitle>
            <CardDescription>
              Basic information about your advertisement
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-muted-foreground">
                Title
              </Label>
              <p className="text-sm font-medium">
                {ad.title}
              </p>
            </div>

            {ad.description && (
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Description
                </Label>
                <p className="text-sm">
                  {ad.description}
                </p>
              </div>
            )}

            {ad.category && (
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Category
                </Label>
                <p className="text-sm">
                  {ad.category}
                </p>
              </div>
            )}

            <div>
              <Label className="text-sm font-medium text-muted-foreground">
                Placement
              </Label>
              <p className="text-sm">
                {placementOptions.find(p => p.value === ad.placement)?.label || ad.placement}
              </p>
            </div>

            <div>
              <Label className="text-sm font-medium text-muted-foreground">
                Ad Size
              </Label>
              <p className="text-sm">
                {adSizeOptions.find(s => s.value === ad.adSize)?.label || ad.adSize}
              </p>
            </div>

            <div>
              <Label className="text-sm font-medium text-muted-foreground">
                Status
              </Label>
              <div className="mt-1">
                <Badge className={ad.isActive ? "bg-green-100 text-green-800 border-green-200" : "bg-red-100 text-red-800 border-red-200"}>
                  {ad.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Timeline & Stats
            </CardTitle>
            <CardDescription>
              Performance metrics and scheduling information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-muted-foreground">
                Created
              </Label>
              <p className="text-sm flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                {formatDate(ad.createdAt)}
              </p>
            </div>

            {ad.startDate && (
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Start Date
                </Label>
                <p className="text-sm flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  {formatDate(ad.startDate)}
                </p>
              </div>
            )}

            {ad.endDate && (
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  End Date
                </Label>
                <p className="text-sm flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  {formatDate(ad.endDate)}
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-2xl font-bold text-blue-600">
                  <EyeIcon className="h-5 w-5" />
                  {ad.viewCount}
                </div>
                <p className="text-xs text-muted-foreground">Views</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-2xl font-bold text-green-600">
                  <MousePointerIcon className="h-5 w-5" />
                  {ad.clickCount}
                </div>
                <p className="text-xs text-muted-foreground">Clicks</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Image Preview */}
      {ad.imageUrl && (
        <Card>
          <CardHeader>
            <CardTitle>Ad Preview</CardTitle>
            <CardDescription>
              How your ad will appear to users
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative w-full h-64 bg-gray-100 rounded-md overflow-hidden">
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
          </CardContent>
        </Card>
      )}

      {/* External Link */}
      {ad.externalLink && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ExternalLinkIcon className="h-5 w-5" />
              External Link
            </CardTitle>
          </CardHeader>
          <CardContent>
            <a
              href={ad.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline break-all"
            >
              {ad.externalLink}
            </a>
          </CardContent>
        </Card>
      )}

      {/* Quick Edit */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Manage this ad
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setIsEditing(!isEditing)}
              disabled={updateAd.isPending}
            >
              <EditIcon className="h-4 w-4 mr-2" />
              {isEditing ? "Cancel Edit" : "Edit Ad"}
            </Button>

            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting || deleteAd.isPending}
            >
              <TrashIcon className="h-4 w-4 mr-2" />
              {isDeleting || deleteAd.isPending ? "Deleting..." : "Delete Ad"}
            </Button>
          </div>

          {isEditing && (
            <div className="mt-6 p-4 border rounded-lg bg-gray-50 space-y-4">
              <h4 className="font-medium">Quick Edit</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-title">Title</Label>
                  <Input
                    id="edit-title"
                    value={editData.title || ad.title}
                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                    disabled={updateAd.isPending}
                  />
                </div>

                <div>
                  <Label htmlFor="edit-category">Category</Label>
                  <Select
                    value={editData.category || ad.category || ""}
                    onValueChange={(value) => setEditData({ ...editData, category: value })}
                    disabled={updateAd.isPending}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editData.description || ad.description || ""}
                  onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                  disabled={updateAd.isPending}
                  rows={3}
                />
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="edit-active"
                  checked={editData.isActive !== undefined ? editData.isActive : ad.isActive}
                  onCheckedChange={(checked) => setEditData({ ...editData, isActive: checked as boolean })}
                  disabled={updateAd.isPending}
                />
                <Label htmlFor="edit-active">Active</Label>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleUpdate}
                  disabled={updateAd.isPending}
                  size="sm"
                >
                  {updateAd.isPending ? "Saving..." : "Save Changes"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsEditing(false);
                    setEditData({});
                  }}
                  disabled={updateAd.isPending}
                  size="sm"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}


