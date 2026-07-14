import { AuthorBlogList } from "@/components";
import Link from "next/link";

export default function AuthorDashboard() {
  return (
    <div>
      <div>
        <section className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-12 px-6 py-16 md:flex-row md:gap-20 md:py-24">
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

          <div className="w-full shrink-0 md:w-auto">
            <div className="flex flex-col items-center gap-5 rounded-2xl border border-gray-200 bg-white/70 p-8 shadow-sm backdrop-blur md:p-10">
              <p className="text-center text-lg font-medium text-gray-700">
                Create stunning blogs with ease.
              </p>
              <Link
                href={"/create-blog"}
                className="block w-full cursor-pointer rounded-lg bg-brand-600 px-8 py-4 text-center font-semibold tracking-wide text-white shadow-sm transition hover:bg-brand-700 hover:shadow-md active:scale-95"
              >
                CREATE&nbsp;BLOG
              </Link>
            </div>
          </div>
        </section>
      </div>
      <div>
        <AuthorBlogList />
      </div>
    </div>
  );
}
