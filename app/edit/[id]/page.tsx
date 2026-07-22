import { CreateBlog } from "@/components";
import { getBlog } from "@/lib/actions/Blog.action";
import { getCategories } from "@/lib/actions/Category.action";
import { getCurrentUser } from "@/lib/dal";
import { redirect } from "next/navigation";

export default async function EditBlogPost({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await new Promise((resolve => setTimeout(resolve,1500)))
  const { id } = await params;

  const blog = await getBlog(id);
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const categories = await getCategories();
  return (
    <div>
      <CreateBlog blog={blog} username={user.username} categories={categories} />
    </div>
  );
}
