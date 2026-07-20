import Link from "next/link";

const Pagination = ({
  page,
  totalPages,
  basePath,
}: {
  page: number;
  totalPages: number;
  basePath: string;
}) => {
  if (totalPages < 2) return null;

  return (
    <nav className="mt-10 flex justify-center gap-1">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
        <Link
          key={n}
          href={`${basePath}?page=${n}#blogs`}
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
