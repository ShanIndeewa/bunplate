// src/features/userskills/components/CreateUserSkillForm.tsx
"use client";

import { useForm } from "react-hook-form";
import {
  CreateUserSkillInput,
  useCreateUserSkill,
} from "../queries/use-create-skills";

interface CreateUserSkillFormProps {
  userId: string;
  organizationId?: string;
  onSuccess?: () => void;
}

export const CreateUserSkillForm = ({
  userId,
  organizationId,
  onSuccess,
}: CreateUserSkillFormProps) => {
  const {
    mutate: createSkill,
    isPending,
    isError,
    error,
  } = useCreateUserSkill();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateUserSkillInput>();

  const onSubmit = (data: CreateUserSkillInput) => {
    createSkill(
      { ...data, userId, organizationId },
      {
        onSuccess: () => {
          reset();
          if (onSuccess) onSuccess();
          alert("Skill added successfully!");
        },
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto p-6 border rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-xl font-semibold">Add Skill</h2>

      <div>
        <label className="block text-sm font-medium">Skill Name *</label>
        <input
          type="text"
          {...register("skillName", { required: "Skill name is required" })}
          className="mt-1 w-full border rounded px-3 py-2"
        />
        {errors.skillName && (
          <p className="text-red-500 text-sm">{errors.skillName.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Proficiency</label>
        <input
          type="text"
          {...register("proficiency")}
          className="mt-1 w-full border rounded px-3 py-2"
          placeholder="e.g., Beginner, Intermediate, Expert"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isPending ? "Adding..." : "Add Skill"}
      </button>

      {isError && (
        <p className="text-red-500 text-sm mt-2">
          {error instanceof Error ? error.message : "Something went wrong"}
        </p>
      )}
    </form>
  );
};
