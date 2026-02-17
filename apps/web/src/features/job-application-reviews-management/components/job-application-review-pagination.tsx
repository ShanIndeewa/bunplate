"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface JobApplicationReviewPaginationProps {
  currentPage: number;
  totalPages: number;
}

export function JobApplicationReviewPagination({
  currentPage,
  totalPages,
}: JobApplicationReviewPaginationProps) {
  const searchParams = useSearchParams();

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    return `/account/manage/jobapplicationreviews?${params.toString()}`;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <Button
        variant="outline"
        size="sm"
        asChild
        disabled={currentPage <= 1}
      >
        <Link href={createPageUrl(currentPage - 1)}>
          <ChevronLeftIcon className="h-4 w-4 mr-1" />
          Previous
        </Link>
      </Button>

      <div className="flex items-center gap-1">
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let pageNum;
          if (totalPages <= 5) {
            pageNum = i + 1;
          } else if (currentPage <= 3) {
            pageNum = i + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNum = totalPages - 4 + i;
          } else {
            pageNum = currentPage - 2 + i;
          }

          return (
            <Button
              key={pageNum}
              variant={currentPage === pageNum ? "default" : "outline"}
              size="sm"
              asChild
              className="w-8 h-8 p-0"
            >
              <Link href={createPageUrl(pageNum)}>{pageNum}</Link>
            </Button>
          );
        })}
      </div>

      <Button
        variant="outline"
        size="sm"
        asChild
        disabled={currentPage >= totalPages}
      >
        <Link href={createPageUrl(currentPage + 1)}>
          Next
          <ChevronRightIcon className="h-4 w-4 ml-1" />
        </Link>
      </Button>
    </div>
  );
}
