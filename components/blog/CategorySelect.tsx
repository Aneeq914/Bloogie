"use client";

import { CategoriesProps } from "@/type";

// The only client code in the filter: submit the surrounding <Form> as soon as
// a category is picked, so no "Filter" button is needed. Without JS the select
// still works — it just needs the form's own submit to apply.
const CategorySelect = ({
  categories,
  category,
}: {
  categories: CategoriesProps[];
  category?: string;
}) => (
  <select
    name="category"
    defaultValue={category ?? ""}
    onChange={(e) => e.currentTarget.form?.requestSubmit()}
    className="w-full cursor-pointer appearance-none rounded-full border border-gray-200 bg-white py-3 pr-10 pl-5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:border-gray-300 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
  >
    <option value="">All categories</option>
    {categories.map((c) => (
      <option key={c.id} value={c.id}>
        {c.categoriesTitle}
      </option>
    ))}
  </select>
);

export default CategorySelect;
