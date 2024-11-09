import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import React from "react";
import { TooltipIconButton } from "./custom/buttons/tooltip-icon-button";
import ThemeToggle from "./theme-toggle";
import { Sidebar } from "./sidebar";

export function AppBar() {
  return (
    <header className="flex justify-between items-center p-2">
      <div className="flex flex-row justify-center items-center space-x-4">
        <Sidebar className="mr" />
        <h1 className="font-bold text-2xl">Frequent Itemset Mining</h1>
      </div>
      <div className="flex flex-row justify-center items-center">
        <ThemeToggle />
        <Link href="https://github.com/nghialt3670/frequent-itemset-mining-demo">
          <TooltipIconButton text="Go to Github">
            <FaGithub />
          </TooltipIconButton>
        </Link>
      </div>
    </header>
  );
}
