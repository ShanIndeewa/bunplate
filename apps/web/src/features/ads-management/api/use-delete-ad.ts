import { getClient } from "@/lib/rpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteAd = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const rpcClient = await getClient();

      const response = await rpcClient.api.ads[":id"].$delete({
        param: { id },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to delete ad");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ads"] });
    },
  });
};


