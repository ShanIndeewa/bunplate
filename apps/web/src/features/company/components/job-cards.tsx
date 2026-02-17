"use client";

import { useGetJobs } from "@/features/company/queries/use-get-all-jobs";
import { useGetCompanyByJobId } from "@/features/company/queries/use-get-company-by-job-id";
import {
    ArrowRight,
    Briefcase,
    Clock,
    Heart,
    MapPin,
    MoreVertical,
    Share2,
} from "lucide-react";
import Link from "next/link";
import { MouseEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

/** Minimal types so TS doesn't complain, adjust to your API shape if needed */
type Job = {
  id: string;
  title?: string;
  description?: string;
  location?: string;
  type?: string;
  status?: string;
  company?: { id: string; name: string };
  companyId?: string;
};

export function JobList() {
  // ✅ Pass filter params here if needed (pagination, search, etc.)
  const {
    data: jobs,
    isLoading,
    error,
  } = useGetJobs({
    page: 1,
    limit: 6,
    sort: "desc",
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching jobs</p>;
  if (!jobs?.length) return <p>No jobs found.</p>;

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {(jobs as Job[]).map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}

function JobCard({ job }: { job: Job }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const jobUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/jobs/${job.id}`
      : `/jobs/${job.id}`;

  const openMenu = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMenuOpen(true);
  };

  const onShare = async () => {
    const title = job.title ?? "Job";
    const text = `Check out this job: ${title}`;
    try {
      if (navigator.share) {
        await navigator.share({ title, text, url: jobUrl });
      } else {
        await navigator.clipboard.writeText(jobUrl);
        alert("Link copied to clipboard!");
      }
    } catch {
      // user cancelled or share failed
    }
  };

  const onWishlist = async () => {
    alert("Added to wishlist (stub). Replace with your API call.");
  };

  return (
    <>
      <Link href={`/jobs/${job.id}`}>
        <div className="group relative bg-white rounded-xl border border-gray-100 cursor-pointer hover:-translate-y-1 transition-all duration-300 overflow-hidden">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <div className="relative p-5">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <Briefcase className="w-6 h-6 text-green-600" />
              </div>

              <div className="flex items-center gap-2">
                {job.status ? (
                  <span className="px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                    {job.status}
                  </span>
                ) : null}

                <button
                  className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100"
                  aria-label="More actions"
                  onClick={openMenu}
                >
                  <MoreVertical className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-3">
              {/* Title */}
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300 line-clamp-2">
                {job.title ?? "Untitled Job"}
              </h3>

              {/* Company name */}
              {job.company?.name ? (
                <p className="text-sm text-gray-600 font-medium">
                  {job.company.name}
                </p>
              ) : (
                <CompanyName jobId={job.id} />
              )}

              {/* Meta info */}
              <div className="flex flex-wrap items-center text-gray-500 gap-3 text-sm">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-green-500" />
                  <span className="font-medium">{job.type ?? "Full-time"}</span>
                </div>

                {job.location && (
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-emerald-500" />
                    <span className="font-medium">{job.location}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Posted 2 days ago</span>
                <div className="flex items-center gap-1.5 text-green-600 font-medium group-hover:gap-2 transition-all duration-300">
                  <span className="text-sm">Apply Now</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Modal */}
      <Dialog open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <DialogContent className="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle>Job actions</DialogTitle>
            <DialogDescription>
              What would you like to do with{" "}
              <span className="font-medium text-gray-900">
                {job.title ?? "this job"}
              </span>
              ?
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-3 py-2">
            <Button
              onClick={onShare}
              className="justify-start gap-2"
              variant="secondary"
            >
              <Share2 className="w-4 h-4" />
              Share
            </Button>

            <Button
              onClick={onWishlist}
              className="justify-start gap-2"
              variant="outline"
            >
              <Heart className="w-4 h-4" />
              Add to wishlist
            </Button>
          </div>

          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <Button type="button" variant="ghost">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

/**
 * Child component to show company name using the jobId -> company flow.
 */
function CompanyName({ jobId }: { jobId: string }) {
  const { data: company, isLoading, error } = useGetCompanyByJobId(jobId);

  if (isLoading) {
    return (
      <p className="text-sm text-gray-400 font-medium">Loading company…</p>
    );
  }

  if (error) {
    return (
      <p className="text-sm text-gray-400 font-medium">Unknown Company</p>
    );
  }

  return (
    <p className="text-sm text-gray-600 font-medium">
      {company?.name ?? "Unknown Company"}
    </p>
  );
}
