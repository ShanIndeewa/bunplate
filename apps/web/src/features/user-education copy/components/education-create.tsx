// src/features/usereducation/components/CreateUserEducationForm.tsx
"use client";

import { useForm } from "react-hook-form";
import {
  CreateUserEducationInput,
  useCreateUserEducation,
} from "../queries/use-create-user-education";

interface CreateUserEducationFormProps {
  userId: string;
  organizationId?: string;
  onSuccess?: () => void;
}

export const CreateUserEducationForm = ({
  userId,
  organizationId,
  onSuccess,
}: CreateUserEducationFormProps) => {
  const {
    mutate: createEducation,
    isPending,
    isError,
    error,
  } = useCreateUserEducation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateUserEducationInput>();

  const onSubmit = (data: CreateUserEducationInput) => {
    createEducation(
      { ...data, userId, organizationId },
      {
        onSuccess: () => {
          reset();
          if (onSuccess) onSuccess();
          alert("Education added successfully!");
        },
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto p-6 border rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-xl font-semibold">Add Education</h2>

      <div>
        <label className="block text-sm font-medium">Institution Name *</label>
        <input
          type="text"
          {...register("institutionName", {
            required: "Institution name is required",
          })}
          className="mt-1 w-full border rounded px-3 py-2"
        />
        {errors.institutionName && (
          <p className="text-red-500 text-sm">
            {errors.institutionName.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Degree</label>
        <input
          type="text"
          {...register("degree")}
          className="mt-1 w-full border rounded px-3 py-2"
          placeholder="e.g., Bachelor of Science"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Field of Study</label>
        <input
          type="text"
          {...register("fieldOfStudy")}
          className="mt-1 w-full border rounded px-3 py-2"
          placeholder="e.g., Computer Science"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Start Date</label>
          <input
            type="date"
            {...register("startDate")}
            className="mt-1 w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">End Date</label>
          <input
            type="date"
            {...register("endDate")}
            className="mt-1 w-full border rounded px-3 py-2"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Grade / GPA</label>
        <input
          type="text"
          {...register("grade")}
          className="mt-1 w-full border rounded px-3 py-2"
          placeholder="e.g., A+, 3.8 GPA"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          {...register("description")}
          className="mt-1 w-full border rounded px-3 py-2"
          rows={3}
          placeholder="Add any relevant details about your studies"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isPending ? "Adding..." : "Add Education"}
      </button>

      {isError && (
        <p className="text-red-500 text-sm mt-2">
          {error instanceof Error ? error.message : "Something went wrong"}
        </p>
      )}
    </form>
  );
};
