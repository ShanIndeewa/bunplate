//dark theme
// "use client";

// import { ResponsivePie } from "@nivo/pie";
// import { useMemo } from "react";

// // Data hooks
// import { useGetCompanies } from "@/features/company/queries/use-get-all-companies";
// import { useGetJobs } from "@/features/company/queries/use-get-all-jobs";
// import { useGetJobApplications } from "@/features/company/queries/use-get-job-application-by-userid";
// import { useGetUserCount } from "@/features/company/queries/use-get-user-count";

// // UI
// import { Badge } from "@/components/ui/badge";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Skeleton } from "@/components/ui/skeleton";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   BriefcaseIcon,
//   Building2,
//   Calendar,
//   TrendingUp,
//   Users,
// } from "lucide-react";

// /**
//  * -----------------------
//  * Types & Helpers
//  * -----------------------
//  */

// interface CompanyItem {
//   id: string | number;
//   name?: string;
//   city?: string;
//   street?: string;
//   phone?: string;
//   email?: string;
// }

// interface JobApplicationItem {
//   id: string | number;
//   status: string;
//   submittedAt?: string | null;
//   user?: { name?: string | null } | null;
// }

// function unwrapApi<T>(input: unknown): { list: T[]; total: number } {
//   const root: any = (input as any)?.data ?? input;
//   let list: T[] = [];
//   if (Array.isArray(root)) list = root as T[];
//   else if (Array.isArray(root?.data)) list = root.data as T[];
//   const total = (root?.meta?.totalCount as number | undefined) ?? list.length;
//   return { list, total };
// }

// const STATUS_COLORS: Record<string, string> = {
//   draft: "#94a3b8",
//   submitted: "#3b82f6",
//   under_review: "#f59e0b",
//   shortlisted: "#10b981",
//   interview_scheduled: "#8b5cf6",
//   offer_extended: "#06b6d4",
//   hired: "#22c55e",
//   rejected: "#ef4444",
//   withdrawn: "#6b7280",
// };

// const STATUS_BADGE: Record<
//   string,
//   "default" | "secondary" | "destructive" | "outline"
// > = {
//   draft: "outline",
//   submitted: "default",
//   under_review: "secondary",
//   shortlisted: "default",
//   interview_scheduled: "secondary",
//   offer_extended: "default",
//   hired: "default",
//   rejected: "destructive",
//   withdrawn: "outline",
// };

// function statusToLabel(s: string): string {
//   return s
//     .split("_")
//     .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
//     .join(" ");
// }

// type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

// function StatCard({
//   title,
//   value,
//   loading,
//   subtitle,
//   Icon,
//   gradient,
//   textTint,
// }: {
//   title: string;
//   value: number | string;
//   loading?: boolean;
//   subtitle?: string;
//   Icon: IconType;
//   gradient: string;
//   textTint: string;
// }) {
//   return (
//     <Card
//       className={`relative overflow-hidden border-0 shadow-lg bg-gradient-to-br ${gradient} text-white`}
//     >
//       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//         <CardTitle className={`text-sm font-medium ${textTint}`}>
//           {title}
//         </CardTitle>
//         <div className="p-2 bg-white/20 rounded-lg">
//           <Icon className="h-4 w-4" />
//         </div>
//       </CardHeader>
//       <CardContent>
//         {loading ? (
//           <Skeleton className="h-8 w-16 bg-white/20" />
//         ) : (
//           <div className="text-3xl font-bold">{value}</div>
//         )}
//         {subtitle ? (
//           <p className={`text-xs ${textTint} flex items-center gap-1 mt-1`}>
//             <TrendingUp className="h-3 w-3" />
//             {subtitle}
//           </p>
//         ) : null}
//       </CardContent>
//     </Card>
//   );
// }

// /**
//  * -----------------------
//  * Page
//  * -----------------------
//  */
// export default function DashboardPage() {
//   const { data: companiesData, isLoading: companiesLoading } = useGetCompanies({
//     page: 1,
//     limit: 5,
//     sort: "desc",
//   });

