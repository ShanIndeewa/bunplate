import { getClient } from "@/lib/rpc/client";
import { useQuery } from "@tanstack/react-query";

export const useGetBulkMessage = (id: string) => {
  const query = useQuery({
    queryKey: ["bulk-message", id],
    queryFn: async () => {
      const rpcClient = await getClient();

      const bulkMessageRes = await rpcClient.api["bulk-message"][":id"].$get({
        param: { id },
      });

      if (!bulkMessageRes.ok) {
        const errorData = await bulkMessageRes.json();
        throw new Error("Failed to fetch bulk message");
      }

      const bulkMessage = await bulkMessageRes.json();

      return bulkMessage;
    },
    enabled: !!id,
  });

  return query;
};

