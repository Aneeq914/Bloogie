import Form from "next/form";
import CategorySelect from "./CategorySelect";

// Server component — `next/form` with a string action is a GET form, so the
// selected category is encoded into the URL as ?category=... on submit.
// No `page` field, so switching category always restarts at page 1.
const CategoryFilter = ({ category }: { category?: string }) => (
  <Form action="/" scroll={false} className="w-full sm:w-auto">
    <div className="relative w-full sm:w-auto">
      <CategorySelect category={category} />

      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400"
      >
        ▾
      </span>
    </div>
  </Form>
);

export default CategoryFilter;
