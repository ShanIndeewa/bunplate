import { getClient } from "@/lib/rpc/client";
import { useQuery } from "@tanstack/react-query";

export const useGetNotification = (id: string) => {
  return useQuery({
    queryKey: ["notification", id],
    queryFn: async () => {
      const rpcClient = await getClient();

      const response = await rpcClient.api.notifications[":id"].$get({
        param: { id },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch notification");
      }

      return response.json();
    },
    enabled: !!id,
  });
};
