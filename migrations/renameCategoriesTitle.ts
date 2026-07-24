import mongoose from "mongoose";
import { connectToDB } from "@/lib/dbConnect";
import Category from "@/models/Category";

// Field was renamed from categoriesTitle -> title on the model; existing
// documents still carry the old key since schema changes don't migrate data.
export async function up() {
  await connectToDB();

  const result = await Category.collection.updateMany(
    {},
    { $rename: { categoriesTitle: "title" } },
  );
  console.log(`Renamed categoriesTitle -> title on ${result.modifiedCount} categories`);

  await mongoose.disconnect();
}

up()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
