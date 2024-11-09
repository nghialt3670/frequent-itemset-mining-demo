import localFont from "next/font/local";
import type { Metadata } from "next";
import { EXPERIMENTS } from "@/features/experiments/constants/experiments.constant";
import { DATASETS } from "@/features/datasets/constants/datasets.constant";
import { Toaster } from "@/components/ui/toaster";
import { AppBar } from "@/components/app-bar";
import { Provider } from "./provider";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Frequent Itemset Mining",
  description:
    "A web demo for running frequent itemset mining experiments directly in the browser.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased fixed size-full`}
        suppressHydrationWarning
      >
        <Provider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          datasets={DATASETS}
          experiments={EXPERIMENTS}
        >
          <AppBar />
          {children}
          <Toaster />
          <footer></footer>
        </Provider>
      </body>
    </html>
  );
}
