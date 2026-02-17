import { getClient } from "@/lib/rpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { JobWishlistUpdateType } from "../schemas";

export const useUpdateJobWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: JobWishlistUpdateType }) => {
      const rpcClient = await getClient();

      const response = await rpcClient.api["job-wishlist"][":id"].$patch({
        param: { id },
        json: data,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update job wishlist");
      }

      return response.json();
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["job-wishlists"] });
      queryClient.invalidateQueries({ queryKey: ["job-wishlist", id] });
    },
  });
};
