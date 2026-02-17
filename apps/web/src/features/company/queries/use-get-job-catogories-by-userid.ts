// src/features/jobcategories/queries/use-get-job-categories-by-userid.ts
import { getClient } from "@/lib/rpc/client";
import { useQuery } from "@tanstack/react-query";
import type { JobCategory } from "../schemas/jobCategory.schema";

interface JobCategoriesResponse {
  data: JobCategory[];
  meta: {
    totalCount: number;
    limit: number;
    currentPage: number;
    totalPages: number;
  };
}

export const useGetJobCategoriesByUserId = () => {
  return useQuery<JobCategory[], Error>({
    queryKey: ["job-categories"],
    queryFn: async () => {
      const rpcClient = await getClient();
      const res = await rpcClient.api.jobcategory.$get();

      if (!res.ok) {
        const msg = await safeErrorMessage(res);
        throw new Error(msg || "Failed to fetch job categories");
      }

      const json: unknown = await res.json();

      if (json && typeof json === "object" && "data" in json) {
        return (json as JobCategoriesResponse).data;
      }

      throw new Error("Unexpected response fetching job categories");
    },
  });
};

async function safeErrorMessage(res: Response): Promise<string | undefined> {
  try {
    const data = await res.json();
    if (typeof (data as any)?.message === "string")
      return (data as any).message;
    if (typeof (data as any)?.error === "string") return (data as any).error;
    if (typeof data === "string") return data;
  } catch {
    try {
      const text = await res.text();
      if (text) return text;
    } catch {}
  }
  return undefined;
}
