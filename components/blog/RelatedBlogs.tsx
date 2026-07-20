import { getRelatedBlogs } from "@/lib/actions/Blog.action";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

const RelatedBlogs = async ({ id, tags }: { id: string; tags?: string[] }) => {
  const blogs = await getRelatedBlogs(id, tags ?? []);
  if (!blogs?.length) return null;

  return (
    <div className="mt-16">
      <div className="mb-6 flex flex-col gap-1">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          You may like
        </h2>
        <p className="text-sm text-gray-500">
          More posts on the topics this one covers.
        </p>
      </div>

      <div className="rounded-3xl bg-gray-100 p-6 sm:p-8">
        <div className="-mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 sm:-mx-8 sm:px-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="group flex w-72 shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:border-brand-100 hover:shadow-lg"
            >
              <Link href={`/detail-page/${blog.id}`} className="block">
                <div className="relative h-40 w-full overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    unoptimized
                    sizes="288px"
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
              </Link>

              <div className="flex flex-1 flex-col p-5">
                <Link href={`/detail-page/${blog.id}`}>
                  <h3 className="text-base font-semibold text-gray-900 line-clamp-1 transition group-hover:text-brand-600">
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedBlogs;
