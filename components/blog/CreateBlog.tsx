"use client";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { blogPostSchema } from "@/schemas/blogpostSchema";
import Link from "next/link";
import { updateBlog } from "@/lib/actions/Blog.action";
import { AllBlogProps } from "@/type";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { inputClass, labelClass, errorClass, primaryButton, cardClass } from "@/lib/ui";


interface BlogProps {
  blog?: Omit<AllBlogProps, "createdAt" | "updatedAt">;
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

const CreateBlog = ({ blog }: BlogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState(blog?.image || "");

  const router = useRouter()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: blog?.title ?? "",
      author: blog?.author ?? "",
      image: blog?.image ?? "",
      shortDescription: blog?.shortDescription ?? "",
      longDescription: blog?.longDescription ?? "",
      tags: blog?.tags ?? "",
    },
  });

  const onSubmit = async (data: BlogFormData) => {
    setIsSubmitting(true);
    try {
      await updateBlog({
        id: blog?.id,
        title: data.title,
        author: data.author,
        image: data.image,
        shortDescription: data.shortDescription,
        longDescription: data.longDescription,
        publishedAt: new Date(),
        tags : data.tags,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
      router.push("/author-dashboard")
    }
  };
    const isEdit = Boolean(blog)
  

    
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

  return (
    <div className="flex min-h-screen w-full flex-col items-center gap-6 bg-linear-to-b from-gray-50 to-gray-100 px-4 py-10">
      {isEdit && previewBlock}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`flex w-full max-w-lg flex-col gap-4 p-6 md:p-8 ${cardClass}`}
      >
        <div className="mb-2">
          <h1 className="text-2xl font-bold text-gray-900">
            {isEdit ? "Edit Blog" : "Create a Blog"}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {isEdit
              ? "Update the details below and save your changes."
              : "Fill in the details below to publish your post."}
          </p>
        </div>
        <div>
          <label htmlFor="title" className={`${labelClass}`}>
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
                className={`${inputClass}`}
                {...field}
              />
            )}
          />
          {errors.title && (
            <p className={`${errorClass}`}>{errors.title.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="author" className={`${labelClass}`}>
            Author
          </label>

          <Controller
            name="author"
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <input
                id="author"
                placeholder="Enter the author's name"
                className={`${inputClass}`}
                {...field}
              />
            )}
          />
          {errors.author && (
            <p className={`${errorClass}`}>{errors.author.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="image" className={`${labelClass}`}>
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
                className={`${inputClass} cursor-pointer file:mr-3 file:rounded-md file:border-0 file:bg-brand-50 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-brand-600 hover:file:bg-brand-100`}
              />
            )}
          />
          {!isEdit && previewBlock}
          {errors.image && (
            <p className={`${errorClass}`}>{errors.image.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="shortDescription" className={`${labelClass}`}>
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
                className={`${inputClass}`}
                {...field}
              />
            )}
          />
          {errors.shortDescription && (
            <p className={`${errorClass}`}>{errors.shortDescription.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="longDescription" className={`${labelClass}`}>
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
                className={`${inputClass}`}
                {...field}
              />
            )}
          />
          {errors.longDescription && (
            <p className={`${errorClass}`}>{errors.longDescription.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="tags" className={`${labelClass}`}>
            Tags
          </label>
          <Controller
            name="tags"
            control={control}
            render={({ field }) => (
              <input
                id="tags"
                placeholder="e.g. Web Dev"
                className={`${inputClass}`}
                {...field}
                value={field.value ?? ""}
              />
            )}
          />
          <p className="mt-1 text-xs text-gray-500">
            Optional — shown as a badge on the blog card.
          </p>
          {errors.tags && (
            <p className={`${errorClass}`}>{errors.tags.message}</p>
          )}
        </div>
        <button
          title="CreateBlog"
          type="submit"
          disabled={isSubmitting}
          className={`mt-2 w-full ${primaryButton}`}
        >
          {isSubmitting ? "Saving..." : isEdit ? "Save\u00A0Changes" : "Create\u00A0Blog"}
        </button>
        <Link
          href={`/`}
          className="text-center text-sm font-medium text-gray-500 transition hover:text-gray-700"
        >
          ← Back
        </Link>
      </form>
    </div>
  );
};

export default CreateBlog;
