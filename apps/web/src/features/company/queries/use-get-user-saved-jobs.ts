"use client";

import { getClient } from "@/lib/rpc/client";
import { useQuery } from "@tanstack/react-query";

export interface SavedJob {
  id: string;
  jobId: string;
  jobStatus: string;
  isApplied: boolean;
  createdAt: string;
  updatedAt: string;
  job?: {
    id: string;
    title: string;
    description: string;
    location: string;
    type: string;
    salaryMin?: number;
    salaryMax?: number;
    experienceRequired?: string;
    skills?: string[];
    isRemote: boolean;
    postedAt: string;
    company?: {
      id: string;
      name: string;
      city?: string;
      country?: string;
    };
  };
}

export interface SavedJobsResponse {
  data: SavedJob[];
  meta: {
    totalCount: number;
    limit: number;
    currentPage: number;
    totalPages: number;
  };
}

export const useGetUserSavedJobs = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["user-saved-jobs", page, limit],
    queryFn: async (): Promise<SavedJobsResponse> => {
      const rpcClient = await getClient();

      const response = await rpcClient.api["job-wishlist"].$get({
        query: { page: page.toString(), limit: limit.toString() },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch saved jobs");
      }

      return await response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

