import "@/styles/globals.css";
import "@/styles/supabase.css";
import { useState } from "react";
import type { AppProps } from "next/app";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const Deepbin = ({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) => {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </SessionContextProvider>
  );
};

export default Deepbin;
