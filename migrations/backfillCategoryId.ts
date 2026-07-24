import mongoose from "mongoose";
import { connectToDB } from "@/lib/dbConnect";
import Category from "@/models/Category";
import Blog from "@/models/Blog";

// Best-effort default so existing posts are filterable immediately —
// tag-based, since blogs have no other signal to categorize by.
// Authors can still change it per-post via the edit form afterward.
export async function up() {
  await connectToDB();

  const design = await Category.findOne({ title: "Design" });
  const technology = await Category.findOne({ title: "Technology" });
  if (!design || !technology) {
    throw new Error(
      "Expected 'Design' and 'Technology' categories to exist — seed categories first",
    );
  }

  const blogs = await Blog.find().select("tags").lean();
  let updated = 0;
  for (const blog of blogs) {
    const isDesign = blog.tags?.some((t: string) =>
      ["CSS", "Tailwind"].includes(t),
    );
    const categoryId = isDesign ? design._id : technology._id;
    await Blog.updateOne({ _id: blog._id }, { $set: { categoryId } });
    updated += 1;
  }
  console.log(`Backfilled categoryId on ${updated} blogs`);

  await mongoose.disconnect();
}

up()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
