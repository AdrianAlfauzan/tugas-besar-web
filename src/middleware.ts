import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Rute yang memerlukan login
  const userRoutes = ["/user/testt", "/user/teststst"];
  // const adminRoutes = ["/admin/beranda", "/admin/dashboard"];

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Jika token tidak ada, arahkan pengguna ke halaman login
  if (!token) {
    if (userRoutes.includes(pathname)) {
      const loginUrl = new URL("/auth/login", req.url);
      loginUrl.searchParams.set("callbackUrl", req.url); // Simpan callback untuk redirect setelah login
      return NextResponse.redirect(loginUrl);
    }
  }

  // Jika token ada dan pengguna mencoba mengakses admin route
  // if (adminRoutes.includes(pathname)) {
  //   return NextResponse.redirect(new URL("/admin", req.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/user/testt", "/user/teststst", "/admin/beranda", "/admin/dashboard"], // Halaman yang diproteksi
};
