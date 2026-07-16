"use server";

import { ActionResult, UserProps } from "@/type";
import { connectToDB } from "../dbConnect";
import User from "@/models/User";
import { cookies } from "next/headers";
import { createSession } from "../session";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { getSession } from "../dal";

export async function registerUser({
  fname,
  lname,
  username,
  email,
  password,
  userType,
}: UserProps): Promise<ActionResult & { field?: string }> {
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
    return { success: true, message: "Account created successfully" };
  } catch (error) {
    const duplicate = error as { code?: number; keyPattern?: object };
    if (duplicate.code === 11000 && duplicate.keyPattern) {
      const field = Object.keys(duplicate.keyPattern)[0];
      return {
        success: false,
        field,
        message: `This ${field} is already registered`,
      };
    }
    console.log(error);
    return { success: false, message: "Couldn't create your account — please try again" };
  }
}

export async function loginUser({
  email,
  password,
}: Pick<UserProps, "email" | "password">): Promise<ActionResult> {
  await connectToDB();
  try {
    const newUser = await User.findOne({ email: email.trim().toLowerCase() });
    if (!newUser)
      return { success: false, message: "Email or password is incorrect" };

    const isMatch = await bcrypt.compare(password, newUser.password);
    if (!isMatch)
      return { success: false, message: "Email or password is incorrect" };
    await createSession(newUser._id.toString(), newUser.userType);
    return { success: true, message: "Welcome back" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Couldn't sign you in — please try again" };
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
}): Promise<ActionResult> {
  await connectToDB();
  try {
    const session = await getSession();
    if (!session)
      return { success: false, message: "You must be logged in" };
    await User.findByIdAndUpdate(session.id as string, {
      fname: fname || undefined,
      lname: lname || undefined,
      username: username || undefined,
      bio: bio || undefined,
      image: image || undefined,
    });
    revalidatePath("/");
    revalidatePath("/profilepage");
    return { success: true, message: "Profile updated" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Couldn't save your profile — please try again" };
  }
}

export async function getUser(id: string) {
  await connectToDB();

  const user = await User.findById(id)
    .select("-_id fname lname username email image userType bio")
    .lean();
  return user;
}

export async function getAuthorProfile(id: string) {
  await connectToDB();
  try {
    return await User.findById(id)
      .select("-_id fname lname username image bio userType")
      .lean();
  } catch (error) {
    console.log(error);
  }
}

export async function Logout(): Promise<ActionResult> {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("session");
    return { success: true, message: "Signed out" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Couldn't sign you out — please try again" };
  }
}
