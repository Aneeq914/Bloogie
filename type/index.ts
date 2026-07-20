import type { Types } from "mongoose";

export const CATEGORIES = [
  "Technology",
  "Design",
  "Business",
  "Lifestyle",
  "Travel",
  "Food",
] as const;

export type Category = (typeof CATEGORIES)[number];

export interface AllBlogProps {
  id: string;
  title: string;
  author: string;
  authorId?: string;
  image: string;
  shortDescription: string;
  longDescription: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  published?: boolean;
  tags?: string[];
  category: Category;
}

export interface CreateBlogProps {
  id?: string;
  title: string;
  image: string;
  shortDescription: string;
  longDescription: string;
  publishedAt: Date;
  published?: boolean;
  tags?: string[];
  category: Category;
}

export interface ActionResult {
  success: boolean;
  message: string;
  authExpired?: boolean;
}

export interface UserProps {
  fname: string;
  lname: string;
  username: string;
  email: string;
  password: string;
  userType: "author" | "user";
  image?: string;
  bio?: string;
  tokenVersion?: number;
}

export interface RefreshTokenProps {
  userId: Types.ObjectId;
  tokenHash: string;
  expiresAt: Date;
}
