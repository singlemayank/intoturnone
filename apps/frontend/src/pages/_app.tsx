// src/pages/_app.tsx

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import Header from "@/components/Header"; // 👈 import your header component

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ revalidateOnFocus: false }}>
      <>
        <Header /> {/* 👈 this makes sure it shows on all pages */}
        <Component {...pageProps} />
      </>
    </SWRConfig>
  );
}
