import { getClient } from "@/lib/rpc/client";
import { useQuery } from "@tanstack/react-query";

type JobResponse = {
  companyId?: string | null;
  company?: Company | null;
};
export type Company = {
  id: string;
  name?: string;
  description?: string;
  email?: string;
  phone?: string;
  website?: string;
  logoUrl?: string;
  city?: string;
  country?: string;
  employeeCount?: number;
};

export const useGetCompanyByJobId = (jobId: string | null) =>
  useQuery<Company | null>({
    queryKey: ["company-by-job", jobId],
    enabled: Boolean(jobId),
    staleTime: 60_000,
    gcTime: 300_000,
    retry: 1,
    queryFn: async () => {
      if (!jobId) return null;
      const rpcClient = await getClient();

      // ✅ Fetch job by ID
      const jobRes = await rpcClient.api.jobs[":id"].$get({
        param: { id: jobId },
      });
      if (!jobRes.ok) throw new Error("Failed to fetch job");
      const job: JobResponse = await jobRes.json();

      // ✅ Return company directly if present
      if (job?.company) return job.company;

      // fallback: fetch company by id if only `companyId` exists
      if (job?.companyId) {
        const companyRes = await rpcClient.api.companies[":id"].$get({
          param: { id: String(job.companyId) },
        });
        if (!companyRes.ok) throw new Error("Failed to fetch company");
        const company: Company = await companyRes.json();
        return company ?? null;
      }

      return null;
    },
  });
