"use client";

import { getClient } from "@/lib/rpc/client";
import { useQuery } from "@tanstack/react-query";

export interface JobSaveStatus {
  isSaved: boolean;
  wishlistItem?: {
    id: string;
    jobId: string;
    isApplied: boolean;
    createdAt: string;
  };
}

export const useCheckJobSaveStatus = (jobId: string) => {
  return useQuery({
    queryKey: ["job-save-status", jobId],
    queryFn: async (): Promise<JobSaveStatus> => {
      const rpcClient = await getClient();

      const response = await rpcClient.api["job-wishlist"].check[":jobId"].$get({
        param: { jobId },
      });

      if (!response.ok) {
        throw new Error("Failed to check job save status");
      }

      return await response.json();
    },
    enabled: !!jobId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};




