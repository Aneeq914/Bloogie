import Link from "next/link";

const Pagination = ({
  page,
  totalPages,
  basePath,
  params,
}: {
  page: number;
  totalPages: number;
  basePath: string;
  // Any active filters to carry across page changes. Kept generic so a new
  // filter doesn't silently get dropped the way `category` once was.
  params?: Record<string, string>;
}) => {
  if (totalPages < 2) return null;

  const href = (n: number) => {
    const query = new URLSearchParams(params);
    query.set("page", String(n));
    return `${basePath}?${query}#blogs`;
  };

  return (
    <nav className="mt-10 flex justify-center gap-1">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
        <Link
          key={n}
          href={href(n)}
          className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
            n === page
              ? "bg-brand-600 text-white"
              : "text-gray-700 ring-1 ring-inset ring-gray-200 hover:bg-brand-50 hover:text-brand-600"
          }`}
        >
          {n}
        </Link>
      ))}
    </nav>
  );
};

export default Pagination;
