import { getClient } from "@/lib/rpc/client";
import { useQuery } from "@tanstack/react-query";

export const useGetJobWishlist = (id: string) => {
  return useQuery({
    queryKey: ["job-wishlist", id],
    queryFn: async () => {
      const rpcClient = await getClient();

      const response = await rpcClient.api["job-wishlist"][":id"].$get({
        param: { id },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to fetch job wishlist");
      }

      return response.json();
    },
    enabled: !!id,
  });
};
