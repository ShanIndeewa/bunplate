"use client";

import { getClient } from "@/lib/rpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useId } from "react";
import { toast } from "sonner";

export interface JobApplicationInsert {
  jobId: string;
  coverLetterText?: string | null;
  source?: string | null;
  referralCode?: string | null;
  tags?: string[] | null;
  applicantProfile?: {
    fullName?: string;
    email?: string;
    phone?: string;
    address?: string;
    linkedin?: string;
    portfolio?: string;
  } | null;
  mediaId?: string | null;
}

export const useCreateJobApplication = () => {
  const queryClient = useQueryClient();
  const toastId = useId();

  return useMutation({
    mutationFn: async (values: JobApplicationInsert) => {
      const rpcClient = await getClient();

      const response = await rpcClient.api.jobapplication.$post({
        json: values,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create job application");
      }

      const data = await response.json();
      return data;
    },
    onMutate: () => {
      toast.loading("Submitting your application...", { id: toastId });
    },
    onSuccess: () => {
      toast.success("Application submitted successfully!", { id: toastId });
      queryClient.invalidateQueries({ queryKey: ["job-applications"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to submit application", { id: toastId });
    },
  });
};


