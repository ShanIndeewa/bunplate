import { getClient } from "@/lib/rpc/client";
import { useMutation } from "@tanstack/react-query";
import type { notificationInsertType } from "../schemas";

export const useCreateNotification = () => {
  return useMutation({
    mutationFn: async (data: notificationInsertType) => {
      const rpcClient = await getClient();

      const response = await rpcClient.api.notifications.$post({
        json: data,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create notification");
      }

      return response.json();
    },
  });
};
