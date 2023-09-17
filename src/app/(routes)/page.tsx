import { Shell } from "@/components/Shells/shell";
import { siteConfig } from "@/config/site-config";
import { getProducts } from "./products/page";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Product } from "@/types";

export default async function HomePage() {
  const data = (await getProducts()) as Product[];
  const products = data.slice(0, 4);
  return (
    <Shell as="div" className="gap-12">
      <section
        id="hero"
        aria-labelledby="hero-heading"
        className="mx-auto flex flex-col w-full max-w[64rem] items-center justify-center text-center gap-4 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32"
      >
        <h1 id="hero-heading" className="text-4xl font-bold">
          Welcome to {siteConfig.name}
        </h1>
        <p className="text-xl text-muted-foreground">
          Discover the best products for all your needs
        </p>
        <Link href={"/products"}>
          <Button>Shop now</Button>
        </Link>
      </section>
      <section
        id="featured-products"
        aria-labelledby="featured-products-heading"
        className="space-y-6"
      >
        <div className="flex items-center">
          <h2 className="flex-1 text-2xl font-medium sm:text-3xl">
            Featured products
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </Shell>
  );
}
