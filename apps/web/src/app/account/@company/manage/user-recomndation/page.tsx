"use client";

import { useGetUserRecommendations } from "@/features/company/queries/use-get-user-recomondation-by-userid";
import { CreateUserRecommendationForm } from "@/features/user-recomondation/components/useCreateUserRecommendation";
import { Calendar, Plus, Quote, User } from "lucide-react";
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

export default function UserRecommendationsPage() {
  const { data, isLoading, isError } = useGetUserRecommendations();
  const [showModal, setShowModal] = useState(false);

  const recommendations = Array.isArray((data as any)?.data)
    ? (data as any).data
    : Array.isArray(data)
      ? (data as any)
      : [];

  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-8xl mx-auto py-10 px-4 space-y-10">
        {/* Page Title + Add Button */}
        <header className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 flex items-center gap-3 justify-center md:justify-start">
              <Quote className="w-8 h-8 text-blue-600" />
              User Recommendations
            </h1>
            <p className="text-slate-600 mt-2">
              Endorsements and testimonials from colleagues and managers
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" /> Add Recommendation
          </button>
        </header>

        {/* Recommendations List */}
        {isLoading && (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-600 font-medium">
              Loading recommendations...
            </p>
          </div>
        )}

        {isError && (
          <div className="text-center py-20 p-8 bg-white rounded-2xl shadow-lg border border-red-100">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Quote className="w-6 h-6 text-red-600" />
            </div>
            <p className="text-red-600 font-semibold">
              Failed to load recommendations
            </p>
            <p className="text-slate-500 text-sm mt-1">
              Please try again later
            </p>
          </div>
        )}

        {recommendations.length === 0 && !isLoading && !isError && (
          <div className="text-center py-20 p-8 bg-white rounded-2xl shadow-lg">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Quote className="w-6 h-6 text-slate-400" />
            </div>
            <p className="text-slate-600 font-semibold">
              No recommendations found
            </p>
            <p className="text-slate-500 text-sm mt-1">
              Ask teammates or managers to share a recommendation
            </p>
          </div>
        )}

        {recommendations.map((r: any) => (
          <RecommendationCard key={r.id} r={r} />
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative shadow-xl">
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 text-slate-500 hover:text-slate-900"
            >
              ✕
            </button>
            <CreateUserRecommendationForm
              userId="current-user-id"
              organizationId="current-org-id"
              onSuccess={handleCloseModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function RecommendationCard({ r }: { r: any }) {
  return (
    <article className="bg-white rounded-3xl shadow-xl border border-slate-200/50 overflow-hidden hover:shadow-2xl transition-all duration-300">
      <div className="p-8 border-b border-slate-100">
        <h2 className="text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
          <Quote className="w-6 h-6 text-blue-600" />
          {r.recommenderName || "Recommender"}
        </h2>
        {r.recommenderTitle && (
          <div className="text-slate-700 font-medium">{r.recommenderTitle}</div>
        )}
        <div className="text-slate-600 mt-1">
          {["Created", formatDate(r.createdAt)].filter(Boolean).join(": ")}
        </div>
      </div>

      <div className="px-8 py-6">
        <h3 className="text-xl font-semibold text-slate-900 mb-6">
          Recommendation Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DetailCard label="Recommender Name" value={r.recommenderName} />
          <DetailCard label="Recommender Title" value={r.recommenderTitle} />
          <DetailCard
            icon={Calendar}
            label="Created At"
            value={formatDate(r.createdAt)}
          />
          <DetailCard
            icon={Calendar}
            label="Updated At"
            value={formatDate(r.updatedAt)}
          />
        </div>
        <LongTextSection label="Recommendation" value={r.text} />
      </div>
    </article>
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
