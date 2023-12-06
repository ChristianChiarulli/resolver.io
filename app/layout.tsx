import type { Metadata } from "next";
import localFont from "next/font/local";
import { cookies } from "next/headers";

import { GeistMono, GeistSans } from "geist/font";

import Refresh from "./components/Refresh";
import Sidebar from "./components/Sidebar";
import Header from "./components/header/Header";
import RelayMenu from "./components/menus/RelayMenu";
import "./globals.css";
import { ClientCookiesProvider } from "./provider";
import { Theme } from "./types";

const avenir = localFont({ src: "../public/avenir.ttf" });

export const metadata: Metadata = {
  title: "resolvr",
  description: "A Bitcoin-Native Dispute Resolution Service for FOSS Bounties",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const theme = cookies().get("theme");
  return (
    <html className={`${GeistSans.variable} ${GeistMono.variable} ${theme?.value || Theme.light}`}>
      <head />
      <ClientCookiesProvider value={cookies().getAll()}>
        <body className={`${avenir.className} h-full bg-gray-100 dark:bg-background`}>
          <div className="min-h-screen">
            <Sidebar />
            <Header />
            <Refresh />
            <RelayMenu />
            {children}
          </div>
        </body>
      </ClientCookiesProvider>
    </html>
  );
}
