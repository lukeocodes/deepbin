import "@/styles/globals.css";

import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { Inter } from "next/font/google";
import { useState } from "react";
import { LanguageContextProvider } from "@/components/context/language";
import { ProjectContextProvider } from "@/components/context/project";

import type { AppProps } from "next/app";

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
      <ProjectContextProvider>
        <LanguageContextProvider>
          <style jsx global>{`
            html {
              font-family: ${inter.style.fontFamily};
            }
          `}</style>
          <Component {...pageProps} />
        </LanguageContextProvider>
      </ProjectContextProvider>
    </SessionContextProvider>
  );
};

export default Deepbin;
