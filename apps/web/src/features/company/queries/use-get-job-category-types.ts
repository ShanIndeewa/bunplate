// src/features/company/queries/use-get-job-category-types.ts
import { getClient } from "@/lib/rpc/client";
import { useQuery } from "@tanstack/react-query";

export type JobCategoryType =
  | "Technology"
  | "Design"
  | "Marketing"
  | "Healthcare"
  | "Education"
  | "Finance"
  | "Hospitality"
  | "Transportation"
  | "Retail"
  | "Engineering";

export const useGetJobCategoryTypes = () => {
  return useQuery<JobCategoryType[], Error>({
    queryKey: ["job-category-types"],
    queryFn: async () => {
      const rpcClient = await getClient();
      const res = await rpcClient.api.jobcategory.types.$get();

      if (!res.ok) {
        const msg = await safeErrorMessage(res);
        throw new Error(msg || "Failed to fetch job category types");
      }

      const json: unknown = await res.json();

      if (Array.isArray(json)) {
        return json as JobCategoryType[];
      }

      throw new Error("Unexpected response fetching job category types");
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
