import { Hero, UserBlogList } from "@/components";

export default async function Home() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return (
    <div className="flex flex-col">
      <div className="flex-1 bg-white">
        <Hero />
      </div>
      <div>
        <UserBlogList />
      </div>
    </div>
  );
}
