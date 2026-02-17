"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import en from "@/app/languages/en.json";
import si from "@/app/languages/si.json";
import ta from "@/app/languages/ta.json";
import { useGetJobs } from "@/features/company/queries/use-get-all-jobs";
import { Button } from "@/components/ui/button";
import {
    Bookmark,
    Briefcase,
    ChevronLeft,
    ChevronRight,
    Clock,
    FileText,
    Send,
    TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// Job type definition
type Job = {
  id: string;
  title: string;
  description?: string;
  company?: {
    id: string;
    name: string;
    logo?: string;
  };
  jobCategory?: {
    id: string;
    keyword: string;
    type: string;
  };
  location?: string;
  salary?: string;
  type?: string;
  isRemote?: boolean;
  closingDate?: string;
  requiresCV?: boolean;
};

const JobSlider = () => {
  const { lang } = useLanguage();
  const t = lang === "en" ? en.Home.jobSlider : lang === "si" ? si.Home.jobSlider : ta.Home.jobSlider;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [isAutoSliding, setIsAutoSliding] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch jobs
  const {
    data: jobsData,
    isLoading,
    error,
  } = useGetJobs({
    page: 1,
    limit: 12,
    sort: "desc",
  });

  const jobs: Job[] = (jobsData as Job[]) || [];
  const maxIndex = Math.max(0, jobs.length - itemsPerView);

  // Update items per view based on screen size
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else if (window.innerWidth < 1280) {
        setItemsPerView(3);
      } else {
        setItemsPerView(4);
      }
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoSliding || jobs.length <= itemsPerView) return;

    const startAutoSlide = () => {
      autoSlideRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          const nextIndex = prev + 1;
          return nextIndex > maxIndex ? 0 : nextIndex;
        });
      }, 3000); // Auto-slide every 3 seconds
    };

    startAutoSlide();

    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    };
  }, [isAutoSliding, jobs.length, itemsPerView, maxIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    // Pause auto-sliding when user interacts
    setIsAutoSliding(false);
    // Resume auto-sliding after 5 seconds
    setTimeout(() => setIsAutoSliding(true), 5000);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
    // Pause auto-sliding when user interacts
    setIsAutoSliding(false);
    // Resume auto-sliding after 5 seconds
    setTimeout(() => setIsAutoSliding(true), 5000);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    // Pause auto-sliding when user interacts
    setIsAutoSliding(false);
    // Resume auto-sliding after 5 seconds
    setTimeout(() => setIsAutoSliding(true), 5000);
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-48 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !jobs.length) {
    return (
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t.title}
          </h2>
          <p className="text-gray-600 mb-8">No jobs available at the moment.</p>
        </div>
      </section>
    );
  }

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

        {/* Slider Container */}
        <div
          className="relative"
          onMouseEnter={() => setIsAutoSliding(false)}
          onMouseLeave={() => setIsAutoSliding(true)}
        >
          {/* Navigation Buttons */}
          {jobs.length > itemsPerView && (
            <>
              <Button
                onClick={prevSlide}
                disabled={currentIndex === 0}
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                onClick={nextSlide}
                disabled={currentIndex >= maxIndex}
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </>
          )}

          {/* Slider */}
          <div ref={sliderRef} className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              }}
            >
              {jobs.map((job: Job) => (
                <div
                  key={job.id}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <JobCard job={job} t={t} />
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          {jobs.length > itemsPerView && (
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-green-600 w-8"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// JobCard component matching the FeaturedJobs design
const JobCard = ({ job, t }: { job: Job; t: any }) => {
  // Calculate days remaining
  const daysLeft = job.closingDate
    ? Math.max(
        0,
        Math.ceil(
          (new Date(job.closingDate).getTime() - Date.now()) /
            (1000 * 60 * 60 * 24)
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
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-red-500 to-red-600 border-2 border-white flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              {job.company?.logo ? (
                <img
                  src={job.company.logo}
                  alt={job.company.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
              ) : (
                <div className="text-white text-xs font-bold text-center leading-tight">
                  <div className="text-[10px]">
                    {job.company?.name?.split(" ")[0] || "C"}
                  </div>
                  <div className="text-[12px] font-bold">
                    {job.company?.name?.split(" ")[1] || "O"}
                  </div>
                </div>
              )}
            </div>

            {/* Time Remaining */}
            <div className="flex items-center gap-1 text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              <Clock className="w-2.5 h-2.5" />
              <span className="text-[10px] font-medium">
                {daysLeft > 0 ? `${daysLeft} ${t.jobCard.daysLeft}` : "Expired"}
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
              {job.company?.name || t.jobCard.companyName}
            </p>
            {job.company?.name && (
              <span className="text-gray-500 text-xs">|</span>
            )}
            <span className="text-gray-500 text-[10px]">Brand Name</span>

            {/* CV Requirement Icon */}
            <div className="ml-auto">
              {job.requiresCV === false ? (
                <div className="w-4 h-4 bg-red-500 rounded flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
                  <span className="text-white text-[8px] font-bold">CV</span>
                </div>
              ) : (
                <div className="w-4 h-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
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
              {job.type || t.jobCard.fullTime}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JobSlider;
