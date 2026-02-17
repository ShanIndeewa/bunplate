"use client";

import { CreateUserSkillForm } from "@/features/user-skills/components/skills-create-form";
import { useGetUserSkills } from "@/features/user-skills/queries/use-get-user-skills";
import { Award, Calendar, Pencil, User, X } from "lucide-react";
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

export default function UserSkillsPage() {
  const { data, isLoading, isError } = useGetUserSkills();
  const [showFormModal, setShowFormModal] = useState(false);

  // Normalize API response
  const skills = Array.isArray((data as any)?.data)
    ? (data as any).data
    : Array.isArray(data)
      ? (data as any)
      : [];

  if (isLoading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading skills...</p>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-red-100">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="w-6 h-6 text-red-600" />
          </div>
          <p className="text-red-600 font-semibold">Failed to load skills</p>
          <p className="text-slate-500 text-sm mt-1">Please try again later</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 relative">
      <div className="max-w-8xl mx-auto py-10 px-4 space-y-10">
        {/* 🔹 Page Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 flex items-center justify-center gap-3">
            <Award className="w-8 h-8 text-blue-600" />
            User Skills
          </h1>
          <p className="text-slate-600 mt-2">
            A showcase of technical and professional skills
          </p>

          <button
            onClick={() => setShowFormModal(true)}
            className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            + Add Skill
          </button>
        </header>

        {/* Skills List */}
        {skills.length === 0 && (
          <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6 text-slate-400" />
            </div>
            <p className="text-slate-600 font-semibold">No skills found</p>
            <p className="text-slate-500 text-sm mt-1">
              Add skills to showcase your expertise
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill: any) => (
            <SkillCard
              key={skill.id}
              skill={skill}
              onEdit={() => alert("Edit functionality not implemented yet")}
            />
          ))}
        </div>
      </div>

      {/* Modal for Creating Skill */}
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
            <h2 className="text-2xl font-bold mb-4">Add Skill</h2>
            <CreateUserSkillForm
              userId="current-user-id" // Replace with actual logged-in userId
              onSuccess={() => setShowFormModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// Skill Card Component
function SkillCard({ skill, onEdit }: { skill: any; onEdit: () => void }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-xl transition-shadow relative">
      {/* Edit Button */}
      <div className="absolute top-4 right-4">
        <button
          onClick={onEdit}
          className="inline-flex items-center gap-2 rounded-xl bg-white/90 backdrop-blur px-3 py-1 text-sm font-medium text-slate-700 shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <Pencil className="w-4 h-4" />
          Edit
        </button>
      </div>

      <h3 className="text-lg font-semibold text-slate-900 mb-2 flex items-center gap-2">
        <Award className="w-5 h-5 text-blue-600" />
        {skill.skillName || "Skill"}
      </h3>
      {skill.proficiency && (
        <p className="text-sm text-slate-600 mb-2">
          Proficiency: {skill.proficiency}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <DetailCard label="Skill" value={skill.skillName} />
        <DetailCard label="Proficiency" value={skill.proficiency} />
        <DetailCard
          icon={Calendar}
          label="Created At"
          value={formatDate(skill.createdAt)}
        />
        <DetailCard
          icon={Calendar}
          label="Updated At"
          value={formatDate(skill.updatedAt)}
        />
      </div>
    </div>
  );
}

// Detail Card Component
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
