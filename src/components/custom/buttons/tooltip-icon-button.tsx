"use client";

import { ButtonProps } from "react-day-picker";
import { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

interface TooltipIconButtonProps extends ButtonProps {
  text: string;
  children: ReactNode;
}

export default function TooltipIconButton(props: TooltipIconButtonProps) {
  const { text, children } = props;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" variant="ghost" {...props}>
            {children}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
