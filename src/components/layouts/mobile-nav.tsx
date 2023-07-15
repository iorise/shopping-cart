"use client";

import * as React from "react";
import Link from "next/link";

import { MainNavItem, SidebarNavItem } from "@/types";
import { siteConfig } from "@/config/site-config";

import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { Icons } from "../icons";

interface MobileNavProps {
  mainNavItems?: MainNavItem[];
}

export function MobileNav({ mainNavItems }: MobileNavProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant={"ghost"}
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
        >
          <Icons.menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pl-1 pr-0">
        <div className="px-7">
          <Link
            aria-label="home"
            href="/"
            className="flex items-center"
            onClick={() => setIsOpen(false)}
          >
            <Icons.shoppingCart className="mr-2 h-4 w-4" aria-hidden="true" />
            <span className="font-bold">{siteConfig.name}</span>
          </Link>
        </div>
        <ScrollArea className="my-6 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="pl-1 pr-7">
            {mainNavItems?.map((item, index) => item.href && (
              <React.Fragment>
                <div
                  className="flex flex-1 items-center justify-between py-4 font-medium text-sm transition-all hover:underline hover:cursor-pointer"
                  key={index}
                >
                  <Link href={item.href}>{item.title}</Link>
                </div>
              </React.Fragment>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
