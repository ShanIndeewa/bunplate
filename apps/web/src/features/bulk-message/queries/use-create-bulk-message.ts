import { getClient } from "@/lib/rpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import type { bulkMessageInsertType } from "../schemas";

export const useCreateBulkMessage = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: bulkMessageInsertType) => {
      const rpcClient = await getClient();

      const response = await rpcClient.api["bulk-message"].$post({
        json: data,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create bulk message");
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bulk-message"] });
      toast.success("Bulk message created successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create bulk message");
    },
  });

  return mutation;
};

