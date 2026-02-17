"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { PlusCircleIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateAd } from "../api/use-create-ad";
import { adInsertSchema, AdInsertType } from "../schemas";

const placementOptions = [
  { value: "homepage_top", label: "Homepage Top" },
  { value: "homepage_sidebar", label: "Homepage Sidebar" },
  { value: "job_listing_top", label: "Job Listing Top" },
  { value: "job_listing_sidebar", label: "Job Listing Sidebar" },
  { value: "profile_page", label: "Profile Page" },
  { value: "search_results", label: "Search Results" },
];

const adSizeOptions = [
  { value: "300x250", label: "300x250 (Medium Rectangle)" },
  { value: "728x90", label: "728x90 (Leaderboard)" },
  { value: "160x600", label: "160x600 (Wide Skyscraper)" },
  { value: "300x600", label: "300x600 (Half Page)" },
  { value: "320x50", label: "320x50 (Mobile Banner)" },
  { value: "250x250", label: "250x250 (Square)" },
];

const categoryOptions = [
  { value: "Jobs", label: "Jobs" },
  { value: "Events", label: "Events" },
  { value: "Services", label: "Services" },
  { value: "Products", label: "Products" },
  { value: "General", label: "General" },
];

export function CreateAd({
  triggerRef,
}: {
  triggerRef?: React.RefObject<HTMLButtonElement>;
}) {
  const [open, setOpen] = useState(false);
  const { mutateAsync, isPending, error } = useCreateAd();

  const form = useForm<AdInsertType>({
    resolver: zodResolver(adInsertSchema),
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "",
      category: "",
      externalLink: "",
      placement: "homepage_top",
      adSize: "300x250",
      isActive: true,
      startDate: undefined,
      endDate: undefined,
    },
  });

  const handleSubmit = async (values: AdInsertType) => {
    try {
      await mutateAsync(values);
      form.reset();
      setOpen(false);
    } catch (err) {
      console.error("Error creating ad:", err);
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
          Create New Ad
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Ad</DialogTitle>
        </DialogHeader>
        <Card className="w-full rounded-sm shadow-none border-none">
          <CardHeader>
            <CardDescription>
              Create a new advertisement to promote your content
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <CardContent className="flex flex-col gap-y-5 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ad Title *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter ad title"
                            {...field}
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={isPending}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categoryOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter ad description"
                          {...field}
                          disabled={isPending}
                          rows={3}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com/image.jpg"
                          {...field}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="externalLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>External Link</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com"
                          {...field}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="placement"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Placement *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={isPending}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select placement" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {placementOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="adSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ad Size *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={isPending}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select ad size" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {adSizeOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <Input
                            type="datetime-local"
                            {...field}
                            value={field.value ? new Date(field.value).toISOString().slice(0, 16) : ""}
                            onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : null)}
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                          <Input
                            type="datetime-local"
                            {...field}
                            value={field.value ? new Date(field.value).toISOString().slice(0, 16) : ""}
                            onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : null)}
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="isActive"
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
                        <FormLabel>Active</FormLabel>
                        <p className="text-sm text-muted-foreground">
                          Check if this ad should be active immediately
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
                  {isPending ? "Creating..." : "Create Ad"}
                </Button>
              </div>
            </form>
          </Form>
        </Card>
      </DialogContent>
    </Dialog>
  );
}


