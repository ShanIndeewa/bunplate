"use client";

import { getClient } from "@/lib/rpc/client";
import { useQuery } from "@tanstack/react-query";

export interface JobApplicationStatus {
  hasApplied: boolean;
  application?: {
    id: string;
    status: string;
    submittedAt: string;
    createdAt: string;
  };
}

export const useCheckJobApplication = (jobId: string) => {
  return useQuery({
    queryKey: ["job-application-status", jobId],
    queryFn: async (): Promise<JobApplicationStatus> => {
      const rpcClient = await getClient();

      const response = await rpcClient.api.jobapplication.check[":jobId"].$get({
        param: { jobId },
      });

      if (!response.ok) {
        throw new Error("Failed to check application status");
      }

      return await response.json();
    },
    enabled: !!jobId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

