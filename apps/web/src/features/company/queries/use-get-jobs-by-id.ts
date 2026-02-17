import { getClient } from "@/lib/rpc/client";
import { useQuery } from "@tanstack/react-query";

export const useGetJobById = (jobId: string) => {
  return useQuery({
    queryKey: ["job", jobId],
    queryFn: async () => {
      if (!jobId) throw new Error("Job ID is required");

      const rpcClient = await getClient();
      const res = await rpcClient.api.jobs[jobId].$get();

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch job");
      }

      const json = await res.json();
      return json.data || json; // handle { data } wrapper or plain object
    },
    enabled: Boolean(jobId), // don't run query if jobId is empty
  });
};
