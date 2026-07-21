import { Hero, UserBlogList } from "@/components";
import { getCategories } from "@/lib/actions/Blog.action";

// Duplicate keys in a URL (?category=a&category=b) arrive as an array.
const first = (v?: string | string[]) => (Array.isArray(v) ? v[0] : v);

export default async function Home(props: PageProps<"/">) {
  const params = await props.searchParams;

  // The only place raw URL input is trusted — anything that isn't a real
  // category id becomes undefined (getBlogs reads that as "no filter").
  // Forwarding a non-ObjectId string would throw a Mongoose cast error.
  const categories = await getCategories();
  const raw = first(params.category);
  const category = categories.some((c) => c.id === raw) ? raw : undefined;

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
