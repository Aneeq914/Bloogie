import { CreateBlog } from "@/components";
import { getCurrentUser } from "@/lib/dal";
import { redirect } from "next/navigation";

export default async function CreateBlogPage() {
  await new Promise((resolve=>setTimeout(resolve,1000)))
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return (
    <div>
      <CreateBlog username={user.username}/>
    </div>
  );
}
