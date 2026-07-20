import mongoose from "mongoose";
import { connectToDB } from "@/lib/dbConnect";
import Blog from "@/models/Blog";

export async function up() {
  await connectToDB();

  const design = await Blog.updateMany(
    { category: { $exists: false }, tags: { $in: ["CSS", "Tailwind"] } },
    { $set: { category: "Design" } },
  );
  const technology = await Blog.updateMany(
    { category: { $exists: false } },
    { $set: { category: "Technology" } },
  );

  console.log(
    `Migration completed — ${design.modifiedCount} Design, ${technology.modifiedCount} Technology`,
  );
  await mongoose.disconnect();
}

up()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
