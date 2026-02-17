import { getClient } from "@/lib/rpc/client";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { job, Job } from "../schemas/compny.jobs.scheam";

interface JobsResponse {
  data: any[];
  meta: {
    totalCount: number;
    limit: number;
    currentPage: number;
    totalPages: number;
  };
}

export const useGetJobsByCompanyId = (companyId: string) => {
  return useQuery<Job[], Error>({
    queryKey: ["jobs", companyId],
    queryFn: async () => {
      const rpcClient = await getClient();
      const res = await rpcClient.api.jobs.company[companyId].$get();

      if (!res.ok) {
        const msg = await res
          .json()
          .then((d: any) => d.message || "Failed to fetch jobs");
        throw new Error(msg);
      }

      const json: JobsResponse = await res.json();

      // Map numeric and array fields to match schema
      const jobsArray = json.data.map((j: any) => ({
        ...j,
        salaryMin: j.salaryMin !== null ? Number(j.salaryMin) : null,
        salaryMax: j.salaryMax !== null ? Number(j.salaryMax) : null,
        skills: j.skills
          ? Array.isArray(j.skills)
            ? j.skills
            : [j.skills]
          : [],
      }));

      const parsed = z.array(job).safeParse(jobsArray);

      if (!parsed.success) {
        console.error(parsed.error.format());
        throw new Error("Invalid job data received from server");
      }

      return parsed.data;
    },
    enabled: !!companyId,
  });
};
