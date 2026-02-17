import { getClient } from "@/lib/rpc/client";
import { useQuery } from "@tanstack/react-query";

export interface JobApplicationDetails {
  id: string;
  organizationId?: string | null;
  userId: string;
  jobId: string;
  roundNo: number;
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
  mediaId?: string | null;
  coverLetterText?: string | null;
  source?: string | null;
  referralCode?: string | null;
  tags?: unknown | null;
  submittedAt?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;

  /** Related user fields */
  user?: {
    id: string;
    name?: string | null;
    email?: string | null;
  } | null;

  /** Related job fields */
  job?: {
    id: string;
    title?: string | null;
    description?: string | null;
    location?: string | null;
    salaryMin?: number | null;
    salaryMax?: number | null;
    employmentType?: string | null;
  } | null;
}

export const useGetJobApplicationById = (applicationId: string) => {
  return useQuery<JobApplicationDetails>({
    queryKey: ["job-application", applicationId],
    queryFn: async () => {
      const rpcClient = await getClient();

      // Fetch the specific job application
      const res = await rpcClient.api.jobapplication.$get({
        query: {
          id: applicationId,
          includeUser: true,
          includeJob: true,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch job application");
      }

      const json = await res.json();

      // Handle different response formats
      let application: JobApplicationDetails;
      if (Array.isArray(json)) {
        application = json[0] as JobApplicationDetails;
      } else if (json && typeof json === "object") {
        application = json as JobApplicationDetails;
      } else {
        throw new Error("Invalid response format");
      }

      return application;
    },
    enabled: !!applicationId,
  });
};
