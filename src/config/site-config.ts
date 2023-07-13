import type { MainNavItem } from "@/types";
import { productCategories } from "./products";

export type SiteConfig = typeof siteConfig;

const links = {
  twitter: "https://twitter.com/ioriya3",
  github: "https://github.com/sadmann7",
  discord: "https://discord.com/users/iori",
  facebook: "https://www.facebook.com/profile.php?id=100025999413205",
};

export const siteConfig = {
  name: "Shoppingcart",
  mainNav: [
    {
      items: [
        {
          title: "Products",
          href: "/products",
          items: [],
        },
        {
          title: "Jewelry",
          href: "/category/jewelry",
          items: [],
        },
        {
          title: "Electronics",
          href: "/category/electronics",
          items: [],
        },
        {
          title: "Clothing",
          href: "/category/clothing",
          items: [],
        },
      ],
    },
    ...productCategories.map((category) => ({
      title: category.title,
      href: category.href,
    })),
  ] as MainNavItem[],
};
