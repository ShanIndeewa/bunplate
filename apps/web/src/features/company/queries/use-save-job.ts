"use client";

import { getClient } from "@/lib/rpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useId } from "react";
import { toast } from "sonner";

export interface SaveJobData {
  jobId: string;
  organizationId?: string | null;
  jobStatus?: string;
  isApplied?: boolean;
}

export const useSaveJob = () => {
  const queryClient = useQueryClient();
  const toastId = useId();

  return useMutation({
    mutationFn: async (data: SaveJobData) => {
      const rpcClient = await getClient();

      const response = await rpcClient.api["job-wishlist"].$post({
        json: data,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save job");
      }

      return await response.json();
    },
    onMutate: () => {
      toast.loading("Saving job...", { id: toastId });
    },
    onSuccess: () => {
      toast.success("Job saved successfully!", { id: toastId });
      queryClient.invalidateQueries({ queryKey: ["user-saved-jobs"] });
      queryClient.invalidateQueries({ queryKey: ["job-save-status"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to save job", { id: toastId });
    },
  });
};

export const useUnsaveJob = () => {
  const queryClient = useQueryClient();
  const toastId = useId();

  return useMutation({
    mutationFn: async (wishlistId: string) => {
      const rpcClient = await getClient();

      const response = await rpcClient.api["job-wishlist"][":id"].$delete({
        param: { id: wishlistId },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to unsave job");
      }

      return await response.json();
    },
    onMutate: () => {
      toast.loading("Removing from saved jobs...", { id: toastId });
    },
    onSuccess: () => {
      toast.success("Job removed from saved jobs!", { id: toastId });
      queryClient.invalidateQueries({ queryKey: ["user-saved-jobs"] });
      queryClient.invalidateQueries({ queryKey: ["job-save-status"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to remove job", { id: toastId });
    },
  });
};




