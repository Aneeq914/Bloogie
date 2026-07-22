"use server";

import { ActionResult, CategoriesProps } from "@/type";
import { connectToDB } from "../dbConnect";
import Category from "@/models/Category";
import { revalidatePath } from "next/cache";

export async function createCategory({
  categoriesTitle,
}: Pick<CategoriesProps, "categoriesTitle">): Promise<ActionResult> {
  await connectToDB();

  try {
    await Category.create({ categoriesTitle });
    revalidatePath("/create-category");
    return { success: true, message: "Category created" };
  } catch (error) {
    const duplicate = error as { code?: number };
    if (duplicate.code === 11000) {
      return { success: false, message: "That category already exists" };
    }
    console.log(error);
    return {
      success: false,
      message: "Couldn't create the category — please try again",
    };
  }
}

export async function getCategories(): Promise<CategoriesProps[]> {
  await connectToDB();
  const categories = await Category.find().sort({ categoriesTitle: 1 }).lean();
  return categories.map((c) => ({
    id: c._id.toString(),
    categoriesTitle: c.categoriesTitle,
  }));
}
