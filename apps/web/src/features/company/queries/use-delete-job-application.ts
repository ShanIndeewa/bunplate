import { getClient } from "@/lib/rpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteJobApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const rpcClient = await getClient();

      const response = await rpcClient.api.jobapplication[":id"].admin.$delete({
        param: { id },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to delete job application");
      }

      return null;
    },
    onSuccess: () => {
      toast.success("Job application deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["job-applications"] });
      queryClient.invalidateQueries({ queryKey: ["all-job-applications"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete job application");
    },
  });
};
