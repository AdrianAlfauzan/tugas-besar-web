import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Rute yang memerlukan login
  const userRoutes = ["/api/ApiGetUsers", "/user/activity/Pendaftaran", "/user/activity/PilihDosenPembimbing", "/user/eligibilityCheckTA", "/user/seminar"];

  // Mendapatkan token
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Jika token tidak ada, arahkan pengguna ke halaman login
  if (!token) {
    if (userRoutes.includes(pathname)) {
      const loginUrl = new URL("/auth/login", req.url);
      loginUrl.searchParams.set("callbackUrl", req.url); // Ketika user klik pages yang dia mau, dan disuruh login akan diarahkan ke halaman tersebut yang dari awal dia klik
      return NextResponse.redirect(loginUrl);
    }
  }

  // Jika rute lainnya, lanjutkan
  return NextResponse.next();
}

export const config = {
  matcher: ["/api/ApiGetUsers", "/user/activity/Pendaftaran", "/user/activity/PilihDosenPembimbing", "/user/eligibilityCheckTA", "/user/seminar"], // Halaman yang diproteksi
};
