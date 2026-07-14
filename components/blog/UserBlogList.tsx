import Image from "next/image";
import { getBlogs } from "@/lib/actions/Blog.action";
import Link from "next/link";
import dayjs from "dayjs";

const UserBlogList = async () => {
  const blogList = await getBlogs();
  return (
    <div className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-1">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Latest posts
          </h2>
          <p className="text-sm text-gray-500">
            Fresh reads from our community of writers.
          </p>
        </div>

        {!blogList?.length ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-20 text-center">
            <p className="text-lg font-medium text-gray-900">No posts yet</p>
            <p className="mt-1 text-sm text-gray-500">
              Check back soon — new blogs are on the way.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogList.map((blog) => (
              <div
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
                    <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 transition group-hover:opacity-100" />
                  </div>
                </Link>

                <div className="flex flex-1 flex-col p-5">
                  {blog.tags && (
                    <Link
                      href={`/tags/${encodeURIComponent(blog.tags)}`}
                      className="mb-2 inline-flex w-fit items-center rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-600 ring-1 ring-inset ring-brand-100 transition hover:bg-brand-100 hover:text-brand-700"
                    >
                      {blog.tags}
                    </Link>
                  )}

                  <Link href={`/detail-page/${blog.id}`}>
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1 transition group-hover:text-brand-600">
                      {blog.title}
                    </h3>
                  </Link>

                  <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600 line-clamp-2">
                    {blog.shortDescription}
                  </p>

                  <div className="mt-4 flex items-center gap-3 border-t border-gray-100 pt-4 text-xs text-gray-500">
                    <span className="font-medium text-gray-700">
                      {blog.author}
                    </span>
                    <time className="text-gray-400">
                      {dayjs(blog.publishedAt).format("MMM DD, YYYY")}
                    </time>
                  </div>
                </div>

                <div className="px-5 pb-5">
                  <Link
                    href={`/detail-page/${blog.id}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 transition hover:gap-2 hover:text-brand-700"
                  >
                    Read more
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserBlogList;
