"use client";

import { useGetProfileDetails } from "../../features/company/queries/use-get-profile-details";
import {
  ArrowLeft,
  Building2,
  Calendar,
  Github,
  Globe,
  Linkedin,
  MapPin,
  User,
} from "lucide-react";
import Link from "next/link";
import type React from "react";

type MaybeDate = string | Date | null | undefined;

function formatDate(value: MaybeDate) {
  if (!value) return "";
  const d = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

export default function ProfilePage() {
  const { data, isLoading, isError } = useGetProfileDetails();

  if (isLoading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading profiles...</p>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-red-100">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-6 h-6 text-red-600" />
          </div>
          <p className="text-red-600 font-semibold">Failed to load profiles</p>
          <p className="text-slate-500 text-sm mt-1">Please try again later</p>
        </div>
      </div>
    );

  const profiles = Array.isArray(data) ? data : [];

  if (profiles.length === 0)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-6 h-6 text-slate-400" />
          </div>
          <p className="text-slate-600 font-semibold">No profiles found</p>
          <p className="text-slate-500 text-sm mt-1">
            Check back later for updates
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto py-8 px-4 space-y-8">
        {/* Back Button → always goes to /account */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-blue-100 text-slate-700 rounded-xl shadow-sm transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-medium">Back</span>
        </Link>

        {profiles.map((p: any) => (
          <article
            key={p.id}
            className="bg-white rounded-3xl shadow-xl border border-slate-200/50 overflow-hidden hover:shadow-2xl transition-all duration-300"
          >
            {/* Banner Section */}
            <div className="relative">
              {p.bannerPhotoUrl ? (
                <div className="h-48 w-full relative overflow-hidden">
                  <img
                    src={p.bannerPhotoUrl || "/placeholder.svg"}
                    alt="Profile banner"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              ) : (
                <div className="h-48 w-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800"></div>
              )}

              {/* Profile Photo */}
              <div className="absolute -bottom-16 left-8">
                {p.profilePhotoUrl ? (
                  <img
                    src={p.profilePhotoUrl || "/placeholder.svg"}
                    alt={`${p.firstName ?? ""} ${p.lastName ?? ""}`}
                    className="w-32 h-32 rounded-2xl border-4 border-white shadow-xl object-cover"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-2xl border-4 border-white shadow-xl bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                    <User className="w-12 h-12 text-slate-500" />
                  </div>
                )}
              </div>
            </div>

            {/* Header Section */}
            <div className="pt-20 px-8 pb-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">
                    {p.firstName} {p.lastName}
                  </h1>

                  {p.headline && (
                    <p className="text-lg text-slate-700 font-medium mb-3">
                      {p.headline}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-4 text-slate-600 mb-4">
                    {p.currentPosition && (
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        <span className="text-sm">{p.currentPosition}</span>
                      </div>
                    )}
                    {p.currentWorkplace && (
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        <span className="text-sm">{p.currentWorkplace}</span>
                      </div>
                    )}
                    {p.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{p.location}</span>
                      </div>
                    )}
                  </div>

                  {p.tagline && (
                    <p className="text-slate-600 italic bg-slate-50 p-4 rounded-xl border-l-4 border-blue-500">
                      "{p.tagline}"
                    </p>
                  )}
                </div>

                {/* Social Links */}
                <div className="flex gap-3">
                  {p.website && (
                    <SocialLink href={p.website} icon={Globe} label="Website" />
                  )}
                  {p.linkedinUrl && (
                    <SocialLink
                      href={p.linkedinUrl}
                      icon={Linkedin}
                      label="LinkedIn"
                    />
                  )}
                  {p.githubUrl && (
                    <SocialLink
                      href={p.githubUrl}
                      icon={Github}
                      label="GitHub"
                    />
                  )}
                  {p.portfolioUrl && (
                    <SocialLink
                      href={p.portfolioUrl}
                      icon={User}
                      label="Portfolio"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* About Section */}
            {p.about && (
              <div className="px-8 pb-6">
                <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  About
                </h2>
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                  <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                    {p.about}
                  </p>
                </div>
              </div>
            )}

            {/* Details Grid */}
            <div className="px-8 pb-8">
              <h2 className="text-xl font-semibold text-slate-900 mb-6">
                Profile Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <DetailCard
                  icon={Calendar}
                  label="Date of Birth"
                  value={formatDate(p.DOB)}
                />
                <DetailCard icon={MapPin} label="Location" value={p.location} />
                <DetailCard
                  icon={Building2}
                  label="Current Position"
                  value={p.currentPosition}
                />
                <DetailCard
                  icon={Building2}
                  label="Workplace"
                  value={p.currentWorkplace}
                />
                <DetailCard
                  icon={Calendar}
                  label="Joined"
                  value={formatDate(p.createdAt)}
                />
                <DetailCard
                  icon={Calendar}
                  label="Last Updated"
                  value={formatDate(p.updatedAt)}
                />
              </div>

              {/* Additional Info Sections */}
              <div className="mt-8 space-y-6">
                <LongTextSection label="Description" value={p.description} />
                <LongTextSection
                  label="Additional Information"
                  value={p.additionalInfo}
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function SocialLink({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: any;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="w-12 h-12 bg-slate-100 hover:bg-blue-100 rounded-xl flex items-center justify-center transition-colors group"
      title={label}
    >
      <Icon className="w-5 h-5 text-slate-600 group-hover:text-blue-600 transition-colors" />
    </a>
  );
}

function DetailCard({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value?: React.ReactNode | string | null;
}) {
  const hasValue =
    value !== undefined &&
    value !== null &&
    !(typeof value === "string" && value.trim() === "");

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
          <Icon className="w-4 h-4 text-blue-600" />
        </div>
        <span className="text-sm font-medium text-slate-600 uppercase tracking-wide">
          {label}
        </span>
      </div>
      <div className="text-slate-900 font-medium">
        {hasValue ? (
          value
        ) : (
          <span className="text-slate-400">Not specified</span>
        )}
      </div>
    </div>
  );
}

function LongTextSection({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) {
  if (!value || value.trim() === "") return null;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">{label}</h3>
      <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
        {value}
      </p>
    </div>
  );
}
