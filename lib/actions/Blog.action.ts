"use server";

import { ActionResult, CreateBlogProps } from "@/type";
import { connectToDB } from "../dbConnect";
import Blog from "@/models/Blog";
import { revalidatePath } from "next/cache";
import { Types } from "mongoose";
import { getCurrentUser, getSession } from "../dal";

export async function updateBlog({
  id,
  title,
  image,
  shortDescription,
  longDescription,
  publishedAt,
  tags,
  category,
}: CreateBlogProps): Promise<ActionResult> {
  await connectToDB();
  const session = await getSession();
  if (!session?.id)
    return { success: false, message: "Log in again to continue" };
  const authorId = session.id as string;
  const user = await getCurrentUser();

  if (id) {
    const existing = await Blog.findById(id)
      .select("authorId published")
      .lean();
    if (existing && String(existing.authorId) !== authorId) {
      return { success: false, message: "You can only edit your own blogs" };
    }
    if (existing?.published) {
      return {
        success: false,
        message: "Unpublish this blog before editing it",
      };
    }
  }

  try {
    await Blog.findByIdAndUpdate(
      id ?? new Types.ObjectId(),
      {
        author: user.username,
        authorId,
        title,
        image,
        shortDescription,
        longDescription,
        publishedAt,
        tags,
        category,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );
    revalidatePath("/");
    return { success: true, message: id ? "Blog updated" : "Blog created" };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Couldn't save your blog — please try again",
    };
  }
}

// Posts sharing at least one tag with the given post — the current post excluded.
export async function getRelatedBlogs(id: string, tags: string[]) {
  await connectToDB();
  try {
    const blogs = await Blog.find({
      published: true,
      _id: { $ne: id },
      tags: { $in: tags },
    })
      .sort({ createdAt: -1 })
      .limit(8)
      .lean();
    return blogs.map((blog) => ({
      id: blog._id.toString(),
      title: blog.title,
      author: blog.author,
      image: blog.image,
      shortDescription: blog.shortDescription,
      publishedAt: blog.publishedAt,
      tags: blog.tags,
    }));
  } catch (error) {
    console.log(error);
  }
}

const PAGE_SIZE = 6;

export async function getBlogs(page = 1, category?: string) {
  await connectToDB();
  try {
    const filter = category ? { published: true, category } : { published: true };
    const total = await Blog.countDocuments(filter);
    const blogs = await Blog.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .lean();
    return {
      totalPages: Math.ceil(total / PAGE_SIZE),
      blogs: blogs.map((blog) => ({
        id: blog._id.toString(),
        title: blog.title,
        author: blog.author,
        authorId: blog.authorId.toString(),
        image: blog.image,
        shortDescription: blog.shortDescription,
        longDescription: blog.longDescription,
        publishedAt: blog.publishedAt,
        tags: blog.tags,
        category: blog.category,
      })),
    };
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
      authorId: blog.authorId.toString(),
      image: blog.image,
      shortDescription: blog.shortDescription,
      longDescription: blog.longDescription,
      publishedAt: blog.publishedAt,
      published: blog.published,
      tags: blog.tags,
      category: blog.category,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function getBlogsByAuthor(authorId: string, page = 1) {
  await connectToDB();
  try {
    const total = await Blog.countDocuments({ authorId });
    const blogs = await Blog.find({ authorId })
      .sort({ createdAt: -1 })
      .skip((page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .lean();
    return {
      totalPages: Math.ceil(total / PAGE_SIZE),
      blogs: blogs.map((blog) => ({
        id: blog._id.toString(),
        title: blog.title,
        author: blog.author,
        image: blog.image,
        shortDescription: blog.shortDescription,
        longDescription: blog.longDescription,
        publishedAt: blog.publishedAt,
        published: blog.published,
        tags: blog.tags,
      })),
    };
  } catch (error) {
    console.log(error);
  }
}

// Public author page — drafts must never appear here.
export async function getPublishedBlogsByAuthor(authorId: string) {
  await connectToDB();
  try {
    const blogs = await Blog.find({ authorId, published: true })
      .sort({ createdAt: -1 })
      .lean();
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

export async function togglePublish(id: string): Promise<ActionResult> {
  await connectToDB();
  const session = await getSession();
  if (!session?.id)
    return { success: false, message: "Log in again to continue" };

  const blog = await Blog.findById(id).select("authorId published");
  if (!blog) return { success: false, message: "That blog no longer exists" };
  if (String(blog.authorId) !== session.id) {
    return { success: false, message: "You can only publish your own blogs" };
  }

  try {
    blog.published = !blog.published;
    await blog.save();
    revalidatePath("/");
    revalidatePath("/author-dashboard");
    return {
      success: true,
      message: blog.published ? "Blog published" : "Blog unpublished",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Couldn't update your blog — please try again",
    };
  }
}

export async function deleteBlog(id: string): Promise<ActionResult> {
  await connectToDB();
  const session = await getSession();
  if (!session?.id)
    return { success: false, message: "Log in again to continue" };

  const blog = await Blog.findById(id).select("authorId published");
  if (!blog) return { success: false, message: "That blog no longer exists" };
  if (String(blog.authorId) !== session.id) {
    return { success: false, message: "You can only delete your own blogs" };
  }
  if (blog.published) {
    return {
      success: false,
      message: "Unpublish this blog before deleting it",
    };
  }

  try {
    await Blog.findByIdAndDelete(id);
    revalidatePath("/author-dashboard");
    return { success: true, message: "Blog deleted" };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Couldn't delete your blog — please try again",
    };
  }
}
