"use client";

import { useSearchParams } from "next/navigation";
import { useGetNotifications } from "../api/use-get-notifications";
import { notification } from "../schemas";
import { NotificationCard } from "./notification-card";
import { NotificationPagination } from "./notification-pagination";
import { SearchBar } from "./search-bar";

export function NotificationList() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const search = searchParams.get("search") || "";
  const { data, isLoading, isError } = useGetNotifications({
    page,
    limit: 10,
    sort: "desc",
    search,
  });

  if (isLoading) {
    return <div className="text-center py-10">Loading notifications...</div>;
  }

  if (isError || !data) {
    return (
      <div className="text-center py-10 text-red-500">
        Failed to load notifications.
      </div>
    );
  }

  const notifications: notification[] = data.data || [];
  const meta = data.meta || { currentPage: 1, totalPages: 1 };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold">Notifications</h2>
        <SearchBar />
      </div>
      <div className="flex flex-col gap-4">
        {notifications.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">
            No notifications found.
          </div>
        ) : (
          notifications.map((item) => <NotificationCard key={item.id} notification={item} />)
        )}
      </div>
      <NotificationPagination
        currentPage={meta.currentPage}
        totalPages={meta.totalPages}
      />
    </div>
  );
}
