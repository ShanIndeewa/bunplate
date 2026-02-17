"use client";

import { useGetNotification } from "@/features/notification-management/api/use-get-single-notification";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ArrowLeftIcon, BellIcon, EditIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function NotificationDetailPage() {
  const params = useParams();
  const notificationId = params.id as string;
  const { data: notification, isLoading, isError } = useGetNotification(notificationId);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/account/manage/notifications">
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Notifications
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

  if (isError || !notification) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/account/manage/notifications">
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Notifications
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Notification Not Found</h1>
        </div>
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              The notification you're looking for doesn't exist or has been deleted.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/account/manage/notifications">
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Notifications
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{notification.title}</h1>
            <p className="text-muted-foreground">
              Created {new Date(notification.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/account/manage/notifications/${notification.id}/edit`}>
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
              <CardTitle>Message</CardTitle>
              <CardDescription>Notification content and details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {notification.message && (
                <div className="prose max-w-none">
                  <p className="whitespace-pre-wrap">{notification.message}</p>
                </div>
              )}
              {!notification.message && (
                <p className="text-muted-foreground italic">
                  No message content available for this notification.
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
                  Notification Type
                </label>
                <p className="text-sm flex items-center gap-2">
                  <BellIcon className="h-4 w-4" />
                  {notification.notificationType || "Not specified"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Recipient Type
                </label>
                <p className="text-sm">
                  {notification.recipientType || "Not specified"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Recipient ID
                </label>
                <p className="text-sm font-mono">
                  {notification.recipientId || "Not specified"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Read Status
                </label>
                <p className="text-sm">
                  {notification.readAt ? (
                    <span className="text-green-600">
                      Read on {new Date(notification.readAt).toLocaleString()}
                    </span>
                  ) : (
                    <span className="text-yellow-600">Unread</span>
                  )}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Last Updated
                </label>
                <p className="text-sm">
                  {new Date(notification.updatedAt).toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>

          {notification.metadata && (
            <Card>
              <CardHeader>
                <CardTitle>Metadata</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="text-xs bg-muted p-3 rounded overflow-auto">
                  {typeof notification.metadata === 'string'
                    ? notification.metadata
                    : JSON.stringify(notification.metadata, null, 2)
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
