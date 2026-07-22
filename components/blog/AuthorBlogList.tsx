import { getBlogsByAuthor } from "@/lib/actions/Blog.action";
import { getCategories } from "@/lib/actions/Category.action";
import { getSession } from "@/lib/dal";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import PublishButton from "./PublishButton";
import Pagination from "./Pagination";
import CategoryFilter from "./CategoryFilter";

const AuthorBlogList = async ({
  page,
  category,
}: {
  page: number;
  category?: string;
}) => {
  const session = await getSession();
  const [{ blogs, totalPages } = {}, categories] = await Promise.all([
    session?.id
      ? getBlogsByAuthor(session.id as string, page, category)
      : Promise.resolve(undefined),
    getCategories(),
  ]);
  const categoryTitle = new Map(categories.map((c) => [c.id, c.categoriesTitle]));

  return (
      <div className="min-h-screen py-12">
        <div className="container-page">
          <div
            id="blogs"
            className="mb-8 flex scroll-mt-20 flex-row items-start justify-between gap-4"
          >
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Your posts
              </h2>
              <p className="text-sm text-gray-500">
                Manage, edit, and publish everything you&apos;ve written.
              </p>
            </div>

            <CategoryFilter category={category} basePath="/author-dashboard" />
          </div>

          {!blogs?.length ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-20 text-center">
              <p className="text-lg font-medium text-gray-900">No posts yet</p>
              <p className="mt-1 text-sm text-gray-500">
                Your published blogs will show up here.
              </p>
              <Link href="/create-blog" className="btn-primary mt-6">
                Create your first blog
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog, index) => (
                <div key={blog.id} className="group flex flex-col overflow-hidden card-hover">
                  <Link href={`/detail-page/${blog.id}`} className="block">
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        unoptimized
                        priority={index === 0}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 transition group-hover:opacity-100" />
                      {blog.categoryId && categoryTitle.get(blog.categoryId) && (
                        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-brand-700 shadow-sm backdrop-blur">
                          {categoryTitle.get(blog.categoryId)}
                        </span>
                      )}
                    </div>
                  </Link>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-2 flex flex-wrap gap-1.5">
                      {!blog.published && (
                        <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-100">
                          Draft
                        </span>
                      )}
                      {blog.tags?.map((tag: string) => (
                        <button
                          key={tag}
                          className="badge transition hover:bg-brand-100 hover:text-brand-700"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>

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

                  <div className="flex items-center justify-end gap-2 px-5 pb-5 text-xs">
                    {!blog.published && (
                      <Link
                        href={`/edit/${blog.id}`}
                        className="inline-flex items-center rounded-full bg-brand-50 px-3.5 py-1.5 font-medium text-brand-600 transition hover:bg-brand-100"
                      >
                        Edit Post
                      </Link>
                    )}
                    <PublishButton id={`${blog.id}`} published={blog.published} />
                    {!blog.published && <DeleteButton id={`${blog.id}`} />}
                  </div>
                </div>
              ))}
            </div>
          )}

          <Pagination
            page={page}
            totalPages={totalPages ?? 0}
            basePath="/author-dashboard"
            params={category ? { category } : undefined}
          />
        </div>
      </div>
  );
};

export default AuthorBlogList;
