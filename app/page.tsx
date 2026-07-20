import { Hero, UserBlogList } from "@/components";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  return (
    <div className="flex flex-col">
      <div className="flex-1 bg-white">
        <Hero />
      </div>
      <div>
        <UserBlogList page={Number(page) || 1} />
      </div>
    </div>
  );
}
