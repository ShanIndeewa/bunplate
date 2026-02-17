// src/features/jobcategories/mutations/use-create-job-category.ts
import { getClient } from "@/lib/rpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface JobCategory {
  id: string;
  userId: string;
  keyword: string;
  description?: string | null;
  type: "Technology" | "Design" | "Marketing" | "Healthcare" | "Education" | "Finance" | "Hospitality" | "Transportation" | "Retail" | "Engineering";
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateJobCategoryInput {
  keyword: string; // session-bound on server; userId no longer needed
  description?: string | null;
  type: "Technology" | "Design" | "Marketing" | "Healthcare" | "Education" | "Finance" | "Hospitality" | "Transportation" | "Retail" | "Engineering";
}

/** Type guard for { data: T } */
function hasDataObject<T = unknown>(v: any): v is { data: T } {
  return (
    v && typeof v === "object" && "data" in v && typeof v.data === "object"
  );
}

export const useCreateJobCategory = () => {
  const qc = useQueryClient();

  return useMutation<JobCategory, Error, CreateJobCategoryInput>({
    mutationFn: async (payload) => {
      const rpcClient = await getClient();

      // server will read userId from session middleware
      const res = await rpcClient.api.jobcategory.$post({ json: payload });

      if (!res.ok) {
        const msg = await safeErrorMessage(res);
        throw new Error(msg || "Failed to create job category");
      }

      const json: unknown = await res.json();

      if (hasDataObject<JobCategory>(json)) return json.data as JobCategory;
      if (json && typeof json === "object") return json as JobCategory;

      throw new Error("Unexpected response creating job category");
    },
    onSuccess: (created) => {
      qc.invalidateQueries({ queryKey: ["job-categories"] });
      qc.setQueryData<JobCategory[]>(["job-categories"], (prev) =>
        prev ? [created, ...prev] : [created]
      );
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
