import { getClient } from "@/lib/rpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { JobWishlistInsertType } from "../schemas";

export const useCreateJobWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: JobWishlistInsertType) => {
      const rpcClient = await getClient();

      const response = await rpcClient.api["job-wishlist"].$post({
        json: data,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create job wishlist");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job-wishlists"] });
    },
  });
};
