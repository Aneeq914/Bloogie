import mongoose from "mongoose";
import { connectToDB } from "@/lib/dbConnect";
import Blog from "@/models/Blog";

export async function up() {
  await connectToDB();
  const result = await Blog.updateMany(
    { authorId: { $exists: false } },
    { $set: { authorId: new mongoose.Types.ObjectId("0".repeat(24)) } },
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
