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
import { useCreateJobApplicationReview } from "../api/use-create-job-application-review";
import { jobApplicationReviewInsertSchema, type jobApplicationReviewInsertType } from "../schemas";

const defaultValues: Partial<jobApplicationReviewInsertType> = {
  applicationId: "",
  status: "under_review",
  rating: null,
  comments: null,
  attachments: null,
  interviewAt: null,
  interviewLocation: null,
  meetingLink: null,
};

export function CreateJobApplicationReview({
  triggerRef,
}: {
  triggerRef?: React.RefObject<HTMLButtonElement>;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useCreateJobApplicationReview();
  const [open, setOpen] = useState(false);

  const form = useAppForm({
    validators: { onChange: jobApplicationReviewInsertSchema },
    defaultValues,
    onSubmit: ({ value }) =>
      mutate(value as jobApplicationReviewInsertType, {
        onSuccess: () => {
          form.reset();
          setOpen(false);
          queryClient.invalidateQueries({ queryKey: ["job-application-reviews"] });
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
          Create new Review
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Job Application Review</DialogTitle>
        </DialogHeader>
        <Card className="w-full rounded-sm shadow-none border-none">
          <CardHeader>
            <CardDescription>
              Provide the details of the job application review
            </CardDescription>
          </CardHeader>
          <form.AppForm>
            <form onSubmit={handleSubmit}>
              <CardContent className="flex flex-col gap-y-5 mb-6">
                <form.AppField
                  name="applicationId"
                  children={(field) => (
                    <field.FormItem>
                      <field.FormLabel>Application ID</field.FormLabel>
                      <field.FormControl>
                        <Input
                          disabled={isPending}
                          placeholder="Enter application ID"
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
                  name="status"
                  children={(field) => (
                    <field.FormItem>
                      <field.FormLabel>Status</field.FormLabel>
                      <field.FormControl>
                        <Select
                          value={field.state.value || ""}
                          onValueChange={(val) => field.handleChange(val as typeof field.state.value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select review status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under_review">Under Review</SelectItem>
                            <SelectItem value="shortlisted">Shortlisted</SelectItem>
                            <SelectItem value="interview_scheduled">Interview Scheduled</SelectItem>
                            <SelectItem value="on_hold">On Hold</SelectItem>
                            <SelectItem value="accepted">Accepted</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                      </field.FormControl>
                      <field.FormMessage />
                    </field.FormItem>
                  )}
                />
                <form.AppField
                  name="rating"
                  children={(field) => (
                    <field.FormItem>
                      <field.FormLabel>Rating (1-5)</field.FormLabel>
                      <field.FormControl>
                        <Input
                          type="number"
                          min="1"
                          max="5"
                          disabled={isPending}
                          placeholder="Enter rating (1-5)"
                          value={field.state.value || ""}
                          onChange={(e) => field.handleChange(e.target.value ? Number(e.target.value) : null)}
                          onBlur={field.handleBlur}
                        />
                      </field.FormControl>
                      <field.FormMessage />
                    </field.FormItem>
                  )}
                />
                <form.AppField
                  name="comments"
                  children={(field) => (
                    <field.FormItem>
                      <field.FormLabel>Comments</field.FormLabel>
                      <field.FormControl>
                        <Textarea
                          disabled={isPending}
                          placeholder="Enter review comments"
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
                  name="interviewAt"
                  children={(field) => (
                    <field.FormItem>
                      <field.FormLabel>Interview Date & Time</field.FormLabel>
                      <field.FormControl>
                        <Input
                          type="datetime-local"
                          disabled={isPending}
                          value={field.state.value ? new Date(field.state.value).toISOString().slice(0, 16) : ""}
                          onChange={(e) => field.handleChange((e.target.value ? new Date(e.target.value).toISOString() : null) as typeof field.state.value)}
                          onBlur={field.handleBlur}
                        />
                      </field.FormControl>
                      <field.FormMessage />
                    </field.FormItem>
                  )}
                />
                <form.AppField
                  name="interviewLocation"
                  children={(field) => (
                    <field.FormItem>
                      <field.FormLabel>Interview Location</field.FormLabel>
                      <field.FormControl>
                        <Input
                          disabled={isPending}
                          placeholder="Enter interview location"
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
                  name="meetingLink"
                  children={(field) => (
                    <field.FormItem>
                      <field.FormLabel>Meeting Link</field.FormLabel>
                      <field.FormControl>
                        <Input
                          type="url"
                          disabled={isPending}
                          placeholder="Enter meeting link (e.g., https://meet.google.com/...)"
                          value={field.state.value || ""}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                        />
                      </field.FormControl>
                      <field.FormMessage />
                    </field.FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" loading={isPending} disabled={isPending}>
                  Create Review
                </Button>
              </CardFooter>
            </form>
          </form.AppForm>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
