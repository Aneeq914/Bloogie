import mongoose from "mongoose";
import { connectToDB } from "@/lib/dbConnect";
import Blog from "@/models/Blog";

export async function up() {
  await connectToDB();
  const result = await Blog.updateMany(
    { tags: { $not: { $type: "array" } } },
    { $set: { tags: ["General"] } },
  );
  console.log(`Migration completed — ${result.modifiedCount} blogs updated`);
  await mongoose.disconnect();
}

up()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
