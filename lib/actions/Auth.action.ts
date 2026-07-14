"use server";

import { UserProps } from "@/type";
import { connectToDB } from "../dbConnect";
import User from "@/models/User";
import { cookies } from "next/headers";
import { createSession } from "../session";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { getSession } from "../dal";

export async function registerUser({
  fname,
  lname,
  username,
  email,
  password,
  userType,
}: UserProps) {
  await connectToDB();
  const hashPassword = await bcrypt.hash(password, 10);
  try {
    await User.create({
      fname,
      lname,
      username,
      email,
      password: hashPassword,
      userType,
    });
    return { success: true, message: "Account Created SuccessFully" };
  } catch (error: any) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return {
        success: false,
         field,
        message: `This ${field} is already registered`,
      };
    }
    console.log(error);
  }
  return { success: false, message: "Something Went Worng" };
}

export async function loginUser({ email, password }: UserProps) {
  await connectToDB();
  try {
    const newUser = await User.findOne({ email: email.trim().toLowerCase() });
    if (!newUser)
      return { success: false, message: "Invalid Email or Password." };

    const isMatch = await bcrypt.compare(password, newUser.password);
    if (!isMatch)
      return { success: false, message: "Invalid Email or Password." };
    await createSession(newUser._id.toString(), newUser.userType);
    return {
      success: true,
      message: "Logged in SuccessFully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}

export async function updateUser({
  fname,
  lname,
  username,
  bio,
  image,
}: {
  fname?: string;
  lname?: string;
  username?: string;
  bio?: string;
  image?: string;
}) {
  await connectToDB();
  try {
    const session = await getSession();
    if (!session) return { success: false, message: "Not authenticated" };
    await User.findByIdAndUpdate(session.id as string, {
      fname: fname || undefined,
      lname: lname || undefined,
      username: username || undefined,
      bio: bio || undefined,
      image: image || undefined,
    });
    return { success: true, message: "Profile Updated" };
  } catch (error) {
    console.log(error);
    return { success: false, messsage: "Something went wrong" };
  }
}

export async function getUser(id: string) {
  await connectToDB();

  const user = await User.findById(id)
    .select("-_id fname lname username email image userType bio")
    .lean();
  return user;
}

export async function Logout() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  redirect("/");
}
