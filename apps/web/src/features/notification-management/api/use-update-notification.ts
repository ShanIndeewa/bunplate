import { getClient } from "@/lib/rpc/client";
import { useMutation } from "@tanstack/react-query";
import type { notificationUpdateType } from "../schemas";

export const useUpdateNotification = () => {
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: notificationUpdateType;
    }) => {
      const rpcClient = await getClient();

      const response = await rpcClient.api.notifications[":id"].$patch({
        param: { id },
        json: data,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update notification");
      }

      return response.json();
    },
  });
};
