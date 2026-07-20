import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);
const Author_Only = ["/create-blog", "/edit", "/author-dashboard"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const needAuthor = Author_Only.some((p) => pathname.startsWith(p));
  const token = request.cookies.get("session")?.value;

  let userType: string | undefined;
  if (token) {
    try {
      const { payload } = await jwtVerify(token, secret, {
        algorithms: ["HS256"],
      });
      userType = payload.userType as string | undefined;
    } catch {
      userType = undefined;
    }
  }

  if (!userType) {
    if (request.cookies.get("refresh")) {
      const url = new URL("/api/refresh", request.url);
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
    if (needAuthor) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  if (needAuthor && userType !== "author") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
