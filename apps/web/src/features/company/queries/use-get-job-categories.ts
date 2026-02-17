// src/features/jobcategories/queries/use-get-all-job-categories.ts
import { getClient } from "@/lib/rpc/client";
import { useQuery } from "@tanstack/react-query";
import type { JobCategory } from "../schemas/jobCategory.schema"; // reuse type

/** Type guard for { data: T } */
function hasDataObject<T = unknown>(v: any): v is { data: T } {
  return (
    v && typeof v === "object" && "data" in v && typeof v.data !== "undefined"
  );
}

/** Extracts error message safely from Response */
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

/** Hook to fetch all job categories */
export const useGetAllJobCategories = () => {
  return useQuery<JobCategory[], Error>({
    queryKey: ["job-categories", "all"],
    queryFn: async () => {
      const rpcClient = await getClient();
      const res = await rpcClient.api.jobcategory.all.$get();

      if (!res.ok) {
        const msg = await safeErrorMessage(res);
        throw new Error(msg || "Failed to fetch job categories");
      }

      const json: unknown = await res.json();

      if (hasDataObject<JobCategory[]>(json)) return json.data;
      if (Array.isArray(json)) return json as JobCategory[];

      throw new Error("Unexpected response fetching job categories");
    },
  });
};
