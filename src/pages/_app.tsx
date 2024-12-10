import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NavbarUser from "@/components/layout/user/Navbar";
import SidebarAdmin from "@/components/layout/admin/Sidebar";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";

const disableNavbar = ["/auth/login", "/auth/register", "/404"];

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const { pathname } = useRouter();

  const isNavbarDisabled = disableNavbar.includes(pathname) || pathname.startsWith("/admin/login");

  const isAdminRoute = pathname.startsWith("/admin");

  const isAdminLoginRoute = pathname === "/admin";

  return (
    <SessionProvider session={session}>
      {!isNavbarDisabled && !isAdminRoute && <NavbarUser />}

      {isAdminRoute && !isAdminLoginRoute ? (
        <SidebarAdmin>
          <Component {...pageProps} />
        </SidebarAdmin>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  );
}
