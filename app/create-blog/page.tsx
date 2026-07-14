import { CreateBlog } from "@/components";

export default async function CreateBlogPage() {
  await new Promise((resolve=>setTimeout(resolve,1000)))
  return (
    <div>
      <CreateBlog/>
    </div>
  );
}
