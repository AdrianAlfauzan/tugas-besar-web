import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NavbarUser from "@/components/layout/Navbar";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";

const disableNavbar = ["/auth/login", "/auth/register", "/404"];

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const { pathname } = useRouter();

  return (
    <SessionProvider session={session}>
      {!disableNavbar.includes(pathname) && <NavbarUser />}
      <Component {...pageProps} />
    </SessionProvider>
  );
}
