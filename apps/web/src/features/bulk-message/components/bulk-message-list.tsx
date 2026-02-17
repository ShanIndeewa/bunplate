"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageCircle, Plus, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { useDeleteBulkMessage } from "../queries/use-delete-bulk-message";
import { useGetBulkMessages } from "../queries/use-get-bulk-messages";
import { BulkMessageCard } from "./bulk-message-card";

export function BulkMessageList() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, error } = useGetBulkMessages({
    page,
    limit,
    search: search || undefined,
  });

  const deleteBulkMessage = useDeleteBulkMessage();

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this bulk message?")) {
      deleteBulkMessage.mutate(id);
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-32">
        <p className="text-destructive">Failed to load bulk messages</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search bulk messages..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Button asChild>
          <Link href="/account/manage/bulk-messages/new">
            <Plus className="mr-2 h-4 w-4" />
            New Bulk Message
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="w-full">
              <CardHeader>
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : data?.data?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-muted p-3 mb-4">
            <MessageCircle className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No bulk messages found</h3>
          <p className="text-muted-foreground mb-4">
            Get started by creating your first bulk message.
          </p>
          <Button asChild>
            <Link href="/account/manage/bulk-messages/new">
              <Plus className="mr-2 h-4 w-4" />
              Create Bulk Message
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data?.data?.map((bulkMessage) => (
            <BulkMessageCard
              key={bulkMessage.id}
              bulkMessage={bulkMessage}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {data?.meta && data.meta.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {page} of {data.meta.totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(page + 1)}
            disabled={page === data.meta.totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
