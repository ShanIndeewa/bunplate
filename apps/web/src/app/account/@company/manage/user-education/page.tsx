"use client";

import { useGetUserEducations } from "@/features/company/queries/use-get-user-education";
import { CreateUserEducationForm } from "@/features/user-education/components/education-create";
import { Calendar, GraduationCap, School, User, X } from "lucide-react";
import { useState } from "react";

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

function formatYearMonth(value?: string | null) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value ?? "";
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short" });
}

function formatPeriod(start?: string | null, end?: string | null) {
  const s = formatYearMonth(start);
  const e = end ? formatYearMonth(end) : "Present";
  if (!s && !e) return "";
  if (!s) return e;
  return `${s} — ${e}`;
}

export default function UserEducationsPage() {
  const { data, isLoading, isError, refetch } = useGetUserEducations();
  const [showFormModal, setShowFormModal] = useState(false);

  const educations = Array.isArray((data as any)?.data)
    ? (data as any).data
    : Array.isArray(data)
      ? (data as any)
      : [];

  if (isLoading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading education...</p>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-red-100">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-6 h-6 text-red-600" />
          </div>
          <p className="text-red-600 font-semibold">Failed to load education</p>
          <p className="text-slate-500 text-sm mt-1">Please try again later</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 relative">
      <div className="max-w-8xl mx-auto py-10 px-4 space-y-10">
        {/* Page Header + Add Button */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 flex items-center justify-center md:justify-start gap-3">
              <GraduationCap className="w-8 h-8 text-blue-600" />
              User Education
            </h1>
            <p className="text-slate-600 mt-2">
              Academic background and qualifications
            </p>
          </div>

          <button
            onClick={() => setShowFormModal(true)}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
          >
            + Add Education
          </button>
        </header>

        {educations.length === 0 && (
          <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-6 h-6 text-slate-400" />
            </div>
            <p className="text-slate-600 font-semibold">No education found</p>
            <p className="text-slate-500 text-sm mt-1">
              Add your education history to complete your profile
            </p>
          </div>
        )}

        {educations.map((e: any) => (
          <article
            key={e.id}
            className="bg-white rounded-3xl shadow-xl border border-slate-200/50 overflow-hidden hover:shadow-2xl transition-all duration-300"
          >
            {/* Header */}
            <div className="p-8 border-b border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
                <School className="w-6 h-6 text-blue-600" />
                {e.institutionName || "Institution"}
              </h2>
              <div className="text-slate-700 font-medium">
                {[e.degree, e.fieldOfStudy].filter(Boolean).join(" • ")}
              </div>
              <div className="text-slate-600 mt-1">
                {formatPeriod(e.startDate, e.endDate)}
              </div>
              {e.grade ? (
                <div className="text-slate-600 mt-1">Grade: {e.grade}</div>
              ) : null}
            </div>

            {/* Details Grid */}
            <div className="px-8 py-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">
                Education Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DetailCard label="Institution" value={e.institutionName} />
                <DetailCard label="Degree" value={e.degree} />
                <DetailCard label="Field of Study" value={e.fieldOfStudy} />
                <DetailCard
                  icon={Calendar}
                  label="Start Date"
                  value={formatDate(e.startDate)}
                />
                <DetailCard
                  icon={Calendar}
                  label="End Date"
                  value={formatDate(e.endDate) || "Present"}
                />
                <DetailCard label="Grade" value={e.grade} />
                <DetailCard
                  icon={Calendar}
                  label="Created At"
                  value={formatDate(e.createdAt)}
                />
                <DetailCard
                  icon={Calendar}
                  label="Updated At"
                  value={formatDate(e.updatedAt)}
                />
              </div>

              <LongTextSection label="Description" value={e.description} />
            </div>
          </article>
        ))}
      </div>

      {/* Modal Form */}
      {showFormModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onClick={() => setShowFormModal(false)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-2xl p-6 relative shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowFormModal(false)}
              className="absolute top-4 right-4 text-slate-600 hover:text-red-600"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold mb-4">Add Education</h2>
            <CreateUserEducationForm
              userId="USER_ID_HERE"
              onSuccess={() => {
                setShowFormModal(false);
                refetch(); // Refresh list after adding
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function DetailCard({
  icon: Icon,
  label,
  value,
}: {
  icon?: any;
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
        {Icon ? (
          <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
            <Icon className="w-4 h-4 text-blue-600" />
          </div>
        ) : (
          <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center">
            <User className="w-4 h-4 text-slate-400" />
          </div>
        )}
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
    <div className="bg-white border border-slate-200 rounded-2xl p-6 mt-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-3">{label}</h3>
      <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
        {value}
      </p>
    </div>
  );
}
