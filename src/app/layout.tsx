import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { ThemeProvider } from "@/app/_components/theme-provider";
import { Toaster } from "@/app/_components/ui/toaster";
import { ProModal } from "@/app/_components/pro-modal";
import { cn } from "@/app/lib/utils";

import { TRPCReactProvider } from "@/trpc/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "P2P",
  description: "People 2 people marketing",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html className="h-full" suppressHydrationWarning lang="en">
        <body className={cn("h-full bg-secondary", inter.className)}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <ProModal />
            <TRPCReactProvider>
              <ProModal />
              {children}
              <Toaster />
            </TRPCReactProvider>{" "}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
