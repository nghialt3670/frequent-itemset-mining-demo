import { Menu } from "lucide-react";
import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
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
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Frequent Itemset Mining</SheetTitle>
          <SheetDescription>
            A web demo for running frequent itemset mining experiments directly
            in the browser.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6">
          <div className="flex flex-col">
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
        </div>
      </SheetContent>
    </Sheet>
  );
}
