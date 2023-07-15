"use client"

import React from "react";

import { siteConfig } from "@/config/site-config";

import { MainNav } from "@/components/layouts/main-nav";
import { MobileNav } from "@/components/layouts/mobile-nav";
import CartSheet from "../cart/cart-sheet";
import { Combobox } from "../combobox";

const SiteHeader = () => {
  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <MainNav mainNavItems={siteConfig.mainNav} />
        <MobileNav mainNavItems={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Combobox/>
            <CartSheet/>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
