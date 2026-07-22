import { AuthorBlogList } from "@/components";
import { getCategories } from "@/lib/actions/Category.action";
import Link from "next/link";

export default async function AuthorDashboard({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>;
}) {
  const { page, category: rawCategory } = await searchParams;

  // Same guard as the home page — only forward a category id that's real,
  // otherwise a bad ObjectId string would throw a Mongoose cast error.
  const categories = await getCategories();
  const category = categories.some((c) => c.id === rawCategory)
    ? rawCategory
    : undefined;

  return (
    <div>
      <div className="relative overflow-hidden bg-linear-to-b from-brand-50/60 via-white to-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full bg-brand-500/10 blur-3xl"
        />
        <section className="container-page relative flex flex-col items-center justify-between gap-12 py-16 md:flex-row md:gap-20 md:py-24">
          <div className="max-w-2xl text-center md:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-700">
              <span className="h-2 w-2 rounded-full bg-brand-500" />
              Author dashboard
            </span>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
              Share your{" "}
              <span className="bg-linear-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent">
                stories
              </span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-600 md:text-xl">
              This is your space to publish thoughts, experiences, and knowledge
              on the topics that interest you — from technology and tutorials to
              personal insights. Create engaging content and manage every post
              in one place.
            </p>
          </div>

          <div className="w-full shrink-0 md:w-auto md:min-w-[22rem]">
            <div className="flex flex-col items-stretch gap-5 rounded-2xl border border-gray-200 bg-white/80 p-8 shadow-sm backdrop-blur md:p-10">
              <p className="text-center text-lg font-medium text-gray-700">
                Create stunning blogs with ease.
              </p>
              <div className="flex flex-col gap-3">
                <Link
                  href={"/create-blog"}
                  className="btn-primary py-3.5 text-base"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                    aria-hidden
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 8v8M8 12h8" />
                  </svg>
                  Create Blog
                </Link>
                <Link
                  href={"/create-category"}
                  className="btn-secondary py-3.5 text-base"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                    aria-hidden
                  >
                    <path d="M20.59 13.41 11 3.83A2 2 0 0 0 9.59 3.24H4a1 1 0 0 0-1 1v5.59a2 2 0 0 0 .59 1.41l9.58 9.59a2 2 0 0 0 2.83 0l4.59-4.59a2 2 0 0 0 0-2.83Z" />
                    <circle cx="7.5" cy="7.5" r="1.5" />
                  </svg>
                  Create Category
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div>
        <AuthorBlogList page={Number(page) || 1} category={category} />
      </div>
    </div>
  );
}
