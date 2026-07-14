import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);
const Author_Only = ["/create-blog", "/edit", "/author-dashboard"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("session")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  let userType: string | undefined;
  try {
    const { payload } = await jwtVerify(token, secret, {
      algorithms: ["HS256"],
    });
    userType = payload.userType as string | undefined;
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const needAuthor = Author_Only.some((p) => pathname.startsWith(p));
  if (needAuthor && userType !== "author") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/create-blog/:path*", "/edit/:path*", "/author-dashboard/:path*"],
};
