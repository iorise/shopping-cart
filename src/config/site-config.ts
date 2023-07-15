import type { MainNavItem } from "@/types";
import { productCategories } from "./products";

export type SiteConfig = typeof siteConfig;

const links = {
  twitter: "https://twitter.com/ioriya3",
  github: "https://github.com/iorise",
  discord: "https://discord.com/users/iori",
  facebook: "https://www.facebook.com/profile.php?id=100025999413205",
  rickroll: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
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
          title: "Jewelery",
          href: "/categories/jewelery",
          items: [],
        },
        {
          title: "Electronics",
          href: "/categories/electronics",
          items: [],
        },
      ],
    },
    ...productCategories.map((category) => ({
      title: category.title,
      href: category.href,
    })),
  ] as MainNavItem[],

  footer: [
    {
      title: "Twitter",
      href: links.twitter,
      external: "true",
    },
    {
      title: "Github",
      href: links.discord,
      external: true,
    },
    {
      title: "Facebook",
      href: links.facebook,
      external: true,
    },
    {
      title: "Youtube",
      href: links.rickroll,
      external: true,
    },
  ],
};
