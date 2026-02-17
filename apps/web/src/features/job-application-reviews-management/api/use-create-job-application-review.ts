import { getClient } from "@/lib/rpc/client";
import { useMutation } from "@tanstack/react-query";
import type { jobApplicationReviewInsertType } from "../schemas";

export const useCreateJobApplicationReview = () => {
  return useMutation({
    mutationFn: async (data: jobApplicationReviewInsertType) => {
      const rpcClient = await getClient();

      const response = await rpcClient.api.jobapplicationreviews.$post({
        json: data,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create job application review");
      }

      return response.json();
    },
  });
};
