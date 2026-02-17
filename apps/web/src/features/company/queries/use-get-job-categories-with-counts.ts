// src/features/company/queries/use-get-job-categories-with-counts.ts
import { getClient } from "@/lib/rpc/client";
import { useQuery } from "@tanstack/react-query";

// Job category type enum from the schema
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

export interface JobCategoryWithCount {
  type: JobCategoryType;
  keyword: string;
  jobCount: number;
}

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

/** Hook to fetch job categories with job counts */
export const useGetJobCategoriesWithCounts = () => {
  return useQuery<JobCategoryWithCount[], Error>({
    queryKey: ["job-categories", "with-counts"],
    queryFn: async () => {
      const rpcClient = await getClient();

      // First, get all jobs to count by category type
      const jobsRes = await rpcClient.api.jobs.$get({
        query: { page: "1", limit: "1000" } // Get all jobs
      });

      if (!jobsRes.ok) {
        const msg = await safeErrorMessage(jobsRes);
        throw new Error(msg || "Failed to fetch jobs");
      }

      const jobsJson: unknown = await jobsRes.json();
      let jobs: any[] = [];

      if (hasDataObject<any[]>(jobsJson)) {
        jobs = jobsJson.data;
      } else if (Array.isArray(jobsJson)) {
        jobs = jobsJson;
      } else {
        throw new Error("Unexpected response fetching jobs");
      }

      // Count jobs by category type
      const categoryCounts: Record<string, number> = {};
      const categoryKeywords: Record<string, string> = {};

      jobs.forEach((job) => {
        if (job.jobCategory?.type) {
          const categoryType = job.jobCategory.type;
          categoryCounts[categoryType] = (categoryCounts[categoryType] || 0) + 1;
          categoryKeywords[categoryType] = job.jobCategory.keyword || categoryType;
        }
      });

      // Create the result array with all possible category types
      const allCategoryTypes: JobCategoryType[] = [
        "Technology",
        "Design",
        "Marketing",
        "Healthcare",
        "Education",
        "Finance",
        "Hospitality",
        "Transportation",
        "Retail",
        "Engineering"
      ];

      const categoriesWithCounts: JobCategoryWithCount[] = allCategoryTypes.map((type) => ({
        type,
        keyword: categoryKeywords[type] || type,
        jobCount: categoryCounts[type] || 0,
      }));

      // Return all categories, including those with 0 jobs
      return categoriesWithCounts;
    },
  });
};