//   const { data: jobsData, isLoading: jobsLoading } = useGetJobs({
//     page: 1,
//     limit: 5,
//     sort: "desc",
//   });

//   const { data: userCount, isLoading: userCountLoading } = useGetUserCount();
//   const { data: jobApplicationsData, isLoading: applicationsLoading } =
//     useGetJobApplications({}, { includeUser: true });

//   const companies = useMemo(
//     () => unwrapApi<CompanyItem>(companiesData),
//     [companiesData]
//   );
//   const jobs = useMemo(() => unwrapApi<unknown>(jobsData), [jobsData]);

//   const recentApplications = useMemo(() => {
//     const apps =
//       (jobApplicationsData as JobApplicationItem[] | undefined) ?? [];
//     return [...apps]
//       .sort((a, b) => {
//         const aTime = a?.submittedAt ? new Date(a.submittedAt).getTime() : 0;
//         const bTime = b?.submittedAt ? new Date(b.submittedAt).getTime() : 0;
//         return bTime - aTime;
//       })
//       .slice(0, 5);
//   }, [jobApplicationsData]);

//   const applicationStatusData = useMemo(() => {
//     const apps =
//       (jobApplicationsData as JobApplicationItem[] | undefined) ?? [];
//     if (!apps.length) return [];

//     const counts: Record<string, number> = {};
//     for (const a of apps) counts[a.status] = (counts[a.status] || 0) + 1;

//     return Object.entries(counts).map(([status, value]) => ({
//       id: status,
//       label: statusToLabel(status),
//       value,
//       color: STATUS_COLORS[status] || "#64748b",
//     }));
//   }, [jobApplicationsData]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
//       <div className="p-6 space-y-8">
//         <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
//           Dashboard Overview
//         </h1>
//         <p className="text-slate-600 dark:text-slate-400">
//           Monitor your job management platform performance and key metrics
//         </p>

//         {/* Stats */}
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
//           <StatCard
//             title="Total Companies"
//             value={companies.total}
//             loading={companiesLoading}
//             subtitle="Active companies listed"
//             Icon={Building2}
//             gradient="from-blue-500 to-blue-600"
//             textTint="text-blue-100"
//           />
//           <StatCard
//             title="Total Jobs"
//             value={jobs.total}
//             loading={jobsLoading}
//             subtitle="Available jobs"
//             Icon={BriefcaseIcon}
//             gradient="from-emerald-500 to-emerald-600"
//             textTint="text-emerald-100"
//           />
//           <StatCard
//             title="Total Users"
//             value={(userCount as number) ?? 0}
//             loading={userCountLoading}
//             subtitle="Registered platform users"
//             Icon={Users}
//             gradient="from-purple-500 to-purple-600"
//             textTint="text-purple-100"
//           />
//           <StatCard
//             title="Applications"
//             value={
//               (jobApplicationsData as JobApplicationItem[] | undefined)
//                 ?.length ?? 0
//             }
//             loading={applicationsLoading}
//             subtitle="Total job applications"
//             Icon={Calendar}
//             gradient="from-orange-500 to-orange-600"
//             textTint="text-orange-100"
//           />
//         </div>

//         {/* Charts & Lists */}
//         <div className="grid gap-6 lg:grid-cols-2">
//           {/* Application Status Pie Chart */}
//           <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
//             <CardHeader className="pb-4">
//               <CardTitle className="text-xl font-semibold text-slate-900 dark:text-slate-100">
//                 Application Status Distribution
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="h-[350px]">
//               {applicationsLoading ? (
//                 <div className="flex items-center justify-center h-full">
//                   <Skeleton className="h-64 w-64 rounded-full" />
//                 </div>
//               ) : applicationStatusData.length ? (
//                 <ResponsivePie
//                   data={applicationStatusData}
//                   margin={{ top: 20, right: 80, bottom: 20, left: 80 }}
//                   innerRadius={0.6}
//                   padAngle={1}
//                   cornerRadius={4}
//                   activeOuterRadiusOffset={8}
//                   colors={{ datum: "data.color" }}
//                   borderWidth={2}
//                   borderColor={{ from: "color", modifiers: [["darker", 0.3]] }}
//                   enableArcLinkLabels
//                   arcLinkLabelsSkipAngle={10}
//                   arcLinkLabelsTextColor="#374151"
//                   arcLinkLabelsThickness={2}
//                   arcLabelsSkipAngle={10}
//                   arcLabelsTextColor={{
//                     from: "color",
//                     modifiers: [["darker", 2]],
//                   }}
//                   theme={{ text: { fontSize: 12, fill: "#374151" } }}
//                 />
//               ) : (
//                 <div className="h-full flex items-center justify-center text-slate-500 dark:text-slate-400">
//                   No applications yet
//                 </div>
//               )}
//             </CardContent>
//           </Card>

