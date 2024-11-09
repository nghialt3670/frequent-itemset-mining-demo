"use client";

import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import TooltipIconButton from "./custom/buttons/tooltip-icon-button";
import { ButtonProps } from "@/components/ui/button";

export interface ThemeToggleProps extends ButtonProps {}

export default function ThemeToggle(props: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const icon = mounted ? (
    resolvedTheme === "light" ? (
      <Sun size={20} />
    ) : (
      <Moon size={20} />
    )
  ) : null;

  const handleToggleClick = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <TooltipIconButton
      text="Toggle theme"
      onClick={handleToggleClick}
      {...props}
    >
      {icon}
    </TooltipIconButton>
  );
}
