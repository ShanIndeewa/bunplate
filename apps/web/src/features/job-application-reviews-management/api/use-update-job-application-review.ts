import { getClient } from "@/lib/rpc/client";
import { useMutation } from "@tanstack/react-query";
import type { jobApplicationReviewUpdateType } from "../schemas";

export const useUpdateJobApplicationReview = () => {
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: jobApplicationReviewUpdateType;
    }) => {
      const rpcClient = await getClient();

      const response = await rpcClient.api.jobapplicationreviews[":id"].$patch({
        param: { id },
        json: data,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update job application review");
      }

      return response.json();
    },
  });
};
