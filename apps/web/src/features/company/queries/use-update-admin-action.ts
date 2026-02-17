import { getClient } from "@/lib/rpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UpdateAdminActionParams {
  id: string;
  adminAction: "admin_only" | "access_company";
}

export const useUpdateAdminAction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, adminAction }: UpdateAdminActionParams) => {
      const rpcClient = await getClient();

      const response = await rpcClient.api.jobapplication[":id"].admin.$patch({
        param: { id },
        json: { adminAction },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update admin action");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Admin action updated successfully");
      // Invalidate all job application queries to refresh the data
      queryClient.invalidateQueries({ queryKey: ["all-job-applications"] });
      queryClient.invalidateQueries({ queryKey: ["job-applications"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update admin action");
    },
  });
};
