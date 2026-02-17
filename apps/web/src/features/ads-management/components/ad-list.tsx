"use client";

import { useSearchParams } from "next/navigation";
import { useGetAds } from "../api/use-get-ads";
import { Ad } from "../schemas";
import { AdCard } from "./ad-card";
import { AdPagination } from "./ad-pagination";
import { SearchBar } from "./search-bar";

export function AdList() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const search = searchParams.get("search") || "";
  const { data, isLoading, isError } = useGetAds({
    page,
    limit: 10,
    sort: "desc",
    search,
  });

  if (isLoading) {
    return <div className="text-center py-10">Loading ads...</div>;
  }

  if (isError || !data) {
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load ads.
      </div>
    );
  }

  const ads: Ad[] = data.data || [];
  const meta = data.meta || { currentPage: 1, totalPages: 1 };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold">Your Ads</h2>
        <SearchBar />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ads.length === 0 ? (
          <div className="col-span-full text-center py-10 text-muted-foreground">
            <div className="flex flex-col items-center gap-2">
              <div className="text-4xl">📢</div>
              <p>No ads found.</p>
              <p className="text-sm">Create your first ad to get started.</p>
            </div>
          </div>
        ) : (
          ads.map((ad) => (
            <AdCard key={ad.id} ad={ad} />
          ))
        )}
      </div>
      <AdPagination
        currentPage={meta.currentPage}
        totalPages={meta.totalPages}
      />
    </div>
  );
}


