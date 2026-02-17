"use client";

import { AdList } from "@/features/ads-management/components/ad-list";
import { CreateAd } from "@/features/ads-management/components/create-new-ad";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRef } from "react";

export default function AdsManagementPage() {
  const createAdRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ads Management</h1>
          <p className="text-muted-foreground">
            Create, manage, and track your advertisements
          </p>
        </div>
        <CreateAd triggerRef={createAdRef} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Ads</CardTitle>
        </CardHeader>
        <CardContent>
          <AdList />
        </CardContent>
      </Card>
    </div>
  );
}
