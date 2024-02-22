import "@/assets/css/globals.css";
import "@/assets/css/cursor.css";

import clsx from "clsx";
import type { Metadata } from "next";
import { Urbanist } from "next/font/google";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio Kieenlu",
  description: "Portfolio Kieenlu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-slate-900 text-slate-100">
      <body className={clsx(urbanist.className, "relative min-h-screen")}>
        <Header />
        {children}
        <div className="background-gradient absolute inset-0 -z-50 max-h-screen" />
        <div className="pointer-events-none absolute inset-0 -z-40 h-full bg-[url('/image/noisetexture.jpg')] opacity-20 mix-blend-soft-light"></div>
        <Footer />
      </body>
    </html>
  );
}
