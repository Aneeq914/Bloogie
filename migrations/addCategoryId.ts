import mongoose from "mongoose";
import { connectToDB } from "@/lib/dbConnect";
import Category from "@/models/Category";
import Blog from "@/models/Blog";
import { CATEGORIES } from "@/type";

export async function up() {
  await connectToDB();

  // 1. Seed the categories (idempotent — keyed on unique name).
  for (const name of CATEGORIES) {
    await Category.updateOne(
      { name },
      { $setOnInsert: { name, slug: name.toLowerCase() } },
      { upsert: true },
    );
  }
  console.log(`Seeded ${CATEGORIES.length} categories`);

  // 2. Backfill each blog's categoryId from its category name.
  const categories = await Category.find().lean();
  let updated = 0;
  for (const { _id, name } of categories) {
    const result = await Blog.updateMany(
      { category: name, categoryId: { $exists: false } },
      { $set: { categoryId: _id } },
    );
    updated += result.modifiedCount;
  }
  console.log(`Backfilled ${updated} blogs`);

  await mongoose.disconnect();
}

up()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
