import { getClient } from "@/lib/rpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AdUpdateType } from "../schemas";

export const useUpdateAd = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: AdUpdateType }) => {
      const rpcClient = await getClient();

      const response = await rpcClient.api.ads[":id"].$patch({
        param: { id },
        json: data,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update ad");
      }

      return response.json();
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["ads"] });
      queryClient.invalidateQueries({ queryKey: ["ad", id] });
    },
  });
};


