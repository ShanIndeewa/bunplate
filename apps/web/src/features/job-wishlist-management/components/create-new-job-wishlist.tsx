"use client";

import { useGetJobs } from "@/features/company/queries/use-get-all-jobs";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircleIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateJobWishlist } from "../api/use-create-job-wishlist";
import { jobWishlistInsertSchema, JobWishlistInsertType } from "../schemas";

export function CreateJobWishlist({
  triggerRef,
}: {
  triggerRef?: React.RefObject<HTMLButtonElement>;
}) {
  const [open, setOpen] = useState(false);
  const [jobSearch, setJobSearch] = useState("");
  const { mutateAsync, isPending, error } = useCreateJobWishlist();
  const activeOrg = authClient.useActiveOrganization();

  // Get jobs for dropdown
  const { data: jobs, isLoading: jobsLoading } = useGetJobs({
    page: 1,
    limit: 50,
    search: jobSearch,
    sort: "desc",
  });

  const form = useForm<JobWishlistInsertType>({
    resolver: zodResolver(jobWishlistInsertSchema),
    defaultValues: {
      jobId: "",
      jobStatus: "live",
      isApplied: false,
    },
  });


  const handleSubmit = async (values: JobWishlistInsertType) => {
    try {
      // Include organization ID from active organization
      const submitData = {
        ...values,
        organizationId: activeOrg.data?.id || "",
      };

      await mutateAsync(submitData);
      form.reset();
      setOpen(false);
    } catch (err) {
      console.error("Error creating job wishlist:", err);
    }
  };

  const handleTriggerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(true);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          ref={triggerRef}
          variant="outline"
          icon={<PlusCircleIcon />}
          type="button"
          onClick={handleTriggerClick}
        >
          Add to Wishlist
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Job to Wishlist</DialogTitle>
        </DialogHeader>
        <Card className="w-full rounded-sm shadow-none border-none">
          <CardHeader>
            <CardDescription>
              Add a job to your wishlist to keep track of opportunities you're interested in
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <CardContent className="flex flex-col gap-y-5 mb-6">
                <FormField
                  control={form.control}
                  name="jobId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Job *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isPending || jobsLoading}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={jobsLoading ? "Loading jobs..." : "Search and select a job"} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <div className="p-2">
                            <div className="relative">
                              <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="Search jobs..."
                                value={jobSearch}
                                onChange={(e) => setJobSearch(e.target.value)}
                                className="pl-8"
                              />
                            </div>
                          </div>
                          {jobs && jobs.length > 0 ? (
                            jobs.map((job: any) => (
                              <SelectItem key={job.id} value={job.id}>
                                <div className="flex flex-col">
                                  <span className="font-medium">{job.title}</span>
                                  <span className="text-sm text-muted-foreground">
                                    {job.location} • {job.company?.name || 'Unknown Company'}
                                  </span>
                                </div>
                              </SelectItem>
                            ))
                          ) : (
                            <div className="p-2 text-sm text-muted-foreground">
                              {jobsLoading ? "Loading..." : "No jobs found"}
                            </div>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />


                <FormField
                  control={form.control}
                  name="jobStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isPending}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select job status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="live">Live</SelectItem>
                          <SelectItem value="expired">Expired</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isApplied"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isPending}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Already Applied</FormLabel>
                        <p className="text-sm text-muted-foreground">
                          Check if you have already applied to this job
                        </p>
                      </div>
                    </FormItem>
                  )}
                />

                {error && (
                  <div className="text-sm text-red-500 bg-red-50 p-3 rounded-md">
                    {error.message}
                  </div>
                )}
              </CardContent>

              <div className="flex justify-end gap-3 px-6 pb-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                  disabled={isPending}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Adding..." : "Add to Wishlist"}
                </Button>
              </div>
            </form>
          </Form>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
