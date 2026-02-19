"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useCreateJob } from "../../queries/use-create-jobs";
import { useGetAllJobCategories } from "../../queries/use-get-job-categories";
import { jobInsertSchema } from "../../schemas/jobs.schema";

type JobFormValues = z.infer<typeof jobInsertSchema>;

export const JobCreateForm = () => {
  const { data: categories, isLoading: categoriesLoading } =
    useGetAllJobCategories();
  const createJobMutation = useCreateJob();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<JobFormValues>({
    resolver: zodResolver(jobInsertSchema) as any,
  });

  const onSubmit = (data: JobFormValues) => {
    // Convert closingDate string to Date
    const formattedData = {
      ...data,
      closingDate: data.closingDate ? new Date(data.closingDate) : null,
    };

    createJobMutation.mutate(formattedData, {
      onSuccess: () => reset(),
    });
  };

  if (categoriesLoading) return <p>Loading categories...</p>;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto space-y-4"
    >
      <div>
        <label>Job Category</label>
        <select {...register("jobCategoryId")} className="w-full border p-2">
          <option value="">Select Category</option>
          {categories?.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.keyword}
            </option>
          ))}
        </select>
        {errors.jobCategoryId && (
          <p className="text-red-500">{errors.jobCategoryId.message}</p>
        )}
      </div>

      <div>
        <label>Title</label>
        <input {...register("title")} className="w-full border p-2" />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      </div>

      <div>
        <label>Location</label>
        <input {...register("location")} className="w-full border p-2" />
        {errors.location && (
          <p className="text-red-500">{errors.location.message}</p>
        )}
      </div>

      <div>
        <label>Experience</label>
        <input
          {...register("experienceRequired")}
          className="w-full border p-2"
        />
        {errors.experienceRequired && (
          <p className="text-red-500">{errors.experienceRequired.message}</p>
        )}
      </div>

      <div>
        <label>Skills</label>
        <input {...register("skills")} className="w-full border p-2" />
        {errors.skills && (
          <p className="text-red-500">{errors.skills.message}</p>
        )}
      </div>

      <div>
        <label>Salary Min</label>
        <input
          type="number"
          {...register("salaryMin", { valueAsNumber: true })}
          className="w-full border p-2"
        />
        {errors.salaryMin && (
          <p className="text-red-500">{errors.salaryMin.message}</p>
        )}
      </div>

      <div>
        <label>Salary Max</label>
        <input
          type="number"
          {...register("salaryMax", { valueAsNumber: true })}
          className="w-full border p-2"
        />
        {errors.salaryMax && (
          <p className="text-red-500">{errors.salaryMax.message}</p>
        )}
      </div>

      <div>
        <label>Description</label>
        <textarea {...register("description")} className="w-full border p-2" />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label>Job Type</label>
        <select {...register("type")} className="w-full border p-2">
          <option value="full_time">Full Time</option>
          <option value="part_time">Part Time</option>
          <option value="contract">Contract</option>
          <option value="internship">Internship</option>
        </select>
      </div>

      <div>
        <label>Number of Vacancies</label>
        <input
          type="number"
          {...register("numberOfVacancies", { valueAsNumber: true })}
          className="w-full border p-2"
        />
        {errors.numberOfVacancies && (
          <p className="text-red-500">{errors.numberOfVacancies.message}</p>
        )}
      </div>

      <div>
        <label>Closing Date</label>
        <input
          type="date"
          {...register("closingDate")}
          className="w-full border p-2"
        />
        {errors.closingDate && (
          <p className="text-red-500">{errors.closingDate.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={createJobMutation.isPending}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {createJobMutation.isPending ? "Creating..." : "Create Job"}
      </button>
    </form>
  );
};
