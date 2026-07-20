import mongoose from "mongoose";
import { connectToDB } from "@/lib/dbConnect";
import Blog from "@/models/Blog";

const authorId = "6a59732502cdc27a01707c66";
const author = "Aneeq_Ahmad";

const blogs = [
  {
    title: "Paginating a Mongoose Query with skip and limit",
    image: "/webdev.jpg",
    shortDescription:
      "Fetching every document just to show nine of them is a habit worth breaking early.",
    longDescription:
      "A find() with no limit works fine on a handful of documents and quietly becomes a problem on a few thousand. The fix is two chained calls: skip() jumps past the documents belonging to earlier pages, and limit() caps what comes back. The page number lives in the URL rather than component state, so the server can read it, run the query, and send back finished HTML. A separate countDocuments() call gives you the total, which divided by the page size tells you how many page buttons to draw.",
    publishedAt: new Date("2026-07-14"),
    tags: ["Web Dev", "MongoDB", "Backend"],
  },
  {
    title: "Server Components Changed Where My Data Fetching Lives",
    image: "/webdev2.jpeg",
    shortDescription:
      "No useEffect, no loading flags, no fetch waterfall — just await at the top of the component.",
    longDescription:
      "The habit from client React was to render an empty shell, fire a fetch in useEffect, hold three pieces of state for data, loading and error, then render again. A server component collapses all of that into a single await before the first render. The data is already there when the HTML is produced, so there is no flash of empty state and no spinner to coordinate. What takes adjusting is the boundary: anything with an onClick or a useState still needs 'use client', so you learn to push interactivity down to the smallest leaf that actually needs it.",
    publishedAt: new Date("2026-07-15"),
    tags: ["Web Dev", "Next.js", "React"],
  },
  {
    title: "Why My Schema Changes Weren't Taking Effect",
    image: "/Productivity.jpeg",
    shortDescription:
      "Reads kept working, writes silently dropped the new field, and nothing appeared in the console.",
    longDescription:
      "Mongoose caches compiled models on the mongoose object so that hot reload does not try to register the same model twice. The pattern mongoose.models.Blog || mongoose.model('Blog', schema) is what makes that work. The tradeoff is that once a model is compiled, editing the schema file does nothing — the cached version keeps running with the old shape. Reads still succeed, which is what makes it confusing, but any field you just added gets stripped on write. There is no warning. The only fix is restarting the dev server so the module graph is rebuilt from scratch.",
    publishedAt: new Date("2026-07-17"),
    tags: ["Web Dev", "MongoDB", "Debugging"],
  },
  {
    title: "Reaching for a Component Library Before Reaching for CSS",
    image: "/habits.jpg",
    shortDescription:
      "Four dependencies and a provider in the root layout, or thirty lines of markup you already understand.",
    longDescription:
      "Wanting a paginator, the first instinct was to install one. That meant a component library, two styling runtime packages, and a framework adapter wired into the root layout — all so a row of numbered buttons would render without a flash of unstyled content. The hand-written version was a map over an array of page numbers with a conditional class. It matched the styling already in the project instead of importing a second design language, and there was nothing new to learn when it needed changing. Libraries earn their weight on genuinely hard problems, like date pickers and virtualised tables. A row of links is not one of them.",
    publishedAt: new Date("2026-07-19"),
    tags: ["Web Dev", "CSS", "Tailwind"],
  },
];

async function seed() {
  await connectToDB();
  const docs = await Blog.create(
    blogs.map((blog) => ({ ...blog, author, authorId, published: true })),
  );
  console.log(`Seeded ${docs.length} blogs`);
  console.log(`Total published: ${await Blog.countDocuments({ published: true })}`);
  await mongoose.disconnect();
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
