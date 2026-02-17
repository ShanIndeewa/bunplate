"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, XIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  const handleSearch = (value: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set("search", value);
        params.set("page", "1"); // Reset to first page when searching
      } else {
        params.delete("search");
      }
      router.push(`?${params.toString()}`);
    });
  };

  const handleClear = () => {
    setSearch("");
    handleSearch("");
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search ads..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch(search);
            }
          }}
          className="pl-10 pr-10 w-64"
          disabled={isPending}
        />
        {search && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 p-0"
            disabled={isPending}
          >
            <XIcon className="h-3 w-3" />
          </Button>
        )}
      </div>
      <Button
        onClick={() => handleSearch(search)}
        disabled={isPending}
        size="sm"
      >
        {isPending ? "Searching..." : "Search"}
      </Button>
    </div>
  );
}


