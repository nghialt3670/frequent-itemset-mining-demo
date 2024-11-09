import { Menu } from "lucide-react";
import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button, ButtonProps } from "@/components/ui/button";

export interface SidebarProps extends ButtonProps {}

export function Sidebar(props: SidebarProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" {...props}>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col" side="left">
        <SheetHeader>
          <SheetTitle>Frequent Itemset Mining</SheetTitle>
          <SheetDescription>
            A web demo for running frequent itemset mining experiments directly
            in the browser.
          </SheetDescription>
        </SheetHeader>
        <div className="border flex flex-col h-full rounded-lg gap-1 p-2">
          <Link href={"/datasets"}>
            <SheetClose asChild>
              <Button className="text-2xl w-full" variant="link">
                Datasets
              </Button>
            </SheetClose>
          </Link>
          <Link href={"/experiments"}>
            <SheetClose asChild>
              <Button className="text-2xl w-full" variant="link">
                Experiments
              </Button>
            </SheetClose>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
