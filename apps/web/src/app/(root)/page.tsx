"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import en from "@/app/languages/en.json";
import si from "@/app/languages/si.json";
import ta from "@/app/languages/ta.json";
import { FeaturedCompanies } from "@/modules/landing/featured-companies";
import { FeaturedJobs } from "@/modules/landing/featured-jobs";
import { Hero } from "@/modules/landing/hero";
import JobCategories from "@/modules/landing/job-categories";
import JobSlider from "@/modules/landing/jobslider";

import { Suspense } from "react";

export default function Home() {
  const { lang } = useLanguage();
  const t = lang === "en" ? en.Home : lang === "si" ? si.Home : ta.Home;

  return (
    <div className="w-screen min-h-screen ">
      {/* Hero Section */}
      <Hero />

      <Suspense
        fallback={
          <div className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-96 mb-8"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-48 bg-gray-200 rounded-xl"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        }
      >
        <JobCategories />
      </Suspense>
      {/* Featured Jobs Section */}
      <Suspense
        fallback={
          <div className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-96 mb-8"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-48 bg-gray-200 rounded-xl"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        }
      >
        <FeaturedJobs />
      </Suspense>

      {/* Featured Companies Section */}
      <Suspense
        fallback={
          <div className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-96 mb-8"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        }
      >
        <FeaturedCompanies />
      </Suspense>

      {/* Job Categories Slider */}
      <Suspense
        fallback={
          <div className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-96 mb-8"></div>
                <div className="h-64 bg-gray-200 rounded-xl"></div>
              </div>
            </div>
          </div>
        }
      >
        <JobSlider />
      </Suspense>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{t.cta.title}</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            {t.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-50 transition-all duration-300 shadow-lg">
              {t.cta.learnMore}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
