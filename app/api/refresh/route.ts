import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { connectToDB } from "@/lib/dbConnect";
import RefreshToken from "@/models/RefreshToken";
import User from "@/models/User";
import {
  createSession,
  createRefreshToken,
  deleteRefreshToken,
  hashToken,
} from "@/lib/session";

export async function GET(request: NextRequest) {
  const next = request.nextUrl.searchParams.get("next") || "/";
  const target = next.startsWith("/") ? next : "/";

  const cookieStore = await cookies();
  const token = cookieStore.get("refresh")?.value;

  if (token) {
    await connectToDB();
    const row = await RefreshToken.findOne({ tokenHash: hashToken(token) });

    if (row && row.expiresAt > new Date()) {
      const user = await User.findById(row.userId).select("userType");

      if (user) {
        const userId = row.userId.toString();
        await deleteRefreshToken();
        await createRefreshToken(userId);
        await createSession(userId, user.userType);
        return NextResponse.redirect(new URL(target, request.url));
      }
    }
  }

  cookieStore.delete("session");
  cookieStore.delete("refresh");
  return NextResponse.redirect(new URL("/login", request.url));
}
