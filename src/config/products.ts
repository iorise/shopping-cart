import { Product } from "@/api";

export const sortOptions = [
  {
    label: "Date: Old to new",
    value: "createdAt.asc",
  },
  {
    label: "Date: New to old",
    value: "createdAt.desc",
  },
  {
    label: "Price: Low to high",
    value: "price.asc",
  },
  {
    label: "Price: High to low",
    value: "price.desc",
  },
  {
    label: "Alphabetical: A to Z",
    value: "name.asc",
  },
  {
    label: "Alphabetical: Z to A",
    value: "name.desc",
  },
];

export const productCategories: {
  title: Product["category"];
  href: Product["category"];
  description: string;
}[] = [
  {
    title: "Products",
    href: "/products",
    description:
      "Find a wide selection of products that are attractive and according to your needs.",
  },
  {
    title: "Electronics",
    href: "/categories/electronics",
    description: "",
  },
  {
    title: "Jewelery",
    href: "/categories/jewelery",
    description: "",
  },
];
