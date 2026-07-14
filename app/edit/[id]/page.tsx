import { CreateBlog } from "@/components";
import { getBlog } from "@/lib/actions/Blog.action";

export default async function EditBlogPost({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await new Promise((resolve => setTimeout(resolve,1500)))
  const { id } = await params;

  const blog = await getBlog(id);
  return (
    <div>
      <CreateBlog blog={blog}/>
    </div>
  );
}
