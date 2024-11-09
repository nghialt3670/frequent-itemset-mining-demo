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
  description: "A web demo for running frequent itemset mining experiments directly in the browser.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider datasets={DATASETS} experiments={EXPERIMENTS}>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased fixed size-full`}
        >
          <AppBar />
          {children}
          <Toaster />
          <footer></footer>
        </body>
      </Provider>
    </html>
  );
}
