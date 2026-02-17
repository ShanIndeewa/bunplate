import { getClient } from "@/lib/rpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AdInsertType } from "../schemas";

export const useCreateAd = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: AdInsertType) => {
      const rpcClient = await getClient();

      const response = await rpcClient.api.ads.$post({
        json: data,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create ad");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ads"] });
    },
  });
};


