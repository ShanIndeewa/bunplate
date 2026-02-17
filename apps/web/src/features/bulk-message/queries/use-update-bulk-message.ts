import { getClient } from "@/lib/rpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import type { bulkMessageUpdateType } from "../schemas";

export const useUpdateBulkMessage = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: bulkMessageUpdateType }) => {
      const rpcClient = await getClient();

      const response = await rpcClient.api["bulk-message"][":id"].$patch({
        param: { id },
        json: data,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update bulk message");
      }

      return await response.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["bulk-message"] });
      queryClient.invalidateQueries({ queryKey: ["bulk-message", variables.id] });
      toast.success("Bulk message updated successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update bulk message");
    },
  });

  return mutation;
};

