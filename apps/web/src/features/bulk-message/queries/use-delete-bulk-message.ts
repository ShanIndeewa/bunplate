import { getClient } from "@/lib/rpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteBulkMessage = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id: string) => {
      const rpcClient = await getClient();

      const response = await rpcClient.api["bulk-message"][":id"].$delete({
        param: { id },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete bulk message");
      }

      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bulk-message"] });
      toast.success("Bulk message deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete bulk message");
    },
  });

  return mutation;
};

