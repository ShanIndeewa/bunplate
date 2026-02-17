"use client";

import {
    JobFilterParams,
    useGetJobs,
} from "@/features/company/queries/use-get-all-jobs";
import {
    ArrowRight,
    Bookmark,
    Briefcase,
    ChevronLeft,
    ChevronRight,
    MapPin,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Job = {
  id: string;
  logo?: string;
  company?: string;
  title?: string;
  location?: string;
  type?: string;
  daysLeft?: number;
  urgent?: boolean;
};

// JobCard component
const JobCard = ({ job }: { job: Job }) => (
  <div className="group relative bg-white rounded-xl border border-gray-100 p-5 m-2 min-w-[280px] md:min-w-[320px] lg:min-w-[300px] xl:min-w-[320px] flex-shrink-0 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
    {/* Gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

    <div className="relative">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 rounded-xl overflow-hidden bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
          <img
            src={job.logo || "https://placehold.co/48x48/d1d5db/000000?text=J"}
            alt={`${job.company} logo`}
            className="w-10 h-10 rounded-lg object-cover"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="text-right">
            <div className="text-xs font-medium text-gray-500">
              {job.daysLeft ?? 0} days left
            </div>
            {job.urgent && (
              <span className="px-2 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-full">
                Urgent
              </span>
            )}
          </div>
          <Bookmark className="w-4 h-4 text-gray-400 cursor-pointer hover:text-green-500 transition-colors" />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300 line-clamp-2">
          {job.title}
        </h3>
        <p className="text-sm text-gray-600 font-medium">{job.company}</p>

        <div className="flex flex-wrap items-center text-gray-500 gap-3 text-sm">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-green-500" />
            <span className="font-medium">{job.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Briefcase className="w-4 h-4 text-emerald-500" />
            <span className="font-medium">{job.type}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Apply Now</span>
          <div className="flex items-center gap-1.5 text-green-600 font-medium group-hover:gap-2 transition-all duration-300">
            <span className="text-sm">View Details</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Main carousel component
export const JobCarousel = ({ filters }: { filters?: JobFilterParams }) => {
  const {
    data: jobsData,
    isLoading,
    error,
  } = useGetJobs({
    page: 1,
    limit: 10,
    sort: "desc",
    ...filters,
  });

  const jobs: Job[] =
    jobsData?.map((job: any) => ({
      id: job.id,
      logo: job.company?.logoUrl || undefined,
      company: job.company?.name,
      title: job.title,
      location: job.location,
      type: job.type,
      daysLeft: job.closingDate
        ? Math.max(
            0,
            Math.ceil(
              (new Date(job.closingDate).getTime() - Date.now()) /
                (1000 * 60 * 60 * 24)
            )
          )
        : 0,
      urgent: job.status === "open" && job.numberOfVacancies < 1,
    })) || [];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(4);
  const carouselIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Responsive cardsToShow
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) setCardsToShow(1);
      else if (width < 1024) setCardsToShow(2);
      else setCardsToShow(4);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getMaxSlides = () => Math.max(0, jobs.length - cardsToShow);

  const handleNext = () =>
    setCurrentSlide((prev) => (prev === getMaxSlides() ? 0 : prev + 1));
  const handlePrev = () =>
    setCurrentSlide((prev) => (prev === 0 ? getMaxSlides() : prev - 1));

  // Auto-slide
  useEffect(() => {
    if (carouselIntervalRef.current) clearInterval(carouselIntervalRef.current);
    carouselIntervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev === getMaxSlides() ? 0 : prev + 1));
    }, 4000);
    return () => {
      if (carouselIntervalRef.current)
        clearInterval(carouselIntervalRef.current);
    };
  }, [cardsToShow, jobs.length]);

  if (isLoading) return <p>Loading jobs...</p>;
  if (error) return <p>Failed to load jobs.</p>;
  if (!jobs.length) return <p>No jobs available.</p>;

  return (
    <div className="relative w-full max-w-[1200px] mx-auto">
      <div className="overflow-hidden rounded-xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentSlide * (100 / cardsToShow)}%)`,
            width: `${(jobs.length / cardsToShow) * 100}%`,
          }}
        >
          {jobs.map((job) => (
            <div key={job.id} style={{ flex: `0 0 ${100 / cardsToShow}%` }}>
              <JobCard job={job} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 p-4 bg-white text-gray-800 rounded-2xl shadow-xl hover:shadow-2xl hover:bg-green-50 hover:text-green-600 transition-all duration-300 hidden md:block group"
      >
        <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-300" />
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 p-4 bg-white text-gray-800 rounded-2xl shadow-xl hover:shadow-2xl hover:bg-green-50 hover:text-green-600 transition-all duration-300 hidden md:block group"
      >
        <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
      </button>
    </div>
  );
};
