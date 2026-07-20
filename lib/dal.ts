import "server-only";
import { cookies } from "next/headers";
import { cache } from "react";
import { verifyToken } from "./session";
import { getUser } from "./actions/Auth.action";
import { connectToDB } from "./dbConnect";
import User from "@/models/User";

export const getSession = cache(async () => {
  const token = (await cookies()).get("session")?.value;
  if (!token) return null;

  const payload = await verifyToken(token);
  if (!payload) return null;

  await connectToDB();
  const user = await User.findById(payload.id as string).select("tokenVersion");
  if (!user || user.tokenVersion !== payload.tokenVersion) return null;

  return payload;
});

export const getCurrentUser = cache(async () => {
  const session = await getSession();
  if (!session) return null;
  return getUser(session.id as string);
});
