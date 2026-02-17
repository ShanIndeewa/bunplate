import { getClient } from "@/lib/rpc/client";
import { useQuery } from "@tanstack/react-query";

export const useGetJobApplicationReview = (id: string) => {
  return useQuery({
    queryKey: ["job-application-review", id],
    queryFn: async () => {
      const rpcClient = await getClient();

      const response = await rpcClient.api.jobapplicationreviews[":id"].$get({
        param: { id },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch job application review");
      }

      return response.json();
    },
    enabled: !!id,
  });
};
