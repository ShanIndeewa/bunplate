// src/features/userprojects/components/CreateUserProjectForm.tsx
"use client";

import { useForm } from "react-hook-form";
import {
  CreateUserProjectInput,
  useCreateUserProject,
} from "../queries/use-create-user-project";

interface CreateUserProjectFormProps {
  userId: string;
  organizationId?: string;
  onSuccess?: () => void;
}

export const CreateUserProjectForm = ({
  userId,
  organizationId,
  onSuccess,
}: CreateUserProjectFormProps) => {
  const {
    mutate: createProject,
    isPending,
    isError,
    error,
  } = useCreateUserProject();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateUserProjectInput>();

  const onSubmit = (data: CreateUserProjectInput) => {
    createProject(
      { ...data, userId, organizationId },
      {
        onSuccess: () => {
          reset();
          if (onSuccess) onSuccess();
          alert("Project added successfully!");
        },
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto p-6 border rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-xl font-semibold">Add Project</h2>

      <div>
        <label className="block text-sm font-medium">Project Title *</label>
        <input
          type="text"
          {...register("title", { required: "Project title is required" })}
          className="mt-1 w-full border rounded px-3 py-2"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          {...register("description")}
          className="mt-1 w-full border rounded px-3 py-2"
          rows={3}
          placeholder="Add any relevant details about the project"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Project URL</label>
        <input
          type="url"
          {...register("projectUrl")}
          className="mt-1 w-full border rounded px-3 py-2"
          placeholder="e.g., https://github.com/username/project"
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

      <button
        type="submit"
        disabled={isPending}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
      >
        {isPending ? "Adding..." : "Add Project"}
      </button>

      {isError && (
        <p className="text-red-500 text-sm mt-2">
          {error instanceof Error ? error.message : "Something went wrong"}
        </p>
      )}
    </form>
  );
};
