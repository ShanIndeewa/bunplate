"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import en from "@/app/languages/en.json";
import si from "@/app/languages/si.json";
import ta from "@/app/languages/ta.json";
import { useGetJobCategoriesWithCounts, type JobCategoryType } from "@/features/company/queries/use-get-job-categories-with-counts";
import {
    ArrowRight,
    Building2,
    Car,
    GraduationCap,
    Heart,
    Laptop,
    Megaphone,
    Palette,
    ShoppingBag,
    TrendingUp,
    Utensils,
    Wrench
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// Icon mapping for different job categories
const getCategoryIcon = (type: JobCategoryType) => {
  const iconMap: Record<JobCategoryType, any> = {
    Technology: Laptop,
    Design: Palette,
    Marketing: Megaphone,
    Healthcare: Heart,
    Education: GraduationCap,
    Finance: Building2,
    Hospitality: Utensils,
    Transportation: Car,
    Retail: ShoppingBag,
    Engineering: Wrench,
  };

  return iconMap[type] || Building2;
};

// Color mapping for different job categories - all green variations
const getCategoryColor = (type: JobCategoryType) => {
  const colorMap: Record<JobCategoryType, string> = {
    Technology: "from-green-500 to-green-600",
    Design: "from-emerald-500 to-emerald-600",
    Marketing: "from-lime-500 to-lime-600",
    Healthcare: "from-green-600 to-green-700",
    Education: "from-emerald-600 to-emerald-700",
    Finance: "from-green-400 to-green-500",
    Hospitality: "from-lime-600 to-lime-700",
    Transportation: "from-emerald-400 to-emerald-500",
    Retail: "from-green-700 to-green-800",
    Engineering: "from-lime-400 to-lime-500",
  };

  return colorMap[type] || "from-green-500 to-green-600";
};

const JobCategories = () => {
  const { lang } = useLanguage();
  const t = lang === "en" ? en.Home.jobCategories : lang === "si" ? si.Home.jobCategories : ta.Home.jobCategories;
  const [isHovering, setIsHovering] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const {
    data: categories = [],
    isLoading,
    error,
  } = useGetJobCategoriesWithCounts();

  // Handle mouse enter with delay
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsHovering(true);
  };

  // Handle mouse leave with delay
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovering(false);
    }, 100); // 100ms delay to allow cursor to move to modal
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (isLoading) {
    return (
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-4 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mb-8 mx-auto"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !categories.length) {
    return (
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Job Categories
          </h2>
          <p className="text-gray-600 mb-8">No job categories available at the moment.</p>
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

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {categories
            .filter(category => category.jobCount > 0) // Only show categories with jobs
            .slice(0, 8)
            .map((category) => {
              const IconComponent = getCategoryIcon(category.type);
              const colorClass = getCategoryColor(category.type);

              return (
                <CategoryCard
                  key={category.type}
                  category={category}
                  icon={IconComponent}
                  colorClass={colorClass}
                  t={t}
                />
              );
            })}
        </div>

        {/* CTA */}
        <div className="text-center relative">
          <div
            className="inline-block"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href="/job-categories"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {t.cta}
              <ArrowRight size={20} />
            </Link>

            {/* Hover Modal */}
            {isHovering && (
              <div
                className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 w-96 bg-white rounded-xl border border-gray-200 z-50 animate-in fade-in-0 zoom-in-95 duration-200"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                    All Job Categories
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {categories.map((category) => {
                      const IconComponent = getCategoryIcon(category.type);
                      const colorClass = getCategoryColor(category.type);

                      return (
                        <Link
                          key={category.type}
                          href={`/job-search-page?category=${category.type.toLowerCase()}`}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                        >
                          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${colorClass} flex items-center justify-center flex-shrink-0`}>
                            <IconComponent className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-gray-900 truncate">
                              {category.type}
                            </div>
                            <div className="text-xs text-gray-500">
                              {category.jobCount} {category.jobCount === 1 ? 'job' : 'jobs'}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <Link
                      href="/job-categories"
                      className="block w-full text-center text-sm font-medium text-green-600 hover:text-green-700 transition-colors duration-200"
                    >
                      View All Categories →
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// Category Card Component
const CategoryCard = ({
  category,
  icon: IconComponent,
  colorClass,
  t
}: {
  category: any;
  icon: any;
  colorClass: string;
  t: any;
}) => {
  return (
    <Link href={`/job-search-page?category=${category.type.toLowerCase()}`}>
      <div className="group relative bg-white rounded-lg border border-gray-200 cursor-pointer hover:-translate-y-2 transition-all duration-300 overflow-hidden h-32 hover:border-green-200">
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/0 to-emerald-50/0 group-hover:from-green-50/30 group-hover:to-emerald-50/30 transition-all duration-300"></div>

        <div className="relative p-4 h-full flex flex-col items-center justify-center z-10">
          {/* Icon */}
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClass} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
            <IconComponent className="w-6 h-6 text-white" />
          </div>

          {/* Category Title */}
          <h3 className="text-sm font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300 text-center mb-2 line-clamp-2">
            {category.type}
          </h3>

          {/* Job Count Badge */}
          <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
            {category.jobCount} Active Jobs
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JobCategories;
