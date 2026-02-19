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
  adminAction?: "admin_only" | "access_company";
}

export interface AllJobApplicationsResponse {
  data: JobApplicationWithUser[];
  meta: {
    totalCount: number;
    limit: number;
    currentPage: number;
    totalPages: number;
  };
}

export interface AllJobApplicationsFilters {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}

export const useGetAllJobApplications = (filters: AllJobApplicationsFilters = {}) => {
  const { page = 1, limit = 20, status, search } = filters;

  return useQuery<AllJobApplicationsResponse>({
    queryKey: ["all-job-applications", { page, limit, status, search }],
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

      const response = await rpcClient.api.jobapplication.all.$get({
        query: queryParams,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch all job applications");
      }

      const result = await response.json();
      return result;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};
