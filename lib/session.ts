import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { randomBytes, createHash } from "node:crypto";
import { connectToDB } from "./dbConnect";
import RefreshToken from "@/models/RefreshToken";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function createToken(payload: {
  id?: string;
  userType?: "user" | "author";
}) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("15m")
    .sign(secret);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch {
    return null;
  }
}

export async function createSession(id?: string, userType?: "user" | "author") {
  const token = await createToken({ id, userType });
  const cookieStore = await cookies();
  cookieStore.set("session", token, {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 60 * 15,
  });
}

export async function createRefreshToken(userId: string) {
  const token = randomBytes(32).toString("hex");
  await connectToDB();
  await RefreshToken.create({
    userId,
    tokenHash: hashToken(token),
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  });
  const cookieStore = await cookies();
  cookieStore.set("refresh", token, {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function deleteRefreshToken() {
  const token = (await cookies()).get("refresh")?.value;
  if (!token) return;

  await connectToDB();
  await RefreshToken.deleteOne({ tokenHash: hashToken(token) });
}

export async function deleteAllRefreshTokens(userId: string) {
  await connectToDB();
  await RefreshToken.deleteMany({ userId });
}


