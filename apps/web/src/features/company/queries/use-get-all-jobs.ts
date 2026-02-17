import { getClient } from "@/lib/rpc/client";
import { useQuery } from "@tanstack/react-query";

export interface JobFilterParams {
  page?: number;
  limit?: number;
  search?: string | null;
  sort?: "desc" | "asc" | undefined;
  companyId?: string | null;
  jobCategoryId?: string | null;
  type?: "full_time" | "part_time" | "contract" | "internship" | null;
  status?: "open" | "closed" | null;
  isRemote?: boolean | null;
}

export const useGetJobs = (params: JobFilterParams) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    sort = "desc",
    companyId = null,
    jobCategoryId = null,
    type = null,
    status = null,
    isRemote = null,
  } = params;

  return useQuery({
    queryKey: [
      "jobs",
      {
        page,
        limit,
        search,
        sort,
        companyId,
        jobCategoryId,
        type,
        status,
        isRemote,
      },
    ],
    queryFn: async () => {
      const rpcClient = await getClient();

      const jobsRes = await rpcClient.api.jobs.$get({
        query: {
          page: String(page),
          limit: String(limit),
          search: search || undefined,
          sort: sort || undefined,
          companyId: companyId || undefined,
          jobCategoryId: jobCategoryId || undefined,
          type: type || undefined,
          status: status || undefined,
          isRemote: isRemote !== null ? String(isRemote) : undefined,
        },
      });

      if (!jobsRes.ok) {
        const errorData = await jobsRes.json();
        throw new Error(errorData.message || "Failed to fetch jobs");
      }

      const json = await jobsRes.json();
      // ✅ Fix: handle both array and wrapped { data }
      return Array.isArray(json) ? json : json.data || [];
    },
  });
};
