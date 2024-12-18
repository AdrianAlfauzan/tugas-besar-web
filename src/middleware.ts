import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Rute yang memerlukan login
  const userRoutes = ["/user/activity/Pendaftaran", "/user/activity/PilihDosenPembimbing", "/user/eligibilityCheckTA", "/user/seminar"];

  // Mendapatkan token
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

  // Cek jika pengguna memiliki token dan mencoba mengakses /admin/dashboard
  if (pathname === "/admin/dashboard") {
    // Jika role pengguna adalah admin, biarkan akses ke /admin/dashboard
    if (token?.role === "admin") {
      return NextResponse.next(); // Lanjutkan jika role adalah admin
    } else {
      // Jika bukan admin, arahkan ke /admin
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  }

  // Jika rute lainnya, lanjutkan
  return NextResponse.next();
}

export const config = {
  matcher: ["/user/activity/Pendaftaran", "/user/activity/PilihDosenPembimbing", "/user/eligibilityCheckTA", "/user/seminar", "/admin/beranda", "/admin/dashboard"], // Halaman yang diproteksi
};
