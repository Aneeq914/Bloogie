import { BlogTags } from "@/components";
import { getBlog } from "@/lib/actions/Blog.action";
import { getSession } from "@/lib/dal";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

export default async function DetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  const { id } = await params;
  const details = await getBlog(id);
  const session = await getSession();
  if (!details || (!details.published && details.authorId !== session?.id))
    return (
      <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-24 text-center">
        <p className="text-lg font-medium text-gray-900">Blog not found</p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
        >
          Back to home
        </Link>
      </div>
    );

  return (
    <div className="relative overflow-hidden bg-linear-to-b from-brand-50/60 via-white to-white">
      {/* soft decorative glow, matching the hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-500/10 blur-3xl"
      />

      <article className="relative mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-8">
          <Link
            className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-gray-500 transition hover:gap-2 hover:text-brand-600"
            href="/"
          >
            <span aria-hidden="true">←</span> Back
          </Link>

          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
            {details.title}
          </h1>

          <div className="mt-5 flex items-center gap-3 text-sm text-gray-500">
            <Link
              href={`/author/${details.authorId}`}
              className="font-medium text-gray-700 transition hover:text-brand-600"
            >
              {details.author}
            </Link>
            <time className="text-gray-400">
              {dayjs(details.publishedAt).format("MMM DD, YYYY")}
            </time>
          </div>
        </header>

        <div className="mb-8 overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
          <Image
            src={`${details.image}`}
            alt={details.title}
            width={800}
            height={450}
            className="h-auto w-full object-cover"
          />
        </div>

        <p className="mb-8 border-l-4 border-brand-500 pl-4 text-lg font-medium leading-relaxed text-gray-700">
          {details.shortDescription}
        </p>

        <div className="whitespace-pre-line text-base leading-relaxed text-gray-800">
          {details.longDescription}
        </div>
        <BlogTags/>
      </article>
    </div>
  );
}
