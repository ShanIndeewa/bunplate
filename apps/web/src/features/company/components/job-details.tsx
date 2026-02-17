"use client";

import { useCheckJobApplication } from "@/features/company/queries/use-check-job-application";
import { useCheckJobSaveStatus } from "@/features/company/queries/use-check-job-save-status";
import { useGetCompanyByJobId } from "@/features/company/queries/use-get-company-by-job-id";
import { useGetJobById } from "@/features/company/queries/use-get-jobs-by-id";
import { useSaveJob, useUnsaveJob } from "@/features/company/queries/use-save-job";
import {
    Bookmark,
    BookmarkCheck,
    Briefcase,
    CheckCircle,
    ChevronLeft,
    Clock,
    Facebook,
    Instagram,
    Linkedin,
    MapPin,
    Search,
    Twitter,
    Users,
} from "lucide-react";
import { useState } from "react";
import JobApplicationModal from "./job-application-modal";

function formatMoney(v?: string | number) {
  if (v === undefined || v === null) return "";
  const n = typeof v === "string" ? Number(v) : v;
  if (Number.isNaN(n)) return String(v);
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function formatDate(v?: string) {
  if (!v) return "";
  const d = new Date(v);
  if (isNaN(d.getTime())) return v;
  return d.toLocaleDateString();
}

export default function JobDetails({ id }: { id: string }) {
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);

  // Fetch job
  const {
    data: job,
    isLoading: jobLoading,
    error: jobError,
  } = useGetJobById(id);

  // Fetch company by job id
  const {
    data: company,
    isLoading: companyLoading,
    error: companyError,
  } = useGetCompanyByJobId(job?.id ?? null);

  // Check if user has already applied to this job
  const {
    data: applicationStatus,
    isLoading: applicationStatusLoading,
  } = useCheckJobApplication(id);

  // Check if job is saved
  const {
    data: saveStatus,
    isLoading: saveStatusLoading,
  } = useCheckJobSaveStatus(id);

  // Save/unsave job mutations
  const saveJob = useSaveJob();
  const unsaveJob = useUnsaveJob();

  if (jobLoading) return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Loading Job Details</h3>
        <p className="text-gray-600">Please wait while we fetch the job information...</p>
      </div>
    </div>
  );

  if (jobError || !job) return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 text-center max-w-md">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <div className="w-8 h-8 text-red-500">⚠️</div>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Unable to Load Job</h3>
        <p className="text-gray-600 mb-4">We couldn't find the job you're looking for.</p>
        <button
          onClick={() => window.history.back()}
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
        >
          Go Back
        </button>
      </div>
    </div>
  );

  const title = job?.title ?? "Untitled Job";
  const byline = company?.name ?? "Company (unspecified)";

  const handleApply = () => setIsApplicationModalOpen(true);

  const handleSave = async () => {
    if (!job?.id) return;

    if (saveStatus?.isSaved && saveStatus?.wishlistItem) {
      // Unsave the job
      await unsaveJob.mutateAsync(saveStatus.wishlistItem.id);
    } else {
      // Save the job
      await saveJob.mutateAsync({
        jobId: job.id,
        organizationId: null,
        jobStatus: "live",
        isApplied: applicationStatus?.hasApplied || false,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 font-sans">
      {/* Header */}
      <div className="relative h-72 bg-gradient-to-r from-green-600 via-green-700 to-green-800 text-white flex flex-col justify-end p-8 overflow-hidden">
        <div className="absolute top-8 left-8 flex items-center space-x-2 cursor-pointer hover:text-green-200 transition-colors">
          <ChevronLeft size={20} />
          <span className="font-medium">Back</span>
        </div>
        <div className="absolute top-8 right-8 flex items-center space-x-2 cursor-pointer hover:text-green-200 transition-colors">
          <Search size={20} />
          <span className="font-medium">Search</span>
        </div>

        <div className="z-10 max-w-4xl">
          <h1 className="text-5xl font-bold leading-tight mb-4">{title}</h1>
          <div className="flex items-center space-x-4 text-lg">
            <p className="font-medium text-green-100">
              {companyLoading ? "Loading company…" : byline}
              {companyError ? " (company unavailable)" : ""}
            </p>
            {job?.location && (
              <div className="flex items-center space-x-2 text-green-200">
                <MapPin size={18} />
                <span>{job.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-400 rounded-full opacity-10 transform translate-x-48 -translate-y-48"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-300 rounded-full opacity-10 transform -translate-x-32 translate-y-32"></div>
          <svg
            className="absolute top-0 right-0 h-full w-auto text-green-400 opacity-5"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern
                id="pattern-green"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="10" cy="10" r="2" fill="currentColor" />
              </pattern>
            </defs>
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#pattern-green)"
            />
          </svg>
        </div>
      </div>

      {/* Layout */}
      <div className="bg-gradient-to-br from-green-50 to-white p-4 sm:p-8 rounded-t-3xl -mt-6 relative z-20 flex flex-col lg:flex-row gap-8">
        {/* Left Column */}
        <div className="flex-1 space-y-8 p-4 sm:p-0">
          {/* Job Description */}
          {job?.description && (
            <div className="bg-white rounded-2xl border border-green-100 p-8 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-green-600 rounded-full"></div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Job Description
                </h2>
              </div>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {job.description}
                </p>
              </div>
            </div>
          )}

          {/* Details */}
          <div className="bg-white rounded-2xl border border-green-100 p-8 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-green-600 rounded-full"></div>
              <h2 className="text-2xl font-bold text-gray-800">Job Details</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {job?.employmentType && (
                <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-xl border border-green-100">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Briefcase size={20} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-600">Employment Type</p>
                    <p className="text-gray-800 font-semibold">{job.employmentType}</p>
                  </div>
                </div>
              )}
              {job?.location && (
                <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-xl border border-green-100">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <MapPin size={20} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-600">Location</p>
                    <p className="text-gray-800 font-semibold">{job.location}</p>
                  </div>
                </div>
              )}
              {job?.salaryMin && job?.salaryMax && (
                <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-xl border border-green-100">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Users size={20} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-600">Salary Range</p>
                    <p className="text-gray-800 font-semibold">
                      {formatMoney(job.salaryMin)} - {formatMoney(job.salaryMax)}
                    </p>
                  </div>
                </div>
              )}
              {job?.createdAt && (
                <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-xl border border-green-100">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Clock size={20} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-600">Posted Date</p>
                    <p className="text-gray-800 font-semibold">{formatDate(job.createdAt)}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-96 bg-white rounded-2xl border border-green-100 p-8 h-fit sticky top-8 space-y-8">
          {/* Company Info */}
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mx-auto">
              {byline.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{byline}</h3>
              <p className="text-sm text-gray-600 bg-green-50 px-3 py-1 rounded-full inline-block">
                {company?.city}, {company?.country}
              </p>
            </div>
          </div>

          {/* Socials */}
          <div className="flex justify-center space-x-6 py-4 border-t border-b border-green-100">
            <div className="p-2 bg-green-50 rounded-lg hover:bg-green-100 transition-colors cursor-pointer">
              <Facebook
                size={20}
                className="text-green-600 hover:text-green-700"
              />
            </div>
            <div className="p-2 bg-green-50 rounded-lg hover:bg-green-100 transition-colors cursor-pointer">
              <Twitter
                size={20}
                className="text-green-600 hover:text-green-700"
              />
            </div>
            <div className="p-2 bg-green-50 rounded-lg hover:bg-green-100 transition-colors cursor-pointer">
              <Instagram
                size={20}
                className="text-green-600 hover:text-green-700"
              />
            </div>
            <div className="p-2 bg-green-50 rounded-lg hover:bg-green-100 transition-colors cursor-pointer">
              <Linkedin
                size={20}
                className="text-green-600 hover:text-green-700"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            {applicationStatusLoading ? (
              <div className="w-full bg-gray-100 text-gray-500 font-bold py-4 rounded-xl flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                <span>Checking Application Status...</span>
              </div>
            ) : applicationStatus?.hasApplied ? (
              <div className="w-full bg-green-100 text-green-800 font-bold py-4 rounded-xl flex items-center justify-center space-x-2 border-2 border-green-200">
                <CheckCircle size={20} />
                <span>ALREADY APPLIED</span>
              </div>
            ) : (
              <button
                onClick={handleApply}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-4 rounded-xl hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Briefcase size={20} />
                <span>APPLY FOR JOB</span>
              </button>
            )}

            {applicationStatus?.hasApplied && applicationStatus?.application && (
              <div className="bg-green-50 rounded-xl p-4 space-y-2 border border-green-200">
                <h4 className="font-semibold text-green-800 text-sm">Application Status</h4>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-green-700">Status:</span>
                  <span className="text-xs font-medium text-green-800 capitalize">
                    {applicationStatus.application.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-green-700">Applied:</span>
                  <span className="text-xs font-medium text-green-800">
                    {new Date(applicationStatus.application.submittedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            )}

            <button
              onClick={handleSave}
              disabled={saveJob.isPending || unsaveJob.isPending || saveStatusLoading}
              className="w-full bg-white text-green-600 font-bold py-4 rounded-xl border-2 border-green-500 hover:bg-green-50 hover:border-green-600 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saveJob.isPending || unsaveJob.isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                  <span>{saveStatus?.isSaved ? "REMOVING..." : "SAVING..."}</span>
                </>
              ) : saveStatus?.isSaved ? (
                <>
                  <BookmarkCheck size={20} />
                  <span>SAVED</span>
                </>
              ) : (
                <>
                  <Bookmark size={20} />
                  <span>SAVE JOB</span>
                </>
              )}
            </button>
          </div>

          {/* Additional Info */}
          <div className="bg-green-50 rounded-xl p-4 space-y-3">
            <h4 className="font-semibold text-green-800 text-sm">Why Apply Here?</h4>
            <ul className="text-xs text-green-700 space-y-1">
              <li>• Competitive salary package</li>
              <li>• Growth opportunities</li>
              <li>• Great work environment</li>
              <li>• Professional development</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Job Application Modal */}
      <JobApplicationModal
        isOpen={isApplicationModalOpen}
        onClose={() => setIsApplicationModalOpen(false)}
        jobId={job.id}
        jobTitle={title}
        companyName={byline}
      />
    </div>
  );
}
