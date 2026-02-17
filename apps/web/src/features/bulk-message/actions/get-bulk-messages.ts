import { getClient } from "@/lib/rpc/server";

export interface FilterParams {
  page?: number;
  limit?: number;
  search?: string | null;
  sort?: "desc" | "asc" | undefined;
}

export async function getBulkMessages(params: FilterParams = {}) {
  const { page = 1, limit = 10, search = "", sort = "desc" } = params;

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
    throw new Error("Failed to fetch bulk messages");
  }

  return await bulkMessagesRes.json();
}

