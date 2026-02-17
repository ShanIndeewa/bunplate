"use client";

import { useGetJobApplicationReview } from "@/features/job-application-reviews-management/api/use-get-single-job-application-review";
import { useUpdateJobApplicationReview } from "@/features/job-application-reviews-management/api/use-update-job-application-review";
import { jobApplicationReviewUpdateSchema, type jobApplicationReviewUpdateType } from "@/features/job-application-reviews-management/schemas";
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

interface EditJobApplicationReviewPageProps {
  params: {
    id: string;
  };
}

export default function EditJobApplicationReviewPage({ params }: EditJobApplicationReviewPageProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: review, isLoading, isError } = useGetJobApplicationReview(params.id);
  const { mutate: updateReview, isPending } = useUpdateJobApplicationReview();

  const form = useAppForm({
    validators: { onChange: jobApplicationReviewUpdateSchema },
    defaultValues: {
      applicationId: "",
      status: "under_review",
      rating: null,
      comments: null,
      attachments: null,
      interviewAt: null,
      interviewLocation: null,
      meetingLink: null,
    },
    onSubmit: ({ value }) =>
      updateReview(
        { id: params.id, data: value as jobApplicationReviewUpdateType },
        {
          onSuccess: () => {
            toast.success("Job application review updated successfully");
            queryClient.invalidateQueries({ queryKey: ["job-application-reviews"] });
            router.push("/account/manage/jobapplicationreviews");
          },
          onError: (error) => {
            toast.error(error.message || "Failed to update job application review");
          },
        }
      ),
  });

  // Update form values when review data loads
  useEffect(() => {
    if (review) {
      form.setFieldValue("applicationId", review.applicationId || "");
      form.setFieldValue("status", review.status || "under_review");
      form.setFieldValue("rating", review.rating);
      form.setFieldValue("comments", review.comments || "");
      form.setFieldValue("attachments", review.attachments);
      form.setFieldValue("interviewAt", review.interviewAt);
      form.setFieldValue("interviewLocation", review.interviewLocation || "");
      form.setFieldValue("meetingLink", review.meetingLink || "");
    }
  }, [review, form]);

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
            <Link href="/account/manage/jobapplicationreviews">
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Reviews
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
            {Array.from({ length: 7 }).map((_, i) => (
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

  if (isError || !review) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/account/manage/jobapplicationreviews">
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Reviews
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Review Not Found</h1>
        </div>
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              The job application review you're looking for doesn't exist or has been deleted.
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
          <Link href="/account/manage/jobapplicationreviews">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Reviews
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Job Application Review</h1>
          <p className="text-muted-foreground">
            Update your job application review details
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Review Details</CardTitle>
          <CardDescription>
            Update the information for your job application review
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
                        onValueChange={field.handleChange}
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
                        onChange={(e) => field.handleChange(e.target.value ? new Date(e.target.value).toISOString() : null)}
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
                        placeholder="Enter meeting link"
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
                Update Review
              </Button>
            </CardFooter>
          </form>
        </form.AppForm>
      </Card>
    </div>
  );
}
