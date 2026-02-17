import { getClient } from "@/lib/rpc/server";

export async function getBulkMessage(id: string) {
  const rpcClient = await getClient();

  const bulkMessageRes = await rpcClient.api["bulk-message"][":id"].$get({
    param: { id },
  });

  if (!bulkMessageRes.ok) {
    throw new Error("Failed to fetch bulk message");
  }

  return await bulkMessageRes.json();
}

