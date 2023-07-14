import React from "react";

import { siteConfig } from "@/config/site-config";

import { MainNav } from "@/components/layouts/main-nav";
import { MobileNav } from "@/components/layouts/mobile-nav";

const SiteHeader = () => {
  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <MainNav mainNavItems={siteConfig.mainNav} />
        <MobileNav mainNavItems={siteConfig.mainNav} />
      </div>
    </header>
  );
};

export default SiteHeader;