//           {/* Recent Applications Table */}
//           <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
//             <CardHeader className="pb-4">
//               <CardTitle className="text-xl font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
//                 Recent Applications
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               {applicationsLoading ? (
//                 <div className="space-y-3">
//                   {Array.from({ length: 5 }).map((_, i) => (
//                     <div key={i} className="flex items-center space-x-4">
//                       <Skeleton className="h-4 w-24" />
//                       <Skeleton className="h-4 w-16" />
//                       <Skeleton className="h-4 w-20" />
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <Table>
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead>Applicant</TableHead>
//                       <TableHead>Status</TableHead>
//                       <TableHead>Submitted</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {recentApplications.map((app) => (
//                       <TableRow key={app.id}>
//                         <TableCell>{app.user?.name || "Anonymous"}</TableCell>
//                         <TableCell>
//                           <Badge
//                             variant={STATUS_BADGE[app.status] ?? "outline"}
//                           >
//                             {statusToLabel(app.status)}
//                           </Badge>
//                         </TableCell>
//                         <TableCell>
//                           {app.submittedAt
//                             ? new Date(app.submittedAt).toLocaleDateString(
//                                 "en-US",
//                                 {
//                                   month: "short",
//                                   day: "numeric",
//                                   year: "numeric",
//                                 }
//                               )
//                             : "N/A"}
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               )}
//             </CardContent>
//           </Card>
//         </div>

