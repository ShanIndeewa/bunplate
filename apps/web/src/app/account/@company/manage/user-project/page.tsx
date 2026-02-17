"use client";

import { useGetUserProjects } from "@/features/company/queries/use-get-user-projects-by-userid";
import { CreateUserProjectForm } from "@/features/user-projects/components/CreateUserProjectForm"; // import your form component
import { Calendar, FolderGit2, Link2, Plus, User } from "lucide-react";
import type React from "react";
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

function ym(value?: string | null) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value ?? "";
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short" });
}

function period(start?: string | null, end?: string | null) {
  const s = ym(start);
  const e = end ? ym(end) : "Present";
  if (!s && !e) return "";
  if (!s) return e;
  return `${s} — ${e}`;
}

function LinkOut({ url }: { url?: string | null }) {
  if (!url) return <span className="text-slate-400">Not specified</span>;
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 text-blue-600 underline break-all"
    >
      <Link2 className="w-4 h-4" />
      {url}
    </a>
  );
}

export default function UserProjectsPage() {
  const { data, isLoading, isError } = useGetUserProjects();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const projects = Array.isArray((data as any)?.data)
    ? (data as any).data
    : Array.isArray(data)
      ? (data as any)
      : [];

  if (isLoading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading projects...</p>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-red-100">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FolderGit2 className="w-6 h-6 text-red-600" />
          </div>
          <p className="text-red-600 font-semibold">Failed to load projects</p>
          <p className="text-slate-500 text-sm mt-1">Please try again later</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-8xl mx-auto py-10 px-4 space-y-10">
        {/* 🔹 Page Title with Add Button */}
        <header className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-3">
            <FolderGit2 className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
              User Projects
            </h1>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            Add Project
          </button>
        </header>

        {/* Projects List */}
        {projects.length === 0 ? (
          <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FolderGit2 className="w-6 h-6 text-slate-400" />
            </div>
            <p className="text-slate-600 font-semibold">No projects found</p>
            <p className="text-slate-500 text-sm mt-1">
              Add projects to showcase your work
            </p>
          </div>
        ) : (
          projects.map((p: any) => (
            <article
              key={p.id}
              className="bg-white rounded-3xl shadow-xl border border-slate-200/50 overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              <div className="p-8 border-b border-slate-100">
                <h2 className="text-2xl font-bold text-slate-900 mb-1 flex items-center gap-2">
                  <FolderGit2 className="w-6 h-6 text-blue-600" />
                  {p.title || "Project"}
                </h2>
                <div className="text-slate-600">
                  {period(p.startDate, p.endDate)}
                </div>
              </div>

              <div className="px-8 py-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-6">
                  Project Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <DetailCard
                    label="Project URL"
                    value={<LinkOut url={p.projectUrl} />}
                  />
                  <DetailCard
                    icon={Calendar}
                    label="Start Date"
                    value={formatDate(p.startDate)}
                  />
                  <DetailCard
                    icon={Calendar}
                    label="End Date"
                    value={formatDate(p.endDate) || "Present"}
                  />
                  <DetailCard
                    icon={Calendar}
                    label="Created At"
                    value={formatDate(p.createdAt)}
                  />
                  <DetailCard
                    icon={Calendar}
                    label="Updated At"
                    value={formatDate(p.updatedAt)}
                  />
                </div>
                <LongTextSection label="Description" value={p.description} />
              </div>
            </article>
          ))
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-3xl shadow-xl max-w-lg w-full p-6 relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-slate-500 hover:text-slate-900"
              >
                ✕
              </button>
              <CreateUserProjectForm
                userId="CURRENT_USER_ID" // replace with dynamic user id
                onSuccess={() => setIsModalOpen(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Reuse DetailCard and LongTextSection from your previous component
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
