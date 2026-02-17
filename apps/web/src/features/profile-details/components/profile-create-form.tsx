"use client";

import { useForm } from "react-hook-form";
import {
  CreateUserProfileInput,
  useCreateProfile,
} from "../queries/use-create-profile";

export const CreateProfileForm = () => {
  const {
    mutate: createProfile,
    isPending,
    isError,
    error,
  } = useCreateProfile();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateUserProfileInput>();

  const onSubmit = (data: CreateUserProfileInput) => {
    createProfile(data, {
      onSuccess: () => {
        reset();
        alert("Profile created successfully!");
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto p-6 border rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-xl font-semibold">Create Profile</h2>

      <div>
        <label className="block text-sm font-medium">First Name *</label>
        <input
          type="text"
          {...register("firstName", { required: "First name is required" })}
          className="mt-1 w-full border rounded px-3 py-2"
        />
        {errors.firstName && (
          <p className="text-red-500 text-sm">{errors.firstName.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium">Last Name</label>
        <input
          type="text"
          {...register("lastName")}
          className="mt-1 w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Current Position</label>
        <input
          type="text"
          {...register("currentPosition")}
          className="mt-1 w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Location</label>
        <input
          type="text"
          {...register("location")}
          className="mt-1 w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Website</label>
        <input
          type="url"
          {...register("website")}
          className="mt-1 w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">LinkedIn URL</label>
        <input
          type="url"
          {...register("linkedinUrl")}
          className="mt-1 w-full border rounded px-3 py-2"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isPending ? "Creating..." : "Create Profile"}
      </button>

      {isError && (
        <p className="text-red-500 text-sm mt-2">
          {error instanceof Error ? error.message : "Something went wrong"}
        </p>
      )}
    </form>
  );
};
