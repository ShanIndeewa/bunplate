"use client";

import { CreateNotification } from "@/features/notification-management/components/create-new-notification";
import { NotificationList } from "@/features/notification-management/components/notification-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRef } from "react";

export default function NotificationManagementPage() {
  const createNotificationRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notification Management</h1>
          <p className="text-muted-foreground">
            Create, edit, and manage your notifications
          </p>
        </div>
        <CreateNotification triggerRef={createNotificationRef} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <NotificationList />
        </CardContent>
      </Card>
    </div>
  );
}
