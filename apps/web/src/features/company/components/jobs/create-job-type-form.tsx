// src/features/jobcategories/components/job-category-create-form.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  CreateJobCategoryInput,
  useCreateJobCategory,
} from "../../queries/use-create-job-categories";
import { useGetJobCategoryTypes } from "../../queries/use-get-job-category-types";
import { jobCategoryTypeSchema } from "../../schemas/jobCategory.schema";

const schema = z.object({
  keyword: z.string().min(2, "Keyword is required"),
  description: z.string().optional().nullable(),
  type: jobCategoryTypeSchema,
});

type FormValues = z.infer<typeof schema>;

interface Props {
  redirectTo?: string;
  onSuccess?: (id: string) => void; // <-- was number
}

export default function JobCategoryCreateForm({
  redirectTo = "/account/manage/jobs",
  onSuccess,
}: Props) {
  const router = useRouter();
  const { mutateAsync, isPending } = useCreateJobCategory();
  const { data: jobCategoryTypes, isLoading: isLoadingTypes } =
    useGetJobCategoryTypes();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema) as any,
    defaultValues: { keyword: "", description: "", type: "Technology" },
  });

  const onSubmit = async (values: FormValues) => {
    const payload: CreateJobCategoryInput = {
      keyword: values.keyword.trim(),
      description:
        values.description !== undefined && values.description !== null
          ? values.description.trim() || null
          : null,
      type: values.type,
    };

    try {
      const created = await mutateAsync(payload); // created.id is now string
      onSuccess?.(created.id);
      reset();
      router.push(redirectTo);
      // If you'd rather go to the new record's page:
      // router.push(`${redirectTo}/${created.id}`);
    } catch (err: any) {
      alert(err?.message ?? "Failed to create job category");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-xl space-y-4 rounded-2xl border p-6 shadow-sm"
    >
      <div>
        <h2 className="text-xl font-semibold">Create Job Category</h2>
        <p className="text-sm text-gray-500">
          Add a new category keyword and an optional description.
        </p>
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium">Keyword</label>
        <input
          type="text"
          placeholder="e.g., Frontend, DevOps, QA"
          {...register("keyword")}
          className="w-full rounded-lg border px-3 py-2 outline-none focus:ring"
        />
        {errors.keyword && (
          <p className="text-sm text-red-600">{errors.keyword.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium">Type</label>
        <select
          {...register("type")}
          className="w-full rounded-lg border px-3 py-2 outline-none focus:ring"
          disabled={isLoadingTypes}
        >
          {isLoadingTypes ? (
            <option value="">Loading types...</option>
          ) : (
            jobCategoryTypes?.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))
          )}
        </select>
        {errors.type && (
          <p className="text-sm text-red-600">{errors.type.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium">
          Description (optional)
        </label>
        <textarea
          rows={4}
          placeholder="Short description of this category"
          {...register("description")}
          className="w-full resize-y rounded-lg border px-3 py-2 outline-none focus:ring"
        />
        {errors.description && (
          <p className="text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="rounded-xl px-4 py-2 font-medium text-white disabled:opacity-70"
          style={{ background: "black" }}
        >
          {isPending ? "Creating..." : "Create"}
        </button>
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-xl border px-4 py-2"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
