import "@/styles/globals.css";
import "nprogress/nprogress.css";
import "react-toastify/dist/ReactToastify.css";

import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { ErrorsContextProvider } from "@/components/context/errors";
import { Inter } from "next/font/google";
import { LanguageContextProvider } from "@/components/context/language";
import { ProjectContextProvider } from "@/components/context/project";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { useState } from "react";
import NProgress from "nprogress";
import Router from "next/router";

import type { AppProps } from "next/app";

Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeError", () => () => NProgress.done());

const inter = Inter({
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal"],
  display: "swap",
  subsets: ["latin"],
});

const Deepbin = ({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) => {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <ErrorsContextProvider>
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
    </ErrorsContextProvider>
  );
};

export default Deepbin;
