import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Header from "./_components/Header";
import { ReactNode } from "react";
import QueryProvider from "./_components/queryprovider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ticket app",
  description: "Simple ticket app for NFCTron",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <QueryProvider>
          <Header />
          {children}
          <SpeedInsights />
        </QueryProvider>
      </body>
    </html>
  );
}
