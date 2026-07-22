import { getAuthorProfile } from "@/lib/actions/Auth.action";
import { getPublishedBlogsByAuthor } from "@/lib/actions/Blog.action";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const author = await getAuthorProfile(id);

  if (!author)
    return (
      <div className="container-page-sm flex flex-col items-center py-24 text-center">
        <p className="text-lg font-medium text-gray-900">Author not found</p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
        >
          Back to home
        </Link>
      </div>
    );

  const blogs = await getPublishedBlogsByAuthor(id);

  return (
    <div className="relative overflow-hidden bg-linear-to-b from-brand-50/60 via-white to-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-500/10 blur-3xl"
      />

      <section className="container-page-sm relative py-16 text-center md:py-24">
        <Image
          src={author.image || "/Profile.png"}
          alt={author.username}
          width={96}
          height={96}
          unoptimized
          className="mx-auto h-24 w-24 rounded-full object-cover ring-4 ring-white shadow-md"
        />

        <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
          {author.fname} {author.lname}
        </h1>

        <p className="mt-1 text-sm font-medium text-brand-600">
          @{author.username}
        </p>

        {author.bio && (
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-gray-600">
            {author.bio}
          </p>
        )}

        <p className="mt-6 text-sm text-gray-500">
          {blogs?.length ?? 0} published{" "}
          {blogs?.length === 1 ? "post" : "posts"}
        </p>
      </section>

      <div className="pb-16">
        <div className="container-page">
          {!blogs?.length ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-20 text-center">
              <p className="text-lg font-medium text-gray-900">
                Nothing published yet
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Check back soon — {author.username} is probably writing.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog) => (
                <article
                  key={blog.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:border-brand-100 hover:shadow-lg"
                >
                  <Link href={`/detail-page/${blog.id}`} className="block">
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        unoptimized
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition duration-300 group-hover:scale-105"
                      />
                    </div>
                  </Link>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-2 flex flex-wrap gap-1.5">
                      {blog.tags?.map((tag: string) => (
                        <button
                          key={tag}
                          className="inline-flex w-fit items-center rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-600 ring-1 ring-inset ring-brand-100 transition hover:bg-brand-100 hover:text-brand-700"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>

                    <Link href={`/detail-page/${blog.id}`}>
                      <h2 className="text-lg font-semibold text-gray-900 line-clamp-1 transition group-hover:text-brand-600">
                        {blog.title}
                      </h2>
                    </Link>

                    <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600 line-clamp-2">
                      {blog.shortDescription}
                    </p>

                    <div className="mt-4 border-t border-gray-100 pt-4 text-xs text-gray-500">
                      <time className="text-gray-400">
                        {dayjs(blog.publishedAt).format("MMM DD, YYYY")}
                      </time>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
