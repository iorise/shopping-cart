"use client";

import useFetchData, { Product } from "@/api";
import { Shell } from "@/components/Shells/shell";
import { Header } from "@/components/header";
import { Products } from "@/components/products";
import { toTitleCase } from "@/lib/utils";
import ProductsLoading from "./loading";

interface CategoryPageProps {
  params: {
    category: Product["category"];
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { category } = params;
  const { page, per_page, sort, price_range } = searchParams;
  const { data, isLoading } = useFetchData(category);

  const products = data.filter((product) => product.category === category);
  const limit = typeof per_page === "string" ? parseInt(per_page) : 8;
  const offset = typeof page === "string" ? (parseInt(page) - 1) * limit : 0;

  const paginatedProducts = products.slice(offset, offset + limit);
  const pageCount = Math.ceil(products.length / limit);

  return (
    <div>
      {isLoading ? (
        <ProductsLoading />
      ) : (
        <Shell>
          <Header
            title={toTitleCase(category)}
            description={`Buy ${category} from our best store`}
            size="sm"
          />
          <Products
            products={paginatedProducts}
            pageCount={pageCount}
            category={category}
            page={typeof page === "string" ? page : undefined}
            per_page={typeof per_page === "string" ? per_page : undefined}
            sort={typeof sort === "string" ? sort : undefined}
          />
        </Shell>
      )}
    </div>
  );
}
