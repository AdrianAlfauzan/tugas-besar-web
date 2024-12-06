import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "@/components/layout/Navbar/";
// import Footer from "@/components/layout/Footer";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";
const disableNavbar = ["/auth/login", "/auth/register", "/404", "/admin"];

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const { pathname } = useRouter();
  return (
    <>
      <SessionProvider session={session}>
        {!disableNavbar.includes(pathname) && <Navbar />}
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}
