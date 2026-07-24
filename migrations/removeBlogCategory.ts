import mongoose from "mongoose";
import { connectToDB } from "@/lib/dbConnect";
import Blog from "@/models/Blog";

// Leftover from before the categories rebuild — blogs carry a stray raw
// `category` string alongside the real `categoryId` ref. Not in the schema,
// just dead data; categoryId stays untouched.
export async function up() {
  await connectToDB();

  const result = await Blog.collection.updateMany(
    {},
    { $unset: { category: "" } },
  );
  console.log(`Removed category field from ${result.modifiedCount} blogs`);

  await mongoose.disconnect();
}

up()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
