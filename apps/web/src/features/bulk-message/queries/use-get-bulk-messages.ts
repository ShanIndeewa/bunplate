import { getClient } from "@/lib/rpc/client";
import { useQuery } from "@tanstack/react-query";

export interface FilterParams {
  page?: number;
  limit?: number;
  search?: string | null;
  sort?: "desc" | "asc" | undefined;
}

export const useGetBulkMessages = (params: FilterParams) => {
  const { page = 1, limit = 10, search = "", sort = "desc" } = params;

  const query = useQuery({
    queryKey: ["bulk-message", { page, limit, search, sort }],
    queryFn: async () => {
      const rpcClient = await getClient();

      const bulkMessagesRes = await rpcClient.api["bulk-message"].$get({
        query: {
          page: page.toString(),
          limit: limit.toString(),
          search: search || undefined,
          sort: sort || undefined,
        },
      });

      if (!bulkMessagesRes.ok) {
        const errorData = await bulkMessagesRes.json();
        throw new Error("Failed to fetch bulk messages");
      }

      const bulkMessages = await bulkMessagesRes.json();

      return bulkMessages;
    },
  });

  return query;
};

