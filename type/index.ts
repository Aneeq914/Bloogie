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
  tags?: string;
}

export interface CreateBlogProps {
  id?: string;
  title: string;
  author: string;
  image: string;
  shortDescription: string;
  longDescription: string;
  publishedAt: Date;
  tags?: string;
}

export interface LoginProps {
  email: string;
  password: string;
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
}
