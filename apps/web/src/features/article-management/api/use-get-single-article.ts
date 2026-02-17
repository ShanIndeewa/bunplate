import { getClient } from "@/lib/rpc/client";
import { useQuery } from "@tanstack/react-query";

export const useGetArticle = (id: string) => {
  return useQuery({
    queryKey: ["article", id],
    queryFn: async () => {
      const rpcClient = await getClient();

      const response = await rpcClient.api.article[":id"].$get({
        param: { id },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch article");
      }

      return response.json();
    },
    enabled: !!id,
  });
};
