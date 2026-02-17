"use client";

import { useSearchParams } from "next/navigation";
import { useGetJobWishlists } from "../api/use-get-job-wishlists";
import { JobWishlist } from "../schemas";
import { JobWishlistCard } from "./job-wishlist-card";
import { JobWishlistPagination } from "./job-wishlist-pagination";
import { SearchBar } from "./search-bar";

export function JobWishlistList() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const search = searchParams.get("search") || "";
  const { data, isLoading, isError } = useGetJobWishlists({
    page,
    limit: 10,
    sort: "desc",
    search,
  });

  if (isLoading) {
    return <div className="text-center py-10">Loading job wishlist...</div>;
  }

  if (isError || !data) {
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load job wishlist.
      </div>
    );
  }

  const wishlists: JobWishlist[] = data.data || [];
  const meta = data.meta || { currentPage: 1, totalPages: 1 };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold">Job Wishlist</h2>
        <SearchBar />
      </div>
      <div className="flex flex-col gap-4">
        {wishlists.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">
            <div className="flex flex-col items-center gap-2">
              <div className="text-4xl">📋</div>
              <p>No jobs in your wishlist yet.</p>
              <p className="text-sm">Add jobs to your wishlist to keep track of opportunities you're interested in.</p>
            </div>
          </div>
        ) : (
          wishlists.map((wishlist) => (
            <JobWishlistCard key={wishlist.id} wishlist={wishlist} />
          ))
        )}
      </div>
      <JobWishlistPagination
        currentPage={meta.currentPage}
        totalPages={meta.totalPages}
      />
    </div>
  );
}


