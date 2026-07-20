import { Hero, UserBlogList } from "@/components";
import { CATEGORIES, type Category } from "@/type";

// Duplicate keys in a URL (?category=a&category=b) arrive as an array.
const first = (v?: string | string[]) => (Array.isArray(v) ? v[0] : v);

export default async function Home(props: PageProps<"/">) {
  const params = await props.searchParams;

  // The only place raw URL input is trusted — anything not in CATEGORIES
  // becomes undefined, which getBlogs reads as "no filter".
  const raw = first(params.category);
  const category = CATEGORIES.includes(raw as Category)
    ? (raw as Category)
    : undefined;

  return (
    <div className="flex flex-col">
      <div className="flex-1 bg-white">
        <Hero />
      </div>
      <div>
        <UserBlogList
          page={Number(first(params.page)) || 1}
          category={category}
        />
      </div>
    </div>
  );
}
