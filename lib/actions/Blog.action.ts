"use server";

import { CreateBlogProps } from "@/type";
import { connectToDB } from "../dbConnect";
import Blog from "@/models/Blog";
import { revalidatePath } from "next/cache";
import { Types } from "mongoose";
import { getSession } from "../dal";
import { success } from "zod";

export async function updateBlog({
  id,
  author,
  title,
  image,
  shortDescription,
  longDescription,
  publishedAt,
  tags,
}: CreateBlogProps): Promise<void> {
  await connectToDB();

  // The owner comes from the signed session cookie, never from the form — a
  // client-supplied authorId could claim any author's blogs.
  const session = await getSession();
  if (!session?.id) throw new Error("Not authenticated");
  const authorId = session.id as string;

  if (id) {
    const existing = await Blog.findById(id).select("authorId").lean();
    if (existing && String(existing.authorId) !== authorId) {
      throw new Error("Cannot edit another author's blog");
    }
  }

  try {
    await Blog.findByIdAndUpdate(
      id ?? new Types.ObjectId(),
      {
        author,
        authorId,
        title,
        image,
        shortDescription,
        longDescription,
        publishedAt,
        tags,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );
    revalidatePath("/");
  } catch (error) {
    console.log(error);
  }
}

export async function getBlogTags() {
  await connectToDB();
  try {
    return await Blog.distinct("tags");
  } catch (error) {
    console.log(error);
  }
}

export async function getBlogs() {
  //All blogs
  await connectToDB();
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 }).lean();
    return blogs.map((blog) => ({
      id: blog._id.toString(),
      title: blog.title,
      author: blog.author,
      image: blog.image,
      shortDescription: blog.shortDescription,
      longDescription: blog.longDescription,
      publishedAt: blog.publishedAt,
      tags: blog.tags,
    }));
  } catch (error) {
    console.log(error);
  }
}

export async function getBlog(id: string) {
  await connectToDB();

  try {
    const blog = await Blog.findById(id).lean();

    return {
      id: blog._id.toString(),
      title: blog.title,
      author: blog.author,
      image: blog.image,
      shortDescription: blog.shortDescription,
      longDescription: blog.longDescription,
      publishedAt: blog.publishedAt,
      tags: blog.tags,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function getBlogsByAuthor(authorId: string) {
  await connectToDB();
  try {
    const blogs = await Blog.find({ authorId }).sort({ createdAt: -1 }).lean();
    return blogs.map((blog) => ({
      id: blog._id.toString(),
      title: blog.title,
      author: blog.author,
      image: blog.image,
      shortDescription: blog.shortDescription,
      longDescription: blog.longDescription,
      publishedAt: blog.publishedAt,
      tags: blog.tags,
    }));
  } catch (error) {
    console.log(error);
  }
}

export async function deleteBlog(id: string) {
  await connectToDB();
  try {
    await Blog.findByIdAndDelete(id);
    revalidatePath("/author-dashboard");
  } catch (error) {
    console.log(error);
    return { success: false, message: "Could not delete blog" };
  }
}
