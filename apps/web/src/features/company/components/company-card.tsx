"use client";

import { ArrowRight, Briefcase, Building2, Globe, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Company = {
  id: string;
  name: string;
  brandName?: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  logoUrl?: string;
  companyType?: { id: string; name: string };
  industry?: { id: string; name: string };
  images?: { imageUrl: string; altText?: string; isThumbnail?: boolean }[];
};

type CompanyCardProps = {
  company: Company;
};

export function CompanyCard({ company }: CompanyCardProps) {
  const thumbnail =
    company.images?.find((img) => img.isThumbnail) ||
    (company.images && company.images[0]) ||
    null;

  const getLocationString = () => {
    const parts = [company.city, company.state, company.country].filter(
      Boolean
    );
    return parts.length > 0 ? parts.join(", ") : "Not available";
  };

  return (
    <Link href={`/companies/${company.id}`}>
      <div className="group relative bg-white rounded-xl border border-gray-100 p-5 w-full transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div className="relative">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            {/* Company Logo */}
            <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 relative group-hover:scale-105 transition-transform duration-300">
              {thumbnail ? (
                <Image
                  src={thumbnail.imageUrl}
                  alt={thumbnail.altText || company.name || "Company Logo"}
                  fill
                  className="object-cover"
                />
              ) : company.logoUrl ? (
                <Image
                  src={company.logoUrl}
                  alt={company.name || "Company Logo"}
                  fill
                  className="object-contain p-1.5 bg-gray-50"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-green-600" />
                </div>
              )}
            </div>

            {/* Status badge */}
            <div className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
              Hiring
            </div>
          </div>

          {/* Company Info */}
          <div className="space-y-3">
            <div>
              <h3 className="font-bold text-lg text-gray-900 group-hover:text-green-600 transition-colors duration-300 line-clamp-1 mb-1">
                {company.brandName || company.name}
              </h3>
              <p className="text-sm text-gray-600 font-medium flex items-center gap-1.5">
                <MapPin className="h-3 w-3 text-gray-400" />
                {getLocationString()}
              </p>
            </div>

            {/* Type & Industry */}
            <div className="flex flex-wrap items-center gap-2">
              {company.companyType?.name && (
                <div className="flex items-center gap-1.5 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  <Briefcase className="h-3 w-3" />
                  {company.companyType.name}
                </div>
              )}
              {company.industry?.name && (
                <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                  <Globe className="h-3 w-3" />
                  {company.industry.name}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">View Jobs</span>
              <div className="flex items-center gap-1.5 text-green-600 font-medium group-hover:gap-2 transition-all duration-300">
                <span className="text-sm">Explore</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
