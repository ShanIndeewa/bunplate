import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useId } from "react";
import { toast } from "sonner";

import { getClient } from "@/lib/rpc/client";
import { type z } from "zod";
import { jobInsertSchema } from "../schemas/jobs.schema";

// ✅ infer type from your insert schema
export type JobInsertType = z.infer<typeof jobInsertSchema>;

export const useCreateJob = () => {
  const queryClient = useQueryClient();
  const toastId = useId();

  const mutation = useMutation({
    mutationFn: async (values: JobInsertType) => {
      const rpcClient = await getClient();

      // call POST /api/jobs
      const response = await rpcClient.api.jobs.$post({
        json: values,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create job");
      }

      const data = await response.json();
      return data;
    },
    onMutate: () => {
      toast.loading("Creating your job...", { id: toastId });
    },
    onSuccess: () => {
      toast.success("Job created successfully!", { id: toastId });
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to create job", { id: toastId });
    },
  });

  return mutation;
};
