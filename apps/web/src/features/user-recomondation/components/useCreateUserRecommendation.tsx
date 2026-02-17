// src/features/userrecommendations/components/CreateUserRecommendationForm.tsx
"use client";

import { useForm } from "react-hook-form";
import {
  CreateUserRecommendationInput,
  useCreateUserRecommendation,
} from "../queries/use-get-user-create-recomondation";

interface CreateUserRecommendationFormProps {
  userId: string;
  organizationId?: string;
  onSuccess?: () => void;
}

export const CreateUserRecommendationForm = ({
  userId,
  organizationId,
  onSuccess,
}: CreateUserRecommendationFormProps) => {
  const {
    mutate: createRecommendation,
    isPending,
    isError,
    error,
  } = useCreateUserRecommendation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateUserRecommendationInput>();

  const onSubmit = (data: CreateUserRecommendationInput) => {
    createRecommendation(
      { ...data, userId, organizationId },
      {
        onSuccess: () => {
          reset();
          if (onSuccess) onSuccess();
          alert("Recommendation added successfully!");
        },
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto p-6 border rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-xl font-semibold">Add Recommendation</h2>

      <div>
        <label className="block text-sm font-medium">Recommender Name *</label>
        <input
          type="text"
          {...register("recommenderName", {
            required: "Recommender name is required",
          })}
          className="mt-1 w-full border rounded px-3 py-2"
        />
        {errors.recommenderName && (
          <p className="text-red-500 text-sm">
            {errors.recommenderName.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Recommender Title</label>
        <input
          type="text"
          {...register("recommenderTitle")}
          className="mt-1 w-full border rounded px-3 py-2"
          placeholder="e.g., Senior Manager, CEO"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Recommendation Text</label>
        <textarea
          {...register("text")}
          className="mt-1 w-full border rounded px-3 py-2"
          rows={4}
          placeholder="Write the recommendation here..."
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
      >
        {isPending ? "Adding..." : "Add Recommendation"}
      </button>

      {isError && (
        <p className="text-red-500 text-sm mt-2">
          {error instanceof Error ? error.message : "Something went wrong"}
        </p>
      )}
    </form>
  );
};
