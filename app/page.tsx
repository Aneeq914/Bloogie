import { Hero, UserBlogList } from "@/components";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>;
}) {
  const { page, category } = await searchParams;
  return (
    <div className="flex flex-col">
      <div className="flex-1 bg-white">
        <Hero />
      </div>
      <div>
        <UserBlogList page={Number(page) || 1} category={category} />
      </div>
    </div>
  );
}
