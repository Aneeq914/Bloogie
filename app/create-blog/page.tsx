import { CreateBlog } from "@/components";
import { getCurrentUser } from "@/lib/dal";

export default async function CreateBlogPage() {
  await new Promise((resolve=>setTimeout(resolve,1000)))
  const user = await getCurrentUser();
  return (
    <div>
      <CreateBlog username={user.username}/>
    </div>
  );
}
