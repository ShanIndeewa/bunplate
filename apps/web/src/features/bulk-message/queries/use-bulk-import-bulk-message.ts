import { getClient } from "@/lib/rpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface BulkImportData {
  note: string;
  phoneNumber: string;
  whatsappNumber: string;
}

export const useBulkImportBulkMessage = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: BulkImportData[]) => {
      const rpcClient = await getClient();

      const response = await rpcClient.api["bulk-message"]["bulk-import"].$post({
        json: { records: data },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to import bulk messages");
      }

      return await response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["bulk-message"] });
      toast.success(`Successfully imported ${data.count} bulk messages`);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to import bulk messages");
    },
  });

  return mutation;
};
