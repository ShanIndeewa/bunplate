"use client";

import { useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import {
    BellIcon,
    CalendarIcon,
    CheckIcon,
    EditIcon,
    ExternalLinkIcon,
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
import { useDeleteNotification } from "../api/use-delete-notification";
import type { notification } from "../schemas";

type Props = {
  notification: notification;
};

export function NotificationCard({ notification }: Props) {
  const id = useId();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { mutate: deleteNotification, isPending: isDeleting } = useDeleteNotification();
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    deleteNotification(notification.id, {
      onSuccess: () => {
        toast.success("Notification deleted successfully");
        setShowDeleteDialog(false);
        queryClient.invalidateQueries({ queryKey: ["notifications"] });
      },
      onError: () => {
        toast.error("Failed to delete notification");
        setShowDeleteDialog(false);
      },
    });
  };

  const getNotificationTypeColor = (type: string) => {
    switch (type) {
      case "pending":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "approved":
        return "bg-green-50 text-green-700 border-green-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getNotificationTypeIcon = (type: string) => {
    switch (type) {
      case "pending":
        return <CalendarIcon className="h-4 w-4" />;
      case "approved":
        return <CheckIcon className="h-4 w-4" />;
      default:
        return <BellIcon className="h-4 w-4" />;
    }
  };

  return (
    <>
      <Card
        key={id}
        className="transition-all hover:shadow-lg border-l-4 border-l-blue-500 p-4"
      >
        <div className="flex items-center gap-4">
          {/* Avatar section */}
          <Avatar className="h-16 w-16 rounded-full border">
            <AvatarImage
              src=""
              alt={notification.title || "Notification"}
              className="size-16"
            />
            <AvatarFallback className="bg-blue-50 text-blue-700">
              <BellIcon className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>

          {/* Main content section */}
          <div className="flex-grow">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
              <div>
                <h3 className="font-semibold line-clamp-1">{notification.title}</h3>
                <p className="text-xs text-muted-foreground">
                  Created {formatDistanceToNow(new Date(notification.createdAt))} ago
                </p>
              </div>
            </div>

            {/* Info with separators */}
            <div className="flex flex-wrap items-center gap-2 text-sm mt-2">
              {notification.message && (
                <span className="text-xs text-muted-foreground line-clamp-2">
                  {notification.message}
                </span>
              )}
              {notification.recipientId && (
                <>
                  <div className="text-gray-300 text-sm px-1">|</div>
                  <div className="flex items-center gap-1">
                    <UserIcon className="h-3.5 w-3.5 text-blue-500" />
                    <span className="text-sm truncate max-w-[120px]">
                      {notification.recipientId}
                    </span>
                  </div>
                </>
              )}
              {notification.recipientType && (
                <>
                  <div className="text-gray-300 text-sm px-1">|</div>
                  <span className="text-sm">{notification.recipientType}</span>
                </>
              )}
              {notification.readAt && (
                <>
                  <div className="text-gray-300 text-sm px-1">|</div>
                  <span className="text-sm text-green-600">
                    Read {formatDistanceToNow(new Date(notification.readAt))} ago
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Actions section */}
          <div className="flex items-center gap-2 ml-2 shrink-0">
            <Badge
              variant="outline"
              className={`text-xs w-fit ${getNotificationTypeColor(notification.notificationType || "pending")}`}
            >
              <div className="flex items-center gap-1">
                {getNotificationTypeIcon(notification.notificationType || "pending")}
                {notification.notificationType || "pending"}
              </div>
            </Badge>
            <Button size="sm" variant="outline" asChild className="h-8 px-2">
              <Link href={`/account/manage/notifications/${notification.id}`}>
                <ExternalLinkIcon className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="sm" variant="outline" asChild className="h-8 px-2">
              <Link href={`/account/manage/notifications/${notification.id}/edit`}>
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
              This will permanently delete the notification "{notification.title}". This
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
              {isDeleting ? "Deleting..." : "Delete Notification"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
