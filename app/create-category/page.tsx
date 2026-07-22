import { CreateCategory } from "@/components";
import { getCategories } from "@/lib/actions/Category.action";
import { getCurrentUser } from "@/lib/dal";
import { redirect } from "next/navigation";

export default async function CreateCategoryPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const categories = await getCategories();
  return (
    <div>
      <CreateCategory categories={categories} />
    </div>
  );
}
