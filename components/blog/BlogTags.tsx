import Link from "next/link";

const BlogTags = ({ tags }: { tags: string[] }) => {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-1">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          You may like
        </h2>
        <p className="text-sm text-gray-500">
          Explore more posts from the topics you write about.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        {tags?.slice(0, 3).map((tag) => (
          <Link
            key={tag}
            href={"/tag-details"}
            className="inline-flex items-center rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-brand-100 hover:bg-gray-100 hover:text-brand-600 hover:shadow-lg"
          >
            {tag}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogTags;