//         {/* Recent Companies Table */}
//         <Card className="border-0 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
//           <CardHeader className="pb-4">
//             <CardTitle className="text-xl font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
//               Recent Companies
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             {companiesLoading ? (
//               <div className="space-y-3">
//                 {Array.from({ length: 5 }).map((_, i) => (
//                   <div key={i} className="flex items-center space-x-4">
//                     <Skeleton className="h-4 w-32" />
//                     <Skeleton className="h-4 w-20" />
//                     <Skeleton className="h-4 w-24" />
//                     <Skeleton className="h-4 w-16" />
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Name</TableHead>
//                     <TableHead>City</TableHead>
//                     <TableHead>Street</TableHead>
//                     <TableHead>Contact</TableHead>
//                     <TableHead>Email</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {companies.list.map((company) => (
//                     <TableRow key={company.id}>
//                       <TableCell>{company.name}</TableCell>
//                       <TableCell>{company.city}</TableCell>
//                       <TableCell>{company.street}</TableCell>
//                       <TableCell>{company.phone}</TableCell>
//                       <TableCell>{company.email}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

"use client";

import { ResponsivePie } from "@nivo/pie";
import { useMemo } from "react";

// Data hooks
import { useGetCompanies } from "@/features/company/queries/use-get-all-companies";
import { useGetJobs } from "@/features/company/queries/use-get-all-jobs";
import { useGetJobApplications } from "@/features/company/queries/use-get-job-application-by-userid";
import { useGetUserCount } from "@/features/company/queries/use-get-user-count";

// UI
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BriefcaseIcon,
  Building2,
  Calendar,
  TrendingUp,
  Users,
} from "lucide-react";

interface CompanyItem {
  id: string | number;
  name?: string;
  city?: string;
  street?: string;
  phone?: string;
  email?: string;
}

interface JobApplicationItem {
  id: string | number;
  status: string;
  submittedAt?: string | null;
  user?: { name?: string | null } | null;
}

function unwrapApi<T>(input: unknown): { list: T[]; total: number } {
  const root: any = (input as any)?.data ?? input;
  let list: T[] = [];
  if (Array.isArray(root)) list = root as T[];
  else if (Array.isArray(root?.data)) list = root.data as T[];
  const total = (root?.meta?.totalCount as number | undefined) ?? list.length;
  return { list, total };
}

const STATUS_COLORS: Record<string, string> = {
  draft: "#94a3b8",
  submitted: "#3b82f6",
  under_review: "#f59e0b",
  shortlisted: "#10b981",
  interview_scheduled: "#8b5cf6",
  offer_extended: "#06b6d4",
  hired: "#22c55e",
  rejected: "#ef4444",
  withdrawn: "#6b7280",
};

const STATUS_BADGE: Record<
  string,
  "default" | "secondary" | "destructive" | "outline"
> = {
  draft: "outline",
  submitted: "default",
  under_review: "secondary",
  shortlisted: "default",
  interview_scheduled: "secondary",
  offer_extended: "default",
  hired: "default",
  rejected: "destructive",
  withdrawn: "outline",
};

function statusToLabel(s: string): string {
  return s
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

function StatCard({
  title,
  value,
  loading,
  subtitle,
  Icon,
  gradient,
  textTint,
}: {
  title: string;
  value: number | string;
  loading?: boolean;
  subtitle?: string;
  Icon: IconType;
  gradient: string;
  textTint: string;
}) {
  return (
    <Card
      className={`relative overflow-hidden border-0 shadow-lg bg-gradient-to-br ${gradient} text-white`}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={`text-sm font-medium ${textTint}`}>
          {title}
        </CardTitle>
        <div className="p-2 bg-white/20 rounded-lg">
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-8 w-16 bg-white/20" />
        ) : (
          <div className="text-3xl font-bold">{value}</div>
        )}
        {subtitle && (
          <p className={`text-xs ${textTint} flex items-center gap-1 mt-1`}>
            <TrendingUp className="h-3 w-3" />
            {subtitle}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const { data: companiesData, isLoading: companiesLoading } = useGetCompanies({
    page: 1,
    limit: 5,
    sort: "desc",
  });
  const { data: jobsData, isLoading: jobsLoading } = useGetJobs({
    page: 1,
    limit: 5,
    sort: "desc",
  });
  const { data: userCount, isLoading: userCountLoading } = useGetUserCount();
  const { data: jobApplicationsData, isLoading: applicationsLoading } =
    useGetJobApplications({}, { includeUser: true });

  const companies = useMemo(
    () => unwrapApi<CompanyItem>(companiesData),
    [companiesData]
  );
  const jobs = useMemo(() => unwrapApi<unknown>(jobsData), [jobsData]);

  const recentApplications = useMemo(() => {
    const apps =
      (jobApplicationsData as JobApplicationItem[] | undefined) ?? [];
    return [...apps]
      .sort(
        (a, b) =>
          (b.submittedAt ? new Date(b.submittedAt).getTime() : 0) -
          (a.submittedAt ? new Date(a.submittedAt).getTime() : 0)
      )
      .slice(0, 5);
  }, [jobApplicationsData]);

  const applicationStatusData = useMemo(() => {
    const apps =
      (jobApplicationsData as JobApplicationItem[] | undefined) ?? [];
    if (!apps.length) return [];
    const counts: Record<string, number> = {};
    for (const a of apps) counts[a.status] = (counts[a.status] || 0) + 1;
    return Object.entries(counts).map(([status, value]) => ({
      id: status,
      label: statusToLabel(status),
      value,
      color: STATUS_COLORS[status] || "#64748b",
    }));
  }, [jobApplicationsData]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="p-6 space-y-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Dashboard Overview
        </h1>
        <p className="text-slate-600">
          Monitor your job management platform performance and key metrics
        </p>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Companies"
            value={companies.total}
            loading={companiesLoading}
            subtitle="Active companies listed"
            Icon={Building2}
            gradient="from-blue-500 to-blue-600"
            textTint="text-blue-100"
          />
          <StatCard
            title="Total Jobs"
            value={jobs.total}
            loading={jobsLoading}
            subtitle="Available jobs"
            Icon={BriefcaseIcon}
            gradient="from-emerald-500 to-emerald-600"
            textTint="text-emerald-100"
          />
          <StatCard
            title="Total Users"
            value={(userCount as number) ?? 0}
            loading={userCountLoading}
            subtitle="Registered platform users"
            Icon={Users}
            gradient="from-purple-500 to-purple-600"
            textTint="text-purple-100"
          />
          <StatCard
            title="Applications"
            value={
              (jobApplicationsData as JobApplicationItem[] | undefined)
                ?.length ?? 0
            }
            loading={applicationsLoading}
            subtitle="Total job applications"
            Icon={Calendar}
            gradient="from-orange-500 to-orange-600"
            textTint="text-orange-100"
          />
        </div>

        {/* Charts & Lists */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Application Status Pie Chart */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold text-slate-900">
                Application Status Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[350px]">
              {applicationsLoading ? (
                <div className="flex items-center justify-center h-full">
                  <Skeleton className="h-64 w-64 rounded-full" />
                </div>
              ) : applicationStatusData.length ? (
                <ResponsivePie
                  data={applicationStatusData}
                  margin={{ top: 20, right: 80, bottom: 20, left: 80 }}
                  innerRadius={0.6}
                  padAngle={1}
                  cornerRadius={4}
                  activeOuterRadiusOffset={8}
                  colors={{ datum: "data.color" }}
                  borderWidth={2}
                  borderColor={{ from: "color", modifiers: [["darker", 0.3]] }}
                  enableArcLinkLabels
                  arcLinkLabelsSkipAngle={10}
                  arcLinkLabelsTextColor="#374151"
                  arcLinkLabelsThickness={2}
                  arcLabelsSkipAngle={10}
                  arcLabelsTextColor={{
                    from: "color",
                    modifiers: [["darker", 2]],
                  }}
                  theme={{ text: { fontSize: 12, fill: "#374151" } }}
                />
              ) : (
                <div className="h-full flex items-center justify-center text-slate-500">
                  No applications yet
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Applications Table */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                Recent Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              {applicationsLoading ? (
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  ))}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-200">
                      <TableHead className="text-slate-900 font-semibold">
                        Applicant
                      </TableHead>
                      <TableHead className="text-slate-900 font-semibold">
                        Status
                      </TableHead>
                      <TableHead className="text-slate-900 font-semibold">
                        Submitted
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentApplications.map((app) => (
                      <TableRow
                        key={app.id}
                        className="border-slate-100 hover:bg-slate-50"
                      >
                        <TableCell className="text-slate-900">
                          {app.user?.name || "Anonymous"}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={STATUS_BADGE[app.status] ?? "outline"}
                          >
                            {statusToLabel(app.status)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate-600">
                          {app.submittedAt
                            ? new Date(app.submittedAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )
                            : "N/A"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Companies Table */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold text-slate-900 flex items-center gap-2">
              Recent Companies
            </CardTitle>
          </CardHeader>
          <CardContent>
            {companiesLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                ))}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-200">
                    <TableHead className="text-slate-900 font-semibold">
                      Name
                    </TableHead>
                    <TableHead className="text-slate-900 font-semibold">
                      City
                    </TableHead>
                    <TableHead className="text-slate-900 font-semibold">
                      Street
                    </TableHead>
                    <TableHead className="text-slate-900 font-semibold">
                      Contact
                    </TableHead>
                    <TableHead className="text-slate-900 font-semibold">
                      Email
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {companies.list.map((company) => (
                    <TableRow
                      key={company.id}
                      className="border-slate-100 hover:bg-slate-50"
                    >
                      <TableCell className="text-slate-900">
                        {company.name}
                      </TableCell>
                      <TableCell className="text-slate-600 capitalize">
                        {company.city}
                      </TableCell>
                      <TableCell className="text-slate-600 capitalize">
                        {company.street}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {company.phone}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {company.email}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
