"use client";

import { getClient } from "@/lib/rpc/client";
import { useQuery } from "@tanstack/react-query";

export interface AppliedJob {
  id: string;
  jobId: string;
  status: string;
  submittedAt: string;
  createdAt: string;
  updatedAt: string;
  applicantProfile?: {
    fullName?: string;
    email?: string;
    phone?: string;
    address?: string;
    linkedin?: string;
    portfolio?: string;
  };
  coverLetterText?: string;
  source?: string;
  referralCode?: string;
  tags?: string[];
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

export interface AppliedJobsResponse {
  data: AppliedJob[];
  meta: {
    totalCount: number;
    limit: number;
    currentPage: number;
    totalPages: number;
  };
}

export const useGetUserAppliedJobs = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["user-applied-jobs", page, limit],
    queryFn: async (): Promise<AppliedJobsResponse> => {
      const rpcClient = await getClient();

      const response = await rpcClient.api.jobapplication.$get({
        query: { page: page.toString(), limit: limit.toString() },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch applied jobs");
      }

      return await response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
