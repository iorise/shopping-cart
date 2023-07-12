import React from "react";

import { siteConfig } from "@/config/site-config";

import { MainNav } from "@/components/layouts/main-nav";
import { MobileNav } from "@/components/layouts/mobile-nav";

const SiteHeader = () => {
  return (
    <div>
      <MainNav mainNavItems={siteConfig.mainNav} />
      <MobileNav mainNavItems={siteConfig.mainNav}/>
    </div>
  );
};

export default SiteHeader;
