import { getClient } from "@/lib/rpc/client";
import { useQuery } from "@tanstack/react-query";

export const useGetAd = (id: string) => {
  return useQuery({
    queryKey: ["ad", id],
    queryFn: async () => {
      const rpcClient = await getClient();

      const response = await rpcClient.api.ads[":id"].$get({
        param: { id },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to fetch ad");
      }

      return response.json();
    },
    enabled: !!id,
  });
};


