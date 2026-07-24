"use server";

import { ActionResult, CategoriesProps } from "@/type";
import { connectToDB } from "../dbConnect";
import Category from "@/models/Category";
import { revalidatePath } from "next/cache";

export async function createCategory({
  title,
}: Pick<CategoriesProps, "title">): Promise<ActionResult> {
  await connectToDB();

  try {
    await Category.create({ title });
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

export async function updateCategory({
  id,
  title,
}: Pick<CategoriesProps, "id" | "title">): Promise<ActionResult> {
  await connectToDB();

  try {
    await Category.findByIdAndUpdate(id, { title });
    revalidatePath("/create-category");
    return { success: true, message: "Category updated" };
  } catch (error) {
    const duplicate = error as { code?: number };
    if (duplicate.code === 11000) {
      return { success: false, message: "That category already exists" };
    }
    console.log(error);
    return {
      success: false,
      message: "Couldn't update the category — please try again",
    };
  }
}

export async function getCategories(): Promise<CategoriesProps[]> {
  await connectToDB();
  const categories = await Category.find().sort({ title: 1 }).lean();
  return categories.map((c) => ({
    id: c._id.toString(),
    title: c.title,
  }));
}
