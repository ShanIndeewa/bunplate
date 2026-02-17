"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import en from "@/app/languages/en.json";
import si from "@/app/languages/si.json";
import ta from "@/app/languages/ta.json";
import { CompanyCard } from "@/features/company/components/company-card";
import { useGetCompanies } from "@/features/company/queries/use-get-all-companies";
import { transformCompaniesData } from "@/features/company/utils/transforms";
import { ArrowRight, Building2 } from "lucide-react";
import Link from "next/link";

type Props = {};

export function FeaturedCompanies({}: Props) {
  const { lang } = useLanguage();
  const t = lang === "en" ? en.Home.featuredCompanies : lang === "si" ? si.Home.featuredCompanies : ta.Home.featuredCompanies;

  // Fetch companies with limit=6 to show featured companies
  const {
    data: companyData,
    isLoading,
    error,
  } = useGetCompanies({
    page: 1,
    limit: 6,
    sort: "desc",
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !companyData?.data || companyData.data.length === 0) {
    return <></>;
  }

  // Transform date strings to Date objects
  // Also ensure that null values remain null and aren't converted to strings
  const transformedData = transformCompaniesData(companyData.data);

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-50 rounded-full -translate-y-48 -translate-x-48"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-50 rounded-full translate-y-40 translate-x-40"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Building2 size={16} />
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

        {/* Company Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {transformedData.map((company: any) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>

        {/* CTA */}
        {companyData.meta?.totalCount > 6 && (
          <div className="text-center">
            <Link
              href="/companies"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300"
            >
              {t.cta}
              <ArrowRight size={20} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
