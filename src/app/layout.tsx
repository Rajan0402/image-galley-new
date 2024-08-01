import "@/styles/globals.css";
import "@uploadthing/react/styles.css";

// import { ClerkProvider } from "@clerk/nextjs";

import { GeistSans } from "geist/font/sans";
import { TopNav } from "./_components/topnav";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import { Toaster } from "@/components/ui/sonner";
// import { CSPostHogProvider } from "./_analytics/provider";

export const metadata = {
  title: "Image Gallery",
  description: "Upload and Download images to/from here!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    // <ClerkProvider>
      // {/* // <CSPostHogProvider> */}
        <html lang="en" className={`${GeistSans.variable}`}>
          <NextSSRPlugin
            /**
             * The `extractRouterConfig` will extract **only** the route configs
             * from the router to prevent additional information from being
             * leaked to the client. The data passed to the client is the same
             * as if you were to fetch `/api/uploadthing` directly.
             */
            routerConfig={extractRouterConfig(ourFileRouter)}
          />
          <body className={`font-sans dark`}>
            <div className="grid h-screen grid-rows-[auto,1fr]">
              <TopNav />
              <main className="overflow-y-scroll p-4">{children}</main>
              {modal}
            </div>
            <div id="modal-root" />
            <Toaster />
          </body>
        </html>
    // {/* //   </CSPostHogProvider> */}
    // </ClerkProvider>
  );
}
