import { getClient } from "@/lib/rpc/client";
import { useQuery } from "@tanstack/react-query";

export interface NotificationFilterParams {
  page?: number;
  limit?: number;
  search?: string | null;
  sort?: "desc" | "asc" | undefined;
}

export const useGetNotifications = (params: NotificationFilterParams) => {
  const { page = 1, limit = 10, search = "", sort = "desc" } = params;

  return useQuery({
    queryKey: ["notifications", { page, limit, search, sort }],
    queryFn: async () => {
      const rpcClient = await getClient();

      const notificationsRes = await rpcClient.api.notifications.$get({
        query: {
          page: page.toString(),
          limit: limit.toString(),
          search: search || undefined,
          sort: sort || undefined,
        },
      });

      if (!notificationsRes.ok) {
        const errorData = await notificationsRes.json();
        throw new Error(errorData.message || "Failed to fetch notifications");
      }

      const notifications = await notificationsRes.json();

      return notifications;
    },
  });
};
