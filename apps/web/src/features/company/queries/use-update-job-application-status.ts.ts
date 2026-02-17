"use client";

import { getClient } from "@/lib/rpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Vars = {
  id: string;
  status:
    | "draft"
    | "submitted"
    | "under_review"
    | "shortlisted"
    | "interview_scheduled"
    | "offer_extended"
    | "hired"
    | "rejected"
    | "withdrawn";
};

export function useUpdateJobApplicationStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: Vars) => {
      const rpc = await getClient();

      // Adjust this to match your API routes.
      // Common options:
      //  - rpc.api.jobapplication[":id"].$patch({ param: { id }, json: { status } })
      //  - rpc.api.jobapplication.$patch({ json: { id, status } })
      //  - rpc.api.jobapplication[":id"].$put({ param: { id }, json: { status } })
      const res = await rpc.api.jobapplication[":id"].$patch({
        param: { id },
        json: { status },
      });

      if (!res.ok) throw new Error("Failed to update application status");
      // If your API returns the updated record, parse it here if needed.
      return { id, status };
    },

    // Optimistically update every cached "job-applications" query
    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: ["job-applications"] });

      const snapshots = queryClient.getQueriesData<any>({
        queryKey: ["job-applications"],
      });

      snapshots.forEach(([key, data]) => {
        if (!Array.isArray(data)) return;
        const next = data.map((app) =>
          app.id === id ? { ...app, status } : app
        );
        queryClient.setQueryData(key, next);
      });

      return { snapshots };
    },

    onError: (_err, _vars, ctx) => {
      // Roll back optimistic updates
      ctx?.snapshots?.forEach?.(([key, data]) => {
        queryClient.setQueryData(key, data);
      });
    },

    onSettled: () => {
      // Ensure we're eventually consistent with the server
      queryClient.invalidateQueries({ queryKey: ["job-applications"] });
    },
  });
}
