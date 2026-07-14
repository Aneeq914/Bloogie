import "server-only";
import { cookies } from "next/headers";
import { cache } from "react";
import { verifyToken } from "./session";
import { getUser } from "./actions/Auth.action";

export const getSession = cache(async () => {
  const token = (await cookies()).get("session")?.value;
  if (!token) return null;
  return verifyToken(token);
});

export const getCurrentUser = cache(async () => {
  const session = await getSession();
  if (!session) return null;
  return getUser(session.id as string);
});
