"use client";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { blogPostSchema } from "@/schemas/blogpostSchema";
import Link from "next/link";
import { updateBlog } from "@/lib/actions/Blog.action";
import { AllBlogProps, CategoriesProps } from "@/type";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { toast } from "sonner";
import { selectStyles } from "@/lib/selectStyles";

interface BlogProps {
  blog?: Omit<AllBlogProps, "createdAt" | "updatedAt">;
  username: string;
  categories: CategoriesProps[];
}

type BlogFormData = z.infer<typeof blogPostSchema>;

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const CreateBlog = ({ blog, username, categories }: BlogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState(blog?.image || "");

  const router = useRouter();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: blog?.title ?? "",
      image: blog?.image ?? "",
      shortDescription: blog?.shortDescription ?? "",
      longDescription: blog?.longDescription ?? "",
      tags: blog?.tags ?? [],
      categoryId: blog?.categoryId,
    },
  });

  const onSubmit = async (data: BlogFormData) => {
    setIsSubmitting(true);
    const result = await updateBlog({
      id: blog?.id,
      title: data.title,
      image: data.image,
      shortDescription: data.shortDescription,
      longDescription: data.longDescription,
      publishedAt: new Date(),
      tags: data.tags,
      categoryId: data.categoryId,
    });
    setIsSubmitting(false);

    if (!result.success) {
      toast.error(result.message);
      if (result.authExpired) router.refresh();
      return;
    }

    toast.success(result.message);
    router.push("/author-dashboard");
  };
  const isEdit = Boolean(blog);

  const previewBlock = preview ? (
    <div
      className={`relative h-64 ${
        isEdit
          ? "w-full max-w-lg overflow-hidden rounded-2xl ring-1 ring-gray-200 shadow-md ring-offset-2 ring-offset-gray-50"
          : "w-full overflow-hidden rounded-xl"
      }`}
    >
      <Image
        src={preview}
        alt="Preview"
        fill
        className="object-cover"
        unoptimized
      />
    </div>
  ) : null;

  const shortDescription = watch("shortDescription");

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center gap-6 overflow-hidden bg-linear-to-b from-gray-50 to-gray-100 px-4 py-10 sm:px-6 lg:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-500/10 blur-3xl"
      />
      {isEdit && previewBlock}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex w-full max-w-lg flex-col gap-4 p-6 md:p-8 card"
      >
        <div className="mb-2 flex items-center gap-3">
          <span className="icon-badge" aria-hidden>
            {isEdit ? (
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
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4Z" />
              </svg>
            ) : (
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
                <path d="M12 5v14M5 12h14" />
              </svg>
            )}
          </span>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isEdit ? "Edit Blog" : "Create a Blog"}
            </h1>
            <p className="mt-0.5 text-sm text-gray-500">
              {isEdit
                ? "Update the details below and save your changes."
                : "Fill in the details below to publish your post."}
            </p>
          </div>
        </div>
        <div>
          <label htmlFor="title" className="label">
            Title
          </label>
          <Controller
            name="title"
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <input
                id="title"
                placeholder="Enter the blog title"
                className="input"
                {...field}
              />
            )}
          />
          {errors.title && <p className="error">{errors.title.message}</p>}
        </div>
        <div>
          <label htmlFor="author" className="label">
            Author
          </label>
          <input
            id="author"
            value={username}
            disabled
            className="input disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500"
          />
        </div>
        <div>
          <label htmlFor="image" className="label">
            Image
          </label>

          <Controller
            name="image"
            control={control}
            render={({ field: { onChange } }) => (
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) {
                    onChange("");
                    return;
                  }
                  const objectUrl = URL.createObjectURL(file);
                  setPreview(objectUrl);

                  const base64 = await fileToBase64(file);
                  onChange(base64);
                }}
                className="input cursor-pointer file:mr-3 file:rounded-md file:border-0 file:bg-brand-50 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-brand-600 hover:file:bg-brand-100"
              />
            )}
          />
          {!isEdit && previewBlock}
          {errors.image && <p className="error">{errors.image.message}</p>}
        </div>
        <div>
          <label htmlFor="shortDescription" className="label">
            ShortDescription
          </label>

          <Controller
            name="shortDescription"
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <input
                id="shortDescription"
                placeholder="A short summary of the blog"
                className="input"
                {...field}
              />
            )}
          />
          <p className="text-right text-xs text-gray-500">
            {shortDescription?.length ?? 0}/150
          </p>
          {errors.shortDescription && (
            <p className="error">{errors.shortDescription.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="longDescription" className="label">
            LongDescription
          </label>
          <Controller
            name="longDescription"
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <textarea
                id="longDescription"
                rows={6}
                placeholder="Write the full blog content"
                className="input"
                {...field}
              />
            )}
          />

          {errors.longDescription && (
            <p className="error">{errors.longDescription.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="categoryId" className="label">
            Category
          </label>
          <Controller
            name="categoryId"
            control={control}
            render={({ field }) => {
              const options = categories.map((c) => ({
                label: c.title,
                value: c.id,
              }));
              return (
                <Select
                  instanceId="categoryId"
                  placeholder="Pick a category"
                  options={options}
                  styles={selectStyles<false>()}
                  value={
                    options.find((o) => o.value === field.value) ?? null
                  }
                  onChange={(o) => field.onChange(o?.value)}
                  onBlur={field.onBlur}
                />
              );
            }}
          />
          {errors.categoryId && (
            <p className="error">{errors.categoryId.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="tags" className="label">
            Tags
          </label>
          <Controller
            name="tags"
            control={control}
            render={({ field }) => (
              <CreatableSelect
                isMulti
                instanceId="tags"
                placeholder="e.g. Web Dev"
                styles={selectStyles<true>()}
                value={field.value?.map((t) => ({ label: t, value: t }))}
                onChange={(e) => field.onChange(e.map((o) => o.value))}
                onBlur={field.onBlur}
              />
            )}
          />
          <p className="mt-1 text-xs text-gray-500">
            Optional — shown as a badge on the blog card.
          </p>
          {errors.tags && <p className="error">{errors.tags.message}</p>}
        </div>
        <button
          title="CreateBlog"
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
            : isEdit
              ? "Save\u00A0Changes"
              : "Create\u00A0Blog"}
        </button>
        <Link
          href="/author-dashboard"
          className="text-center text-sm font-medium text-gray-500 transition hover:text-gray-700"
        >
          ← Back
        </Link>
      </form>
    </div>
  );
};

export default CreateBlog;

