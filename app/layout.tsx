import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Header from "./_components/Header";
import { ReactNode } from "react";
import QueryProvider from "./_components/queryprovider";
import ReduxProvider from "./_components/reduxprovider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Event Seating App",
  description:
    "Easily purchase tickets for your favorite events with our seating map. Choose your seats and buy tickets securely online.",
  keywords: "event tickets, buy tickets, seating map, online ticket purchase",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <QueryProvider>
          <ReduxProvider>
            <Header />
            {children}
            <Toaster />
            <SpeedInsights />
          </ReduxProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
