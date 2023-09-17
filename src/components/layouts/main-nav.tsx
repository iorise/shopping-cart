"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { MainNavItem } from "@/types";
import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site-config";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

interface MainNavProps {
  mainNavItems?: MainNavItem[];
}

export function MainNav({ mainNavItems }: MainNavProps) {
  return (
    <div className="hidden gap-6 lg:flex">
      <Link
        aria-label="home"
        href="/"
        className="hidden items-center space-x-2 lg:flex"
      >
        <Icons.shoppingCart className="h-6 w-6" aria-hidden="true" />
        <span className="hidden font-bold lg:inline-block text-lg md:text-lg">
          {siteConfig.name}
        </span>
      </Link>

      <NavigationMenu>
        <NavigationMenuList>
          {mainNavItems?.map(
            (item) =>
              item.href && (
                <NavigationMenuItem key={item.title}>
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(navigationMenuTriggerStyle(), "text-sm")}
                    >
                      {item.title}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              )
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
