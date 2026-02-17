"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader
} from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
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
import { PlusCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useCreateNotification } from "../api/use-create-notification";
import { notificationInsertSchema, type notificationInsertType } from "../schemas";

const defaultValues: Partial<notificationInsertType> = {
  title: "",
  message: "",
  metadata: null,
  notificationType: "pending",
  recipientType: "",
  readAt: null,
};

export function CreateNotification({
  triggerRef,
}: {
  triggerRef?: React.RefObject<HTMLButtonElement>;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useCreateNotification();
  const [open, setOpen] = useState(false);

  const form = useAppForm({
    validators: { onChange: notificationInsertSchema },
    defaultValues,
    onSubmit: ({ value }) =>
      mutate(value as notificationInsertType, {
        onSuccess: () => {
          form.reset();
          setOpen(false);
          queryClient.invalidateQueries({ queryKey: ["notifications"] });
        },
      }),
  });

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      e.stopPropagation();
      form.handleSubmit();
    },
    [form]
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          ref={triggerRef}
          variant="outline"
          icon={<PlusCircleIcon />}
          type="button"
          onClick={() => setOpen(true)}
        >
          Create new Notification
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Notification</DialogTitle>
        </DialogHeader>
        <Card className="w-full rounded-sm shadow-none border-none">
          <CardHeader>
            <CardDescription>
              Provide the details of the notification
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
                          placeholder="Enter recipient type (e.g., user, admin, all)"
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
                          placeholder='Enter metadata as JSON (e.g., {"key": "value"})'
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
                  Create Notification
                </Button>
              </CardFooter>
            </form>
          </form.AppForm>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
