import Link from "next/link";
import React from "react";
import GithubIcon from "../../public/icons/github.svg";
import { Button } from "./ui/button";
import { Sidebar } from "./sidebar";

export function AppBar() {
  return (
    <header className="flex justify-between items-center p-2">
      <div className="flex flex-row justify-center items-center space-x-4">
        <Sidebar className="mr" />
        <h1 className="font-bold text-2xl">Frequent Itemset Mining</h1>
      </div>
      <Link href="https://github.com/nghialt3670/frequent-itemset-mining-demo">
        <Button className="rounded-full" size="icon" variant="ghost">
          <img src="/icons/github.svg" className="size-6" />
        </Button>
      </Link>
    </header>
  );
}
