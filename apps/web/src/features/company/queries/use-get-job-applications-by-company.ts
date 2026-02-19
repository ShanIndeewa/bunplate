import { getClient } from "@/lib/rpc/client";
import type { JobApplication } from "core/database/schema";
import { useQuery } from "@tanstack/react-query";

// Extended type that includes user data
export interface JobApplicationWithUser extends JobApplication {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
  };
  job?: {
    id: string;
    title: string;
    description?: string | null;
    location?: string | null;
    employmentType?: string | null;
    salaryMin?: number | null;
    salaryMax?: number | null;
  };
}

export interface CompanyJobApplicationsResponse {
  data: JobApplicationWithUser[];
  meta: {
    totalCount: number;
    limit: number;
    currentPage: number;
    totalPages: number;
  };
}

export interface CompanyJobApplicationsFilters {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
  jobId?: string;
}

export const useGetJobApplicationsByCompany = (filters: CompanyJobApplicationsFilters = {}) => {
  const { page = 1, limit = 20, status, search, jobId } = filters;

  return useQuery<CompanyJobApplicationsResponse>({
    queryKey: ["company-job-applications", { page, limit, status, search, jobId }],
    queryFn: async () => {
      const rpcClient = await getClient();

      // Build query parameters
      const queryParams: Record<string, string> = {
        page: page.toString(),
        limit: limit.toString(),
      };

      if (status) {
        queryParams.status = status;
      }

      if (search) {
        queryParams.search = search;
      }

      if (jobId) {
        queryParams.jobId = jobId;
      }

      const response = await rpcClient.api.jobapplication.company.$get({
        query: queryParams,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch company job applications");
      }

      const result = await response.json();
      return result;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};
