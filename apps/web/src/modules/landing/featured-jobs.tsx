"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import en from "@/app/languages/en.json";
import si from "@/app/languages/si.json";
import ta from "@/app/languages/ta.json";
import { useGetJobs } from "@/features/company/queries/use-get-all-jobs";
import { ArrowRight, Bookmark, Briefcase, Clock, FileText, Send, TrendingUp, Users } from "lucide-react";
import Link from "next/link";

type Props = {};

type Job = {
  id: string;
  title?: string;
  description?: string;
  location?: string;
  type?: string;
  status?: string;
  company?: { id: string; name: string; logo?: string };
  companyId?: string;
  closingDate?: string;
  requiresCV?: boolean;
};

export const FeaturedJobs = ({}: Props) => {
  const { lang } = useLanguage();
  const t = lang === "en" ? en.Home.featuredJobs : lang === "si" ? si.Home.featuredJobs : ta.Home.featuredJobs;

  // Fetch 6 jobs using the client-side hook
  const {
    data: jobs = [],
    isLoading,
    error,
  } = useGetJobs({
    page: 1,
    limit: 6,
    sort: "desc",
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-48 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !jobs.length) return <></>;

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-green-50 rounded-full -translate-y-36 translate-x-36"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-50 rounded-full translate-y-48 -translate-x-48"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <TrendingUp size={16} />
            {t.badge}
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            {t.title}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
              {t.titleHighlight}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t.description}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">2,500+</h3>
            <p className="text-gray-600">{t.stats.activeJobs}</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl">
            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">500+</h3>
            <p className="text-gray-600">{t.stats.hiringCompanies}</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-lime-50 to-green-50 rounded-2xl">
            <div className="w-16 h-16 bg-lime-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-lime-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">95%</h3>
            <p className="text-gray-600">{t.stats.successRate}</p>
          </div>
        </div>

        {/* Job Cards - 4-column Grid for better card display */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {jobs.map((job: Job) => (
              <JobCard key={job.id} job={job} t={t} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/job-search-page"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300"
          >
            {t.cta}
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

// JobCard component matching the image design
function JobCard({ job, t }: { job: Job; t: any }) {
  // Calculate days remaining
  const daysLeft = job.closingDate
    ? Math.max(
        0,
        Math.ceil(
          (new Date(job.closingDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
        )
      )
    : 0;

  return (
    <Link href={`/jobs/${job.id}`}>
      <div className="group relative bg-white rounded-lg border border-gray-200 cursor-pointer hover:-translate-y-2 transition-all duration-300 overflow-hidden h-48 hover:border-green-200">
        {/* Green gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/0 to-emerald-50/0 group-hover:from-green-50/30 group-hover:to-emerald-50/30 transition-all duration-300"></div>

        <div className="relative p-3 h-full flex flex-col z-10">
          {/* Header with Company Logo and Time Remaining */}
          <div className="flex justify-between items-start mb-2">
            {/* Company Logo */}
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-red-500 to-red-600 border-2 border-white flex items-center justify-center transition-all duration-300">
              {job.company?.logo ? (
                <img
                  src={job.company.logo}
                  alt={job.company.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
              ) : (
                <div className="text-white text-xs font-bold text-center leading-tight">
                  <div className="text-[10px]">{job.company?.name?.split(' ')[0] || 'C'}</div>
                  <div className="text-[12px] font-bold">{job.company?.name?.split(' ')[1] || 'O'}</div>
                </div>
              )}
            </div>

            {/* Time Remaining */}
            <div className="flex items-center gap-1 text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              <Clock className="w-2.5 h-2.5" />
              <span className="text-[10px] font-medium">
                {daysLeft > 0 ? `${daysLeft} days left` : 'Expired'}
              </span>
            </div>
          </div>

          {/* Job Title with Bookmark */}
          <div className="flex justify-between items-start mb-1.5">
            <h3 className="text-sm font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300 flex-1 pr-2 line-clamp-2">
              {job.title ?? "Untitled Job"}
            </h3>
            <Bookmark className="w-3 h-3 text-gray-400 hover:text-green-500 transition-colors duration-300 flex-shrink-0" />
          </div>

          {/* Company and Brand */}
          <div className="flex items-center gap-1.5 mb-2">
            <p className="text-gray-600 font-medium text-xs">
              {job.company?.name || "Company Name"}
            </p>
            {job.company?.name && (
              <span className="text-gray-500 text-xs">|</span>
            )}
            <span className="text-gray-500 text-[10px]">Brand Name</span>

            {/* CV Requirement Icon */}
            <div className="ml-auto">
              {job.requiresCV === false ? (
                <div className="w-4 h-4 bg-red-500 rounded flex items-center justify-center transition-all duration-300">
                  <span className="text-white text-[8px] font-bold">CV</span>
                </div>
              ) : (
                <div className="w-4 h-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded flex items-center justify-center transition-all duration-300">
                  <FileText className="w-2 h-2 text-white" />
                </div>
              )}
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
              <Send className="w-2.5 h-2.5 text-green-600" />
            </div>
            <span className="text-gray-600 font-medium text-xs">
              {job.location || "Island Wide"}
            </span>
          </div>

          {/* Employment Type */}
          <div className="flex items-center gap-1.5 mt-auto">
            <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center">
              <Briefcase className="w-2.5 h-2.5 text-emerald-600" />
            </div>
            <span className="text-gray-600 font-medium text-xs">
              {job.type || "Full-Time"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
