"use client";

import { type Metadata } from "next";

import { Header } from "@/components/header";
import { Shell } from "@/components/Shells/shell";
import { Products } from "@/components/products";
import useFetchData from "@/api";
import ProductsLoading from "./loading";

interface ProductsPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  const { page, per_page, sort, categories, price_range } = searchParams;

  const { data, isLoading } = useFetchData();

  const limit = typeof per_page === "string" ? parseInt(per_page) : 8;
  const offset = typeof page === "string" ? (parseInt(page) - 1) * limit : 0;

  const products = data.slice(offset, offset + limit);
  const pageCount = Math.ceil(data.length / limit);

  return (
    <div>
      {isLoading ? (
        <ProductsLoading />
      ) : (
        <Shell>
          <Header
            title="Products"
            description="Find a wide selection of products that are attractive and according to your needs."
            size="sm"
          />
          <Products
            products={products}
            pageCount={pageCount}
            category={categories?.[0]}
            page={typeof page === "string" ? page : undefined}
            per_page={typeof per_page === "string" ? per_page : undefined}
            sort={typeof sort === "string" ? sort : undefined}
          />
        </Shell>
      )}
    </div>
  );
}
