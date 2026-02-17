"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { EditIcon, Loader2, MapPin, Tag } from "lucide-react";
import { useGetJobCategoriesByUserId } from "../../queries/use-get-job-catogories-by-userid";
import { type JobCategory } from "../../schemas/jobCategory.schema";

export function JobCategoryList() {
  const {
    data: jobCategories,
    isLoading,
    isError,
    refetch,
  } = useGetJobCategoriesByUserId();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="animate-spin h-6 w-6 text-blue-600" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500 text-center py-10">
        Failed to load job categories.
        <Button onClick={() => refetch()} className="ml-2" size="sm">
          Retry
        </Button>
      </div>
    );
  }

  if (!jobCategories || jobCategories.length === 0) {
    return (
      <p className="text-center py-10 text-gray-500">
        No job categories found.
      </p>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {jobCategories.map((category) => (
        <JobCategoryCard
          key={category.id}
          jobCategory={category}
          onEdit={() => console.log("Edit category", category.id)}
        />
      ))}
    </div>
  );
}

// ----------------- Optimized JobCategoryCard -----------------
type JobCategoryCardProps = {
  jobCategory: JobCategory;
  onEdit?: () => void;
};

function JobCategoryCard({ jobCategory, onEdit }: JobCategoryCardProps) {
  return (
    <Card className="flex flex-col justify-between h-full shadow-sm hover:shadow-md transition-all duration-200 rounded-lg overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base font-semibold truncate">
            {jobCategory.keyword}
          </CardTitle>
          <Badge variant="secondary" className="rounded-full text-xs px-2 py-0.5">
            {jobCategory.type}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
          {jobCategory.description || "No description available"}
        </p>
      </CardHeader>
      <CardContent className="flex-1 text-sm space-y-2">
        <div className="flex items-center gap-2">
          <Tag className="h-4 w-4 text-primary" />
          <span className="text-muted-foreground">Type: {jobCategory.type}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="text-muted-foreground">
            Created: {new Date(jobCategory.createdAt).toLocaleDateString()}
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-0">
        <Button
          onClick={onEdit}
          variant="outline"
          size="sm"
          className="w-full rounded-none border-t"
        >
          <EditIcon className="h-4 w-4 mr-1" /> Edit
        </Button>
      </CardFooter>
    </Card>
  );
}
