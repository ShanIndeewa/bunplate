// src/features/users/queries/use-get-user-count.ts
import { getClient } from "@/lib/rpc/client";
import { useQuery } from "@tanstack/react-query";

export const useGetUserCount = () => {
  return useQuery<number>({
    queryKey: ["users", "count"],
    queryFn: async () => {
      const rpc = await getClient();
      // Assuming this router mounts at /api/user
      const res = await rpc.api.userlist.count.$get();
      if (!res.ok) throw new Error("Failed to fetch user count");

      const json: unknown = await res.json();

      // Accept a few shapes just in case
      if (typeof json === "number") return json;
      if (json && typeof (json as any).count === "number")
        return (json as any).count;
      if (json && typeof (json as any).data?.count === "number")
        return (json as any).data.count;

      throw new Error("Unexpected response shape for user count");
    },
  });
};
