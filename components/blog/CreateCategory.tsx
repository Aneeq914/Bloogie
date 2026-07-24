"use client";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { categorySchema } from "@/schemas/categorySchema";
import Link from "next/link";
import { createCategory, updateCategory } from "@/lib/actions/Category.action";
import { CategoriesProps } from "@/type";
import { toast } from "sonner";

type CategoryFormData = z.infer<typeof categorySchema>;

const CreateCategory = ({ categories }: { categories: CategoriesProps[] }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: { title: "" },
  });

  const handleSelect = (category: CategoriesProps) => {
    setEditingId(category.id);
    setValue("title", category.title);
  };

  const onSubmit = async (data: CategoryFormData) => {
    setIsSubmitting(true);
    const result = editingId
      ? await updateCategory({ id: editingId, title: data.title })
      : await createCategory(data);
    setIsSubmitting(false);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    setEditingId("");
    reset();
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center gap-6 overflow-hidden bg-linear-to-b from-gray-50 to-gray-100 px-4 py-10 sm:px-6 lg:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-500/10 blur-3xl"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex w-full max-w-lg flex-col gap-4 p-6 md:p-8 card"
      >
        <div className="mb-2 flex items-center gap-3">
          <span className="icon-badge" aria-hidden>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M20.59 13.41 11 3.83A2 2 0 0 0 9.59 3.24H4a1 1 0 0 0-1 1v5.59a2 2 0 0 0 .59 1.41l9.58 9.59a2 2 0 0 0 2.83 0l4.59-4.59a2 2 0 0 0 0-2.83Z" />
              <circle cx="7.5" cy="7.5" r="1.5" />
            </svg>
          </span>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {editingId ? "Edit Category" : "Create a Category"}
            </h1>
            <p className="mt-0.5 text-sm text-gray-500">
              {editingId
                ? "Update the category title below."
                : "Add a new category blogs can be grouped under."}
            </p>
          </div>
        </div>
        <div>
          <label htmlFor="title" className="label">
            Title
          </label>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <input
                id="title"
                placeholder="e.g. Technology"
                className="input"
                {...field}
              />
            )}
          />
          {errors.title && <p className="error">{errors.title.message}</p>}
        </div>
        <button
          title="CreateCategory"
          type="submit"
          disabled={isSubmitting}
          className="mt-2 w-full btn-primary"
        >
          {isSubmitting && (
            <span
              aria-hidden
              className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white"
            />
          )}
          {isSubmitting
            ? "Saving..."
            : editingId
              ? "Save Changes"
              : "Create Category"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId("");
              reset();
            }}
            className="cursor-pointer text-center text-sm font-medium text-gray-500 transition hover:text-gray-700"
          >
            Cancel edit
          </button>
        )}
        <Link
          href="/author-dashboard"
          className="text-center text-sm font-medium text-gray-500 transition hover:text-gray-700"
        >
          ← Back
        </Link>
      </form>

      {categories.length > 0 && (
        <div className="relative w-full max-w-lg p-6 md:p-8 card">
          <h2 className="mb-3 text-sm font-semibold text-gray-900">
            Existing categories
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((c) => (
              <button
                type="button"
                onClick={() => handleSelect(c)}
                key={c.id}
                className={`badge cursor-pointer transition hover:bg-brand-100 hover:text-brand-700 ${editingId === c.id ? "bg-brand-100 text-brand-700" : ""}`}
              >
                {c.title}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCategory;
