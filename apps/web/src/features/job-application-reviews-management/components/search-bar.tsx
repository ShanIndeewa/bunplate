"use client";

import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const params = new URLSearchParams(searchParams);
      if (search) {
        params.set("search", search);
      } else {
        params.delete("search");
      }
      params.delete("page"); // Reset to first page when searching
      router.push(`/account/manage/jobapplicationreviews?${params.toString()}`);
    },
    [search, searchParams, router]
  );

  const handleClear = useCallback(() => {
    setSearch("");
    const params = new URLSearchParams(searchParams);
    params.delete("search");
    params.delete("page");
    router.push(`/account/manage/jobapplicationreviews?${params.toString()}`);
  }, [searchParams, router]);

  return (
    <form onSubmit={handleSearch} className="flex items-center gap-2">
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search reviews..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 w-64"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
      >
        Search
      </button>
      {search && (
        <button
          type="button"
          onClick={handleClear}
          className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          Clear
        </button>
      )}
    </form>
  );
}
