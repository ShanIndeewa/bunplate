"use client";

import { useGetNotification } from "@/features/notification-management/api/use-get-single-notification";
import { useUpdateNotification } from "@/features/notification-management/api/use-update-notification";
import { notificationUpdateSchema, type notificationUpdateType } from "@/features/notification-management/schemas";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useAppForm } from "@/components/ui/tanstack-form";
import { Textarea } from "@/components/ui/textarea";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { toast } from "sonner";

interface EditNotificationPageProps {
  params: {
    id: string;
  };
}

export default function EditNotificationPage({ params }: EditNotificationPageProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: notification, isLoading, isError } = useGetNotification(params.id);
  const { mutate: updateNotification, isPending } = useUpdateNotification();

  const form = useAppForm({
    validators: { onChange: notificationUpdateSchema },
    defaultValues: {
      title: "",
      message: "",
      metadata: "",
      notificationType: "pending",
      recipientType: "",
      readAt: null,
    },
    onSubmit: ({ value }) =>
      updateNotification(
        { id: params.id, data: value as notificationUpdateType },
        {
          onSuccess: () => {
            toast.success("Notification updated successfully");
            queryClient.invalidateQueries({ queryKey: ["notifications"] });
            router.push("/account/manage/notifications");
          },
          onError: (error) => {
            toast.error(error.message || "Failed to update notification");
          },
        }
      ),
  });

  // Update form values when notification data loads
  useEffect(() => {
    if (notification) {
      form.setFieldValue("title", notification.title || "");
      form.setFieldValue("message", notification.message || "");
      form.setFieldValue("metadata", notification.metadata || "");
      form.setFieldValue("notificationType", notification.notificationType || "pending");
      form.setFieldValue("recipientType", notification.recipientType || "");
      form.setFieldValue("readAt", notification.readAt);
    }
  }, [notification, form]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      e.stopPropagation();
      form.handleSubmit();
    },
    [form]
  );

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
            <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
          </CardHeader>
          <CardContent className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded w-full animate-pulse"></div>
              </div>
            ))}
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
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/account/manage/notifications">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Notifications
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Notification</h1>
          <p className="text-muted-foreground">
            Update your notification details
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notification Details</CardTitle>
          <CardDescription>
            Update the information for your notification
          </CardDescription>
        </CardHeader>
        <form.AppForm>
          <form onSubmit={handleSubmit}>
            <CardContent className="flex flex-col gap-y-5 mb-6">
              <form.AppField
                name="title"
                children={(field) => (
                  <field.FormItem>
                    <field.FormLabel>Title</field.FormLabel>
                    <field.FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Enter notification title"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                      />
                    </field.FormControl>
                    <field.FormMessage />
                  </field.FormItem>
                )}
              />
              <form.AppField
                name="message"
                children={(field) => (
                  <field.FormItem>
                    <field.FormLabel>Message</field.FormLabel>
                    <field.FormControl>
                      <Textarea
                        disabled={isPending}
                        placeholder="Enter notification message"
                        value={field.state.value || ""}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        rows={4}
                      />
                    </field.FormControl>
                    <field.FormMessage />
                  </field.FormItem>
                )}
              />
              <form.AppField
                name="notificationType"
                children={(field) => (
                  <field.FormItem>
                    <field.FormLabel>Notification Type</field.FormLabel>
                    <field.FormControl>
                      <Select
                        value={field.state.value || ""}
                        onValueChange={field.handleChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select notification type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="approved">Approved</SelectItem>
                        </SelectContent>
                      </Select>
                    </field.FormControl>
                    <field.FormMessage />
                  </field.FormItem>
                )}
              />
              <form.AppField
                name="recipientType"
                children={(field) => (
                  <field.FormItem>
                    <field.FormLabel>Recipient Type</field.FormLabel>
                    <field.FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Enter recipient type"
                        value={field.state.value || ""}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                      />
                    </field.FormControl>
                    <field.FormMessage />
                  </field.FormItem>
                )}
              />
              <form.AppField
                name="metadata"
                children={(field) => (
                  <field.FormItem>
                    <field.FormLabel>Metadata (JSON)</field.FormLabel>
                    <field.FormControl>
                      <Textarea
                        disabled={isPending}
                        placeholder='Enter metadata as JSON'
                        value={field.state.value || ""}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        rows={3}
                      />
                    </field.FormControl>
                    <field.FormMessage />
                  </field.FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" loading={isPending} disabled={isPending}>
                Update Notification
              </Button>
            </CardFooter>
          </form>
        </form.AppForm>
      </Card>
    </div>
  );
}
