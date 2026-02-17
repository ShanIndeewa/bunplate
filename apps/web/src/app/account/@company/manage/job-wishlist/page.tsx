"use client";

import { CreateJobWishlist } from "@/features/job-wishlist-management/components/create-new-job-wishlist";
import { JobWishlistList } from "@/features/job-wishlist-management/components/job-wishlist-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRef } from "react";

export default function JobWishlistManagementPage() {
  const createWishlistRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Job Wishlist Management</h1>
          <p className="text-muted-foreground">
            Manage your job wishlist and track opportunities you're interested in
          </p>
        </div>
        <CreateJobWishlist triggerRef={createWishlistRef} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Job Wishlist</CardTitle>
        </CardHeader>
        <CardContent>
          <JobWishlistList />
        </CardContent>
      </Card>
    </div>
  );
}


