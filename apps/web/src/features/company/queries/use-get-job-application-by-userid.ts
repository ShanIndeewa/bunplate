import { getClient } from "@/lib/rpc/client";
import { useQuery } from "@tanstack/react-query";

export interface JobApplication {
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

  /** Optional related user fields after enrichment */
  user?: {
    id: string;
    name?: string | null;
    email?: string | null;
  } | null;
}

type Paginated<T> = { data: T[]; meta?: unknown };
const hasDataArray = <T>(v: any): v is Paginated<T> =>
  v && typeof v === "object" && Array.isArray(v.data);

type Filters = {
  userId?: string; // if omitted, backend should use session user
  status?: JobApplication["status"];
  jobId?: string;
  roundNo?: number;
};

type Options = {
  /** If true, fetch related user name & email and merge into each item */
  includeUser?: boolean;
};

export const useGetJobApplications = (
  filters: Filters = {},
  options: Options = { includeUser: false }
) => {
  return useQuery<JobApplication[]>({
    queryKey: ["job-applications", filters, options],
    queryFn: async () => {
      const rpcClient = await getClient();

      // 1) Fetch applications
      const res = await rpcClient.api.jobapplication.$get({
        query: {
          ...(filters.userId ? { userId: filters.userId } : {}),
          ...(filters.status ? { status: filters.status } : {}),
          ...(filters.jobId ? { jobId: filters.jobId } : {}),
          ...(typeof filters.roundNo === "number"
            ? { roundNo: filters.roundNo }
            : {}),
        },
      });

      if (!res.ok) throw new Error("Failed to fetch job applications");

      const json: unknown = await res.json();

      let apps: JobApplication[] = [];
      if (hasDataArray<JobApplication>(json)) apps = json.data;
      else if (Array.isArray(json)) apps = json as JobApplication[];
      else if (Array.isArray((json as any)?.applications))
        apps = (json as any).applications as JobApplication[];
      else if (json && typeof json === "object")
        apps = [json as JobApplication];
      else apps = [];

      // 2) Optionally batch fetch related users and merge
      if (options.includeUser && apps.length) {
        // Collect unique userIds (excluding null/undefined to be safe)
        const userIds = Array.from(
          new Set(apps.map((a) => a.userId).filter(Boolean))
        );

        if (userIds.length) {
          // IMPORTANT: adjust this endpoint/shape to your actual users API.
          // Common patterns:
          //   - /api/users?ids=<comma-separated>
          //   - /api/users/batch  with { ids: [...] } POST
          const usersRes = await rpcClient.api.userlist.$get({
            query: { ids: userIds.join(",") }, // change if your API expects another format
          });

          if (!usersRes.ok) {
            // don't fail the whole call just because enrichment failed
            console.warn("Failed to fetch related users for job applications");
            return apps;
          }

          const usersJson = (await usersRes.json()) as
            | {
                data?: Array<{
                  id: string;
                  name?: string | null;
                  email?: string | null;
                }>;
              }
            | Array<{
                id: string;
                name?: string | null;
                email?: string | null;
              }>;

          const usersArr = Array.isArray(usersJson)
            ? usersJson
            : Array.isArray(usersJson?.data)
              ? usersJson.data
              : [];

          const byId = new Map(usersArr.map((u) => [u.id, u]));

          apps = apps.map((app) => {
            const u = byId.get(app.userId);
            return u
              ? {
                  ...app,
                  user: {
                    id: u.id,
                    name: u.name ?? null,
                    email: u.email ?? null,
                  },
                }
              : app;
          });
        }
      }

      return apps;
    },
  });
};
