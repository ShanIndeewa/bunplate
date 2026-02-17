"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface UsersPaginationProps {
  currentPage: number;
  totalPages: number;
}

export function UsersPagination({
  currentPage,
  totalPages,
}: UsersPaginationProps) {
  const searchParams = useSearchParams();

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    return `?${params.toString()}`;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-2">
      {/* Previous Page */}
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage <= 1}
        asChild={currentPage > 1}
      >
        {currentPage > 1 ? (
          <Link href={createPageUrl(currentPage - 1)}>
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Link>
        ) : (
          <>
            <ChevronLeft className="h-4 w-4" />
            Previous
          </>
        )}
      </Button>

      {/* Page Numbers */}
      <div className="flex items-center space-x-1">
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          const page =
            Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;

          return (
            <Button
              key={page}
              variant={page === currentPage ? "default" : "outline"}
              size="sm"
              asChild
            >
              <Link href={createPageUrl(page)}>{page}</Link>
            </Button>
          );
        })}
      </div>

      {/* Next Page */}
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage >= totalPages}
        asChild={currentPage < totalPages}
      >
        {currentPage < totalPages ? (
          <Link href={createPageUrl(currentPage + 1)}>
            Next
            <ChevronRight className="h-4 w-4" />
          </Link>
        ) : (
          <>
            Next
            <ChevronRight className="h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  );
}
